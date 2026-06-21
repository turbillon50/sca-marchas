import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { eq } from "drizzle-orm";
import { db, dbAvailable } from "@/lib/db";
import { technicians } from "@/db/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ClerkEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string | null;
    last_name?: string | null;
    public_metadata?: { role?: string };
  };
};

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!secret) {
    // Sin secret configurado: no-op seguro.
    return NextResponse.json({ ok: true, skipped: "no signing secret" });
  }

  const payload = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  };

  let evt: ClerkEvent;
  try {
    evt = new Webhook(secret).verify(payload, headers) as ClerkEvent;
  } catch {
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  if (!dbAvailable) return NextResponse.json({ ok: true, skipped: "no db" });

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const { id, email_addresses, first_name, last_name, public_metadata } = evt.data;
    const name = [first_name, last_name].filter(Boolean).join(" ") || "Usuario";
    const email = email_addresses?.[0]?.email_address ?? null;
    const role = public_metadata?.role ?? "cliente";

    const existing = await db.select().from(technicians).where(eq(technicians.clerkUserId, id)).limit(1);
    if (existing[0]) {
      await db.update(technicians).set({ name, email, role }).where(eq(technicians.clerkUserId, id));
    } else {
      await db.insert(technicians).values({ clerkUserId: id, name, email, role });
    }
  }

  return NextResponse.json({ ok: true });
}
