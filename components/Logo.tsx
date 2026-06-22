// Logo SCA — imagen REAL del cliente (CDN Higgsfield)
const LOGO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_020434_6ff639c1-15c6-45ff-8618-3cd73f36011e.png";

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
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), overflow: "hidden", flexShrink: 0, border: "1px solid rgba(0,0,0,0.10)", boxShadow: "0 1px 4px rgba(0,0,0,0.12)", background: "#111" }}>
      <img src={LOGO_URL} alt="SCA" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
    </div>
  );
}

export function LogoSplash({ size = 128 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.22), overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.30)", background: "#111" }}>
      <img src={LOGO_URL} alt="SCA" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
    </div>
  );
}
