import { Reveal } from "@/components/Reveal";
import { getClients } from "@/lib/queries";
import { IconPeople, IconPhone } from "@/components/icons";

export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<string, string> = {
  particular: "Particular",
  mecanico: "Mecánico",
  taller: "Taller",
  distribuidor: "Distribuidor",
};

const TYPE_COLOR: Record<string, string> = {
  particular: "#3B82F6",
  mecanico: "#F59E0B",
  taller: "#E31E24",
  distribuidor: "#22C55E",
};

export default async function ClientesPage() {
  const clients = await getClients();

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Clientes</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>
        CRM con historial doble: por cliente y por vehículo/pieza.
      </p>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {clients.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.04}>
            <div className="sca-card" style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${TYPE_COLOR[c.type] ?? "#888"}1f`,
                    color: TYPE_COLOR[c.type] ?? "#888",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconPeople size={22} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.name}
                  </div>
                  <span style={{ fontSize: 11, color: TYPE_COLOR[c.type] ?? "#888", fontWeight: 600 }}>
                    {TYPE_LABEL[c.type] ?? c.type}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--text-muted)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <IconPhone size={14} /> {c.phone ?? "—"}
                </span>
                <span>
                  <strong style={{ color: "var(--text)" }}>{c.orders}</strong> órdenes
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
