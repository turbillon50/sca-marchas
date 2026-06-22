// Logo SCA — logo REAL del cliente (/icons/icon-512.png)
export function Logo({ size = 56 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <LogoMark size={size} />
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontSize: size * 0.46, fontWeight: 900, letterSpacing: 1.5, color: "#0F1117" }}>SCA</div>
        <div style={{ fontSize: 9, color: "#6B7280", letterSpacing: 1, marginTop: 3, fontWeight: 600 }}>CARGA Y ARRANQUE</div>
      </div>
    </div>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), overflow: "hidden",
      flexShrink: 0, border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 1px 4px rgba(0,0,0,0.10)", background: "#fff" }}>
      <img src="/icons/icon-512.png" alt="SCA" width={size} height={size}
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: size * 0.05 }} />
    </div>
  );
}

export function LogoSplash({ size = 128 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)", background: "#fff" }}>
      <img src="/icons/icon-512.png" alt="SCA" width={size} height={size}
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: size * 0.06 }} />
    </div>
  );
}
