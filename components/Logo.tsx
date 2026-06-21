import { IconBolt } from "./icons";

// Marca SCA: texto cromo plateado + rayo rojo + engrane. SVG propio, sin imágenes externas.
export function Logo({ size = 56 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 14,
          background: "linear-gradient(160deg,#1A1A24,#0A0A0F)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxShadow: "0 6px 20px rgba(0,0,0,.5)",
        }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" aria-hidden>
          <defs>
            <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4f4f8" />
              <stop offset="48%" stopColor="#c0c0c0" />
              <stop offset="56%" stopColor="#7d7d86" />
              <stop offset="100%" stopColor="#e8e8ee" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="9.2" fill="none" stroke="url(#chrome)" strokeWidth="1.4" opacity="0.55" />
          <path d="M13 3 5 13h5l-1 8 9-12h-6z" fill="#E31E24" />
        </svg>
      </div>
      <div style={{ lineHeight: 1 }}>
        <div
          className="sca-chrome"
          style={{ fontSize: size * 0.46, fontWeight: 900, letterSpacing: 2 }}
        >
          SCA
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: 1, marginTop: 3 }}>
          CARGA Y ARRANQUE
        </div>
      </div>
    </div>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: "linear-gradient(160deg,#1A1A24,#0A0A0F)",
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#E31E24",
      }}
    >
      <IconBolt size={size * 0.5} />
    </div>
  );
}
