import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { getRatings } from "@/lib/queries";
import {
  IconGear,
  IconBattery,
  IconWrench,
  IconTruck,
  IconBolt,
  IconStar,
  IconPin,
  IconArrowRight,
  IconPhone,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const SERVICES = [
  { Icon: IconGear, title: "Reparación de Marchas", desc: "Diagnóstico, rebobinado, carbones, solenoide y bendix." },
  { Icon: IconBattery, title: "Reparación de Alternadores", desc: "Rectificadores, regulador, rotor y estator. 12V y 24V." },
  { Icon: IconWrench, title: "Diagnóstico Eléctrico", desc: "Prueba de carga y arranque en banco con reporte." },
  { Icon: IconTruck, title: "Servicio Pesado", desc: "Camiones, tractocamiones y maquinaria. 24V garantizado." },
];

const WORKS = [
  { title: "Alternador 24V reconstruido", tag: "Servicio pesado", accent: "#E31E24" },
  { title: "Marcha Nissan restaurada", tag: "Automóvil", accent: "#3B82F6" },
  { title: "Banco de pruebas de carga", tag: "Diagnóstico", accent: "#F59E0B" },
  { title: "Alternador GM 90A", tag: "Garantía", accent: "#22C55E" },
];

export default async function HomePage() {
  const ratings = await getRatings();

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px 40px" }}>
      <header
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}
      >
        <Logo size={44} />
        <Link
          href="/sign-in"
          className="hidden md:inline-flex"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "10px 18px",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          Ingresar
        </Link>
      </header>

      <Reveal>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            border: "1px solid var(--border)",
            background:
              "radial-gradient(120% 120% at 80% 0%, rgba(227,30,36,.20) 0%, rgba(10,10,15,0) 55%), linear-gradient(180deg,#13131A,#0A0A0F)",
            padding: "40px 24px",
            marginTop: 8,
          }}
        >
          <div style={{ position: "relative", zIndex: 2, maxWidth: 620 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(227,30,36,.12)",
                color: "#ff6b6f",
                border: "1px solid rgba(227,30,36,.35)",
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <IconBolt size={14} /> San Nicolás de los Garza, NL
            </span>
            <h1 style={{ fontSize: 38, lineHeight: 1.08, fontWeight: 900, margin: "16px 0 12px" }}>
              Expertos en <span style={{ color: "#E31E24" }}>Sistema de Carga y Arranque</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.5, marginBottom: 24 }}>
              Reparación profesional de marchas y alternadores para auto, carga y maquinaria pesada.
              Diagnóstico en banco, garantía real y seguimiento de tu orden en línea.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                href="/seguimiento"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#E31E24",
                  color: "#fff",
                  borderRadius: 14,
                  padding: "14px 22px",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Rastrear mi Orden <IconArrowRight size={18} />
              </Link>
              <a
                href="tel:+528112345678"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "14px 22px",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "var(--text)",
                }}
              >
                <IconPhone size={18} /> Llamar
              </a>
            </div>
          </div>
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: -40,
              bottom: -40,
              width: 320,
              height: 320,
              opacity: 0.12,
              color: "#C0C0C0",
            }}
          >
            <IconGear size={320} strokeWidth={0.7} />
          </div>
        </section>
      </Reveal>

      <h2 style={{ fontSize: 20, fontWeight: 800, margin: "32px 0 16px" }}>Servicios destacados</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div className="sca-card" style={{ padding: 20, height: "100%" }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "rgba(227,30,36,.1)",
                  color: "#E31E24",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <s.Icon size={24} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 800, margin: "36px 0 16px" }}>Trabajos realizados</h2>
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {WORKS.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.05}>
            <div className="sca-card" style={{ overflow: "hidden", height: "100%" }}>
              <div
                style={{
                  height: 120,
                  background: `radial-gradient(100% 100% at 50% 0%, ${w.accent}33, transparent 70%), linear-gradient(160deg,#1A1A24,#0A0A0F)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: w.accent,
                }}
              >
                <IconWrench size={42} strokeWidth={1.4} />
              </div>
              <div style={{ padding: 14 }}>
                <span style={{ fontSize: 11, color: w.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {w.tag}
                </span>
                <p style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{w.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 36 }}>
        <Reveal>
          <div className="sca-card" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ display: "flex", color: "#F59E0B" }}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <IconStar key={n} size={18} />
                ))}
              </div>
              <strong style={{ fontSize: 18 }}>4.9</strong>
              <span style={{ color: "var(--text-muted)", fontSize: 13 }}>· 127 reseñas</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ratings.slice(0, 3).map((r, i) => (
                <div key={i} style={{ borderTop: i ? "1px solid var(--border)" : "none", paddingTop: i ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 14 }}>{r.clientName}</strong>
                    <span style={{ display: "flex", color: "#F59E0B" }}>
                      {Array.from({ length: r.stars }).map((_, k) => (
                        <IconStar key={k} size={13} />
                      ))}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="sca-card" style={{ padding: 22, height: "100%" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <IconPin size={18} /> Ubicación
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
              San Nicolás de los Garza, Nuevo León.
              <br />
              Lun – Sáb · 9:00 a 19:00
            </p>
            <div
              style={{
                marginTop: 16,
                height: 120,
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "repeating-linear-gradient(45deg,#13131A,#13131A 12px,#1A1A24 12px,#1A1A24 24px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                gap: 8,
                fontSize: 13,
              }}
            >
              <IconPin size={18} /> Zona industrial San Nicolás
            </div>
          </div>
        </Reveal>
      </div>

      <footer style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 12, marginTop: 40 }}>
        SCA — Sistema de Carga y Arranque · Marchas y Alternadores · San Nicolás, NL
      </footer>
    </main>
  );
}
