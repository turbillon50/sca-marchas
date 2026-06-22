import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { getRatings } from "@/lib/queries";
import {
  IconStar,
  IconPin,
  IconArrowRight,
  IconPhone,
  IconCheck,
  IconClock,
  IconUser,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const SERVICES = [
  { img: "/img/marchas.jpg", title: "Reparación de Marchas", desc: "Diagnóstico, rebobinado, carbones, solenoide y bendix.", price: "Desde $850" },
  { img: "/img/alternadores.jpg", title: "Reparación de Alternadores", desc: "Rectificadores, regulador, rotor y estator. 12V y 24V.", price: "Desde $950" },
  { img: "/img/pesado.jpg", title: "Servicio Pesado", desc: "Camiones, tractocamiones y maquinaria. 24V garantizado.", price: "Cotización" },
  { img: "/img/entrega.jpg", title: "Entrega con Garantía", desc: "Prueba en banco, reporte y garantía real por escrito.", price: "Incluida" },
];

const TRUST = [
  { Icon: IconCheck, title: "Garantía real", desc: "Por escrito en cada reparación." },
  { Icon: IconClock, title: "Diagnóstico en banco", desc: "Prueba de carga y arranque con reporte." },
  { Icon: IconUser, title: "Seguimiento en línea", desc: "Rastrea tu order con tu folio, 24/7." },
];

export default async function HomePage() {
  const ratings = await getRatings();

  return (
    <>
      {/* Top bar sticky */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo size={40} />
          <Link
            href="/sign-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "9px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text)",
              background: "var(--surface)",
            }}
          >
            Ingresar
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "16px 16px 40px" }}>
        <Reveal>
          <section
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 22,
              minHeight: 360,
              display: "flex",
              alignItems: "flex-end",
              boxShadow: "var(--shadow-lg)",
              backgroundColor: "#101218",
              backgroundImage: "url(/img/hero.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10,12,18,0.15) 0%, rgba(10,12,18,0.35) 45%, rgba(10,12,18,0.88) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 2, padding: "28px 24px", maxWidth: 600 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.16)",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.28)",
                  borderRadius: 999,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <IconPin size={14} /> San Nicolás de los Garza, NL
              </span>
              <h1 style={{ fontSize: 34, lineHeight: 1.1, fontWeight: 900, margin: "14px 0 10px", color: "#fff" }}>
                Expertos en marchas y alternadores
              </h1>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 15, lineHeight: 1.5, marginBottom: 20, maxWidth: 460 }}>
                Reparación profesional para auto, carga y maquinaria pesada. Diagnóstico en banco,
                garantía real y seguimiento de tu orden en línea.
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
                    boxShadow: "0 8px 20px rgba(227,30,36,0.35)",
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
                    background: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 14,
                    padding: "14px 22px",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#fff",
                  }}
                >
                  <IconPhone size={18} /> Llamar
                </a>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Trust strip */}
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", marginTop: 16 }}>
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <div className="sca-card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 12, height: "100%" }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "var(--red-light)",
                    color: "#E31E24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <t.Icon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.title}</div>
                  <div style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.4 }}>{t.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, margin: "32px 0 16px" }}>Nuestros servicios</h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div
                className="sca-card sca-service"
                style={{ overflow: "hidden", height: "100%", transition: "box-shadow var(--anim-normal), transform var(--anim-normal)" }}
              >
                <div
                  style={{
                    height: 130,
                    backgroundColor: "#EDF0F6",
                    backgroundImage: `url(${s.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.45, marginBottom: 10 }}>{s.desc}</p>
                  <span style={{ color: "#E31E24", fontSize: 13, fontWeight: 700 }}>{s.price}</span>
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
                <IconPin size={18} /> Ubicación y horario
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
                  background:
                    "repeating-linear-gradient(45deg,#F1F3F8,#F1F3F8 12px,#E9EDF4 12px,#E9EDF4 24px)",
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
    </>
  );
}
