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
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const cards = [
    { label: "Órdenes activas", value: kpis.activeOrders, Icon: IconClipboard, color: "#E31E24" },
    { label: "Facturación hoy", value: kpis.billingToday, money: true, Icon: IconBolt, color: "#22C55E" },
    { label: "Inventario crítico", value: kpis.lowStock, Icon: IconBox, color: "#F59E0B" },
    { label: "Técnicos activos", value: kpis.activeTechs, Icon: IconWrench, color: "#3B82F6" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 18 }}>Dashboard</h1>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <div className="sca-card" style={{ padding: 18 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${c.color}1f`,
                  color: c.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <c.Icon size={21} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 900 }}>
                {c.money ? (
                  <NumberCounter value={c.value} prefix="$" />
                ) : (
                  <NumberCounter value={c.value} />
                )}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{c.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", marginTop: 16 }}>
        <Reveal>
          <div className="sca-card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Órdenes últimos 7 días</h2>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
              {kpis.week.map((v, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${Math.max(8, (v / maxWeek) * 130)}px`,
                      background: "linear-gradient(180deg,#E31E24,#7d0f12)",
                      borderRadius: "6px 6px 0 0",
                    }}
                  />
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="sca-card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Órdenes recientes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{o.folio}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
    </div>
  );
}
