import { Reveal } from "@/components/Reveal";
import { NumberCounter } from "@/components/NumberCounter";
import { StatusBadge } from "@/components/StatusBadge";
import { getAdminKpis, getOrders } from "@/lib/queries";
import { money } from "@/lib/format";
import { IconClipboard, IconBolt, IconBox, IconWrench } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [kpis, orders] = await Promise.all([getAdminKpis(), getOrders()]);
  const maxWeek = Math.max(...kpis.week, 1);
  const days = ["L","M","M","J","V","S","D"];

  const cards = [
    { label: "Órdenes activas", value: kpis.activeOrders, Icon: IconClipboard, color: "#E31E24", bg: "#FEF2F2" },
    { label: "Facturación hoy", value: kpis.billingToday, money: true, Icon: IconBolt, color: "#22C55E", bg: "#F0FDF4" },
    { label: "Inventario crítico", value: kpis.lowStock, Icon: IconBox, color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Técnicos activos", value: kpis.activeTechs, Icon: IconWrench, color: "#3B82F6", bg: "#EFF6FF" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>Dashboard</h1>

      {/* GRID 2x2 FIJO — nunca lista vertical */}
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <div className="sca-card" style={{ padding: "16px 14px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, color: c.color,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <c.Icon size={19} />
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>
                {c.money ? <NumberCounter value={c.value} prefix="$" /> : <NumberCounter value={c.value} />}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.3 }}>{c.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* GRÁFICA SEMANAL */}
      <Reveal delay={0.1}>
        <div className="sca-card" style={{ padding: 18, marginTop: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "var(--text-muted)" }}>ÓRDENES — ÚLTIMOS 7 DÍAS</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
            {kpis.week.map((v, i) => (
              <div key={i} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column",
                justifyContent: "flex-end", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", height: `${Math.max(6, (v / maxWeek) * 84)}px`,
                  background: "linear-gradient(180deg,#E31E24,#9B1C1C)", borderRadius: "5px 5px 0 0" }} />
                <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 600 }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ÓRDENES RECIENTES */}
      <Reveal delay={0.15}>
        <div className="sca-card" style={{ padding: 18, marginTop: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "var(--text-muted)" }}>ÓRDENES RECIENTES</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {orders.slice(0, 5).map((o, i) => (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: 12, padding: "12px 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#E31E24" }}>{o.folio}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden",
                    textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>
                    {o.client ?? "Pieza suelta"} · {money(o.total)}
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
