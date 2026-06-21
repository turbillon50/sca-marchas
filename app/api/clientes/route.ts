import { NextResponse } from "next/server";
import { db, dbAvailable } from "@/lib/db";
import { clients } from "@/db/schema";
import { getClients } from "@/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await getClients();
  return NextResponse.json({ clients: rows });
}

export async function POST(req: Request) {
  if (!dbAvailable) {
    return NextResponse.json({ error: "Base de datos no configurada." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { name, type, phone, email, notes } = body ?? {};
    if (!name) return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
    const validType = ["particular", "mecanico", "taller", "distribuidor"].includes(type) ? type : "particular";
    const [client] = await db
      .insert(clients)
      .values({ name: String(name).trim(), type: validType, phone: phone || null, email: email || null, notes: notes || null })
      .returning();
    return NextResponse.json({ ok: true, client });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
  }
}
