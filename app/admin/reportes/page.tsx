import { Reveal } from "@/components/Reveal";
import { ExportButton } from "@/components/admin/ExportButton";
import { getOrders } from "@/lib/queries";
import { money } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ReportesPage() {
  const orders = await getOrders();
  const completed = orders.filter((o) => ["listo", "entregado"].includes(o.status));
  const totalVentas = orders.reduce((s, o) => s + parseFloat(o.total || "0"), 0);
  const ticket = orders.length ? totalVentas / orders.length : 0;

  const stats = [
    { label: "Ventas acumuladas", value: money(totalVentas) },
    { label: "Reparaciones completadas", value: String(completed.length) },
    { label: "Órdenes totales", value: String(orders.length) },
    { label: "Ticket promedio", value: money(ticket) },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900 }}>Reportes</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Ventas y reparaciones del periodo.</p>
        </div>
        <ExportButton orders={orders} />
      </div>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", marginBottom: 18 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <div className="sca-card" style={{ padding: 18 }}>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="sca-card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 15 }}>
            Reparaciones completadas
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--text-muted)", fontSize: 12 }}>
                  <th style={{ padding: "12px 16px" }}>Folio</th>
                  <th style={{ padding: "12px 16px" }}>Cliente</th>
                  <th style={{ padding: "12px 16px" }}>Total</th>
                  <th style={{ padding: "12px 16px" }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((o) => (
                  <tr key={o.id} style={{ borderTop: "1px solid var(--border)", fontSize: 14 }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700 }}>{o.folio}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{o.client ?? "Pieza suelta"}</td>
                    <td style={{ padding: "12px 16px" }}>{money(o.total)}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{o.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
