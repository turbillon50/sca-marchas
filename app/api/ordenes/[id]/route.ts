import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, dbAvailable } from "@/lib/db";
import { orders } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID = ["recibido", "diagnostico", "cotizacion", "reparacion", "listo", "entregado", "cancelado"];

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "Base de datos no configurada." }, { status: 503 });
  }
  try {
    const id = Number(params.id);
    const body = await req.json();
    const status = body?.status;
    if (!VALID.includes(status)) {
      return NextResponse.json({ error: "Estatus inválido" }, { status: 400 });
    }
    const [current] = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    if (!current) return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 });

    const history = [
      ...((current.statusHistory as { status: string; at: string }[] | null) ?? []),
      { status, at: new Date().toISOString() },
    ];
    const [updated] = await db
      .update(orders)
      .set({ status, statusHistory: history, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    return NextResponse.json({ ok: true, order: { id: updated.id, status: updated.status } });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
