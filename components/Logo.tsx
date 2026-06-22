// Marca SCA — emblema engrane plateado + rayo rojo sobre blanco, wordmark grafito.
// SVG propio, sin imágenes externas, nítido a cualquier tamaño (calidad App Store).

function Emblem({ size = 56 }: { size?: number }) {
  const teeth = Array.from({ length: 12 }).map((_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    const r1 = 8.6,
      r2 = 10.4,
      w = 0.7;
    const x1 = 12 + Math.cos(a) * r1,
      y1 = 12 + Math.sin(a) * r1;
    const x2 = 12 + Math.cos(a) * r2,
      y2 = 12 + Math.sin(a) * r2;
    const px = -Math.sin(a) * w,
      py = Math.cos(a) * w;
    return `M${x1 + px},${y1 + py} L${x2 + px},${y2 + py} L${x2 - px},${y2 - py} L${x1 - px},${y1 - py} Z`;
  });
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.26,
        background: "#FFFFFF",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="8.6" fill="none" stroke="#9AA3B5" strokeWidth="0.9" />
        <path d={teeth.join(" ")} fill="#9AA3B5" />
        <path
          d="M13.2 4 L7.2 12.5 L11 12.5 L9.6 20 L16.4 11 L12.4 11 Z"
          fill="#E31E24"
        />
      </svg>
    </div>
  );
}

export function Logo({ size = 56 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Emblem size={size} />
      <div style={{ lineHeight: 1 }}>
        <div
          className="sca-chrome"
          style={{ fontSize: size * 0.46, fontWeight: 900, letterSpacing: 1.5 }}
        >
          SCA
        </div>
        <div style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: 1, marginTop: 3, fontWeight: 600 }}>
          CARGA Y ARRANQUE
        </div>
      </div>
    </div>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return <Emblem size={size} />;
}
