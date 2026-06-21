import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { getOrders } from "@/lib/queries";
import { money } from "@/lib/format";
import { IconArrowRight } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function TecnicoDashboard() {
  const orders = await getOrders();
  const active = orders.filter((o) => !["entregado", "cancelado"].includes(o.status));

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 40px", minHeight: "100dvh" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0" }}>
        <Logo size={40} />
        <Link href="/admin/dashboard" style={{ fontSize: 13, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 4 }}>
          Admin <IconArrowRight size={14} />
        </Link>
      </header>

      <Reveal>
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Hola, técnico 👋</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>
          Tienes <strong style={{ color: "#E31E24" }}>{active.length}</strong> órdenes asignadas en proceso.
        </p>
      </Reveal>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {active.map((o, i) => (
          <Reveal key={o.id} delay={i * 0.04}>
            <div className="sca-card" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <strong style={{ fontSize: 16 }}>{o.folio}</strong>
                <StatusBadge status={o.status} />
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                {o.client ?? "Pieza suelta"} · {o.partKind} · {money(o.total)}
              </p>
              <Link
                href="/admin/ordenes"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#E31E24",
                }}
              >
                Actualizar estatus <IconArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
