import { Reveal } from "@/components/Reveal";
import { getInventory } from "@/lib/queries";
import { IconBox } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function InventarioPage() {
  const inv = await getInventory();
  const low = inv.filter((i) => i.stock <= i.minStock);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Inventario</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>
        Stock de refacciones con alertas de mínimo. {low.length} pieza(s) en nivel crítico.
      </p>

      {low.length > 0 && (
        <Reveal>
          <div
            style={{
              background: "rgba(245,158,11,.12)",
              border: "1px solid rgba(245,158,11,.35)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 16,
              fontSize: 13,
              color: "#F59E0B",
              fontWeight: 600,
            }}
          >
            ⚠ {low.map((l) => l.name).join(", ")} por debajo del mínimo.
          </div>
        </Reveal>
      )}

      <div className="sca-card" style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 540 }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--text-muted)", fontSize: 12 }}>
                <th style={{ padding: "12px 16px" }}>Pieza</th>
                <th style={{ padding: "12px 16px" }}>SKU</th>
                <th style={{ padding: "12px 16px" }}>Ubicación</th>
                <th style={{ padding: "12px 16px" }}>Stock</th>
                <th style={{ padding: "12px 16px" }}>Mínimo</th>
              </tr>
            </thead>
            <tbody>
              {inv.map((i) => {
                const critical = i.stock <= i.minStock;
                return (
                  <tr key={i.id} style={{ borderTop: "1px solid var(--border)", fontSize: 14 }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                      <IconBox size={16} className="opacity-60" /> {i.name}
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{i.sku ?? "—"}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{i.location ?? "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontWeight: 800, color: critical ? "#F59E0B" : "var(--text)" }}>{i.stock}</span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{i.minStock}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
