import { NextResponse } from "next/server";
import { getOrderByFolio } from "@/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { folio: string } }) {
  const order = await getOrderByFolio(params.folio);
  if (!order) {
    return NextResponse.json({ found: false }, { status: 404 });
  }
  return NextResponse.json({ found: true, order });
}
