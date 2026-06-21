import { NextResponse } from "next/server";
import { sql, dbAvailable } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let db = false;
  if (dbAvailable && sql) {
    try {
      await sql`SELECT 1`;
      db = true;
    } catch {
      db = false;
    }
  }
  return NextResponse.json({
    status: "ok",
    db,
    timestamp: new Date().toISOString(),
  });
}
