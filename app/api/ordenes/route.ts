import { NextResponse } from "next/server";
import { db, dbAvailable } from "@/lib/db";
import { orders, clients } from "@/db/schema";
import { getOrders } from "@/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await getOrders();
  return NextResponse.json({ orders: rows });
}

export async function POST(req: Request) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "Base de datos no configurada en este entorno." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { clientName, phone, intakeType, partKind, description, technicianId, total } = body ?? {};

    if (!clientName || typeof clientName !== "string") {
      return NextResponse.json({ error: "El nombre del cliente es obligatorio." }, { status: 400 });
    }

    // Cliente
    const [client] = await db
      .insert(clients)
      .values({ name: clientName.trim(), phone: phone || null })
      .returning();

    // Folio incremental por año
    const year = new Date().getFullYear();
    const existing = await db.select({ id: orders.id }).from(orders);
    const folio = `SCA-${year}-${String(existing.length + 1).padStart(3, "0")}`;

    const now = new Date().toISOString();
    const [order] = await db
      .insert(orders)
      .values({
        folio,
        clientId: client.id,
        technicianId: technicianId ? Number(technicianId) : null,
        intakeType: intakeType === "pieza_suelta" ? "pieza_suelta" : "vehiculo",
        partKind: ["marcha", "alternador", "otro"].includes(partKind) ? partKind : "otro",
        description: description || null,
        status: "recibido",
        statusHistory: [{ status: "recibido", at: now }],
        total: total ? String(parseFloat(total) || 0) : "0",
      })
      .returning();

    return NextResponse.json({ ok: true, folio: order.folio, id: order.id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "No se pudo crear la orden" },
      { status: 500 }
    );
  }
}
