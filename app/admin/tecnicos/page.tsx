import { Reveal } from "@/components/Reveal";
import { getTechnicians } from "@/lib/queries";
import { IconWrench } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function TecnicosPage() {
  const techs = await getTechnicians();

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Técnicos</h1>
      <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>
        Carga de trabajo y asignación de órdenes activas.
      </p>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
        {techs.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.04}>
            <div className="sca-card" style={{ padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 999,
                  background: "var(--red-light)",
                  border: "1px solid rgba(227,30,36,.2)",
                  color: "#E31E24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconWrench size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "capitalize" }}>{t.role}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: t.active > 0 ? "#E31E24" : "var(--text-muted)" }}>{t.active}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>activas</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
