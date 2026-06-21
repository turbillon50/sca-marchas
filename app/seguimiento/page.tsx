import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { getOrderByFolio } from "@/lib/queries";
import { STATUS_FLOW, STATUS_LABEL, statusIndex, dateShort } from "@/lib/format";
import { IconSearch, IconCheck, IconClock, IconArrowRight } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function SeguimientoPage({
  searchParams,
}: {
  searchParams: { folio?: string };
}) {
  const folio = (searchParams.folio ?? "").trim();
  const order = folio ? await getOrderByFolio(folio) : null;
  const current = order ? statusIndex(order.status) : -1;
  const cancelado = order?.status === "cancelado";

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px 40px", minHeight: "100dvh" }}>
      <header style={{ padding: "18px 0" }}>
        <Link href="/">
          <Logo size={40} />
        </Link>
      </header>

      <Reveal>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>Rastrea tu orden</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>
          Captura tu folio (ej. <strong style={{ color: "var(--text)" }}>SCA-2025-001</strong>) para ver el estatus
          de tu marcha o alternador en tiempo real.
        </p>

        <form method="GET" action="/seguimiento" style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "0 14px",
            }}
          >
            <IconSearch size={18} className="opacity-60" />
            <input
              name="folio"
              defaultValue={folio}
              placeholder="SCA-2025-001"
              autoComplete="off"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontSize: 15,
                padding: "14px 0",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              background: "#E31E24",
              color: "#fff",
              border: "none",
              borderRadius: 14,
              padding: "0 22px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Buscar
          </button>
        </form>
      </Reveal>

      {folio && !order && (
        <Reveal>
          <div className="sca-card" style={{ padding: 20, textAlign: "center" }}>
            <p style={{ fontWeight: 600 }}>No encontramos el folio “{folio}”.</p>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
              Revisa que esté completo. Si tienes dudas, llámanos.
            </p>
          </div>
        </Reveal>
      )}

      {order && (
        <Reveal>
          <div className="sca-card" style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Folio</span>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{order.folio}</div>
              </div>
              <span
                style={{
                  background: cancelado ? "rgba(107,114,128,.15)" : "rgba(227,30,36,.12)",
                  color: cancelado ? "#9CA3AF" : "#ff6b6f",
                  border: `1px solid ${cancelado ? "#374151" : "rgba(227,30,36,.35)"}`,
                  borderRadius: 999,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {STATUS_LABEL[order.status] ?? order.status}
              </span>
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 4 }}>
              {order.description ?? "Trabajo en proceso"}
            </p>
            {order.client && (
              <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
                Cliente: {order.client}
              </p>
            )}

            {/* Timeline */}
            <div style={{ position: "relative", paddingLeft: 8 }}>
              {STATUS_FLOW.map((step, i) => {
                const done = current >= i && !cancelado;
                const active = current === i && !cancelado;
                const hist = order.history.find((h) => h.status === step);
                return (
                  <div key={step} style={{ display: "flex", gap: 14, position: "relative" }}>
                    {/* línea */}
                    {i < STATUS_FLOW.length - 1 && (
                      <span
                        style={{
                          position: "absolute",
                          left: 13,
                          top: 26,
                          bottom: -8,
                          width: 2,
                          background: done ? "#E31E24" : "var(--border)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: done ? "#E31E24" : "var(--surface-2)",
                        color: done ? "#fff" : "var(--text-muted)",
                        border: active ? "2px solid #ff6b6f" : "1px solid var(--border)",
                        zIndex: 1,
                      }}
                    >
                      {done ? <IconCheck size={15} /> : <IconClock size={14} />}
                    </div>
                    <div style={{ paddingBottom: 22 }}>
                      <div style={{ fontWeight: active ? 800 : 600, fontSize: 15, color: done ? "var(--text)" : "var(--text-muted)" }}>
                        {STATUS_LABEL[step]}
                      </div>
                      {hist && (
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{dateShort(hist.at)}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {!folio && (
        <Reveal>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 14, marginTop: 8 }}
          >
            Volver al inicio <IconArrowRight size={16} />
          </Link>
        </Reveal>
      )}
    </main>
  );
}
