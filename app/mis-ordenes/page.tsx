import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { getOrders, getOrdersByUser } from "@/lib/queries";
import { money } from "@/lib/format";
import { IconClipboard, IconArrowRight, IconUser } from "@/components/icons";
import { clerkEnabled } from "@/lib/clerk";

export const dynamic = "force-dynamic";

async function resolveOrders() {
  if (!clerkEnabled) return { orders: await getOrders(), userMode: false };

  const { auth, currentUser } = await import("@clerk/nextjs/server");
  const { userId } = await auth();

  if (!userId) return { orders: await getOrders(), userMode: false };

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress ?? null;

  const userOrders = await getOrdersByUser(userId, email);
  // null means db not available — fall back to getOrders (demo)
  if (userOrders === null) return { orders: await getOrders(), userMode: false };

  return { orders: userOrders, userMode: true };
}

export default async function MisOrdenes() {
  const { orders, userMode } = await resolveOrders();

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 40px", minHeight: "100dvh" }}>
      <header style={{ padding: "18px 0" }}>
        <Logo size={40} />
      </header>

      <Reveal>
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Mis órdenes</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>
          {userMode
            ? "Tus marchas y alternadores registrados con tu cuenta."
            : "Historial de tus marchas y alternadores, por vehículo y por pieza suelta."}
        </p>
      </Reveal>

      {orders.length === 0 ? (
        <div className="sca-card" style={{ padding: 28, textAlign: "center" }}>
          <IconClipboard size={32} className="opacity-40" />
          <p style={{ marginTop: 10, color: "var(--text-muted)" }}>
            {userMode
              ? "Aún no tienes órdenes asociadas a tu cuenta."
              : "Aún no hay órdenes registradas."}
          </p>
          {userMode && (
            <p style={{ marginTop: 8, fontSize: 13, color: "var(--text-muted)" }}>
              Si ya tienes un folio, búscalo en{" "}
              <Link href="/seguimiento" style={{ color: "#E31E24", fontWeight: 600 }}>
                Seguimiento
              </Link>
              .
            </p>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {!userMode && clerkEnabled && (
            <Reveal>
              <div className="sca-card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <span style={{ color: "#E31E24", flexShrink: 0, lineHeight: 0 }}><IconUser size={20} /></span>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
                  <Link href="/sign-in" style={{ color: "#E31E24", fontWeight: 600 }}>Inicia sesión</Link>{" "}
                  para ver solo tus órdenes.
                </p>
              </div>
            </Reveal>
          )}
          {orders.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.04}>
              <Link href={`/seguimiento?folio=${o.folio}`}>
                <div className="sca-card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <strong style={{ fontSize: 16 }}>{o.folio}</strong>
                    <StatusBadge status={o.status} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", textTransform: "capitalize" }}>
                      {o.partKind} · {money(o.total)}
                    </p>
                    <span style={{ color: "#E31E24", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 700 }}>
                      Ver seguimiento <IconArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
