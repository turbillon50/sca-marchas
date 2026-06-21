import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, dbAvailable } from "@/lib/db";
import { inventory, inventoryMoves } from "@/db/schema";
import { getInventory } from "@/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await getInventory();
  return NextResponse.json({ inventory: rows });
}

// Registra un movimiento (entrada/salida/ajuste) y actualiza el stock.
export async function POST(req: Request) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "Base de datos no configurada." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { partId, type, qty, orderId, note } = body ?? {};
    if (!partId || !["entrada", "salida", "ajuste"].includes(type) || typeof qty !== "number") {
      return NextResponse.json({ error: "Datos de movimiento inválidos." }, { status: 400 });
    }
    await db.insert(inventoryMoves).values({
      partId: Number(partId),
      orderId: orderId ? Number(orderId) : null,
      type,
      qty,
      note: note || null,
    });

    const [inv] = await db.select().from(inventory).where(eq(inventory.partId, Number(partId))).limit(1);
    if (inv) {
      const delta = type === "entrada" ? qty : type === "salida" ? -qty : qty - inv.stock;
      const newStock = type === "ajuste" ? qty : Math.max(0, inv.stock + delta);
      await db.update(inventory).set({ stock: newStock, updatedAt: new Date() }).where(eq(inventory.id, inv.id));
      return NextResponse.json({ ok: true, stock: newStock });
    }
    return NextResponse.json({ ok: true, stock: null });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
