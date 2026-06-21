import { NextResponse } from "next/server";
import { sql, dbAvailable } from "@/lib/db";
import { SETUP_STATEMENTS, SEED_STATEMENTS } from "@/db/ddl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function run() {
  if (!dbAvailable || !sql) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL no configurada" }, { status: 503 });
  }
  const done: string[] = [];
  try {
    for (const stmt of SETUP_STATEMENTS) {
      await sql.query(stmt);
      done.push(stmt.slice(0, 48).replace(/\s+/g, " "));
    }
    let seeded = 0;
    for (const stmt of SEED_STATEMENTS) {
      try {
        await sql.query(stmt);
        seeded++;
      } catch {
        // seed best-effort
      }
    }
    return NextResponse.json({ ok: true, tables: done.length, seeded });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "setup failed", completed: done.length },
      { status: 500 }
    );
  }
}

export async function GET() {
  return run();
}

export async function POST() {
  return run();
}
