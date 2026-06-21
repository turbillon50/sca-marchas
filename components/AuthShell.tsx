import Link from "next/link";
import { Logo } from "./Logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 24,
        background:
          "radial-gradient(120% 80% at 50% 0%, rgba(227,30,36,.14), transparent 60%), #0A0A0F",
      }}
    >
      <Link href="/">
        <Logo size={56} />
      </Link>
      {children}
    </main>
  );
}

export function AuthPlaceholder({ mode }: { mode: "in" | "up" }) {
  return (
    <div className="sca-card" style={{ padding: 28, maxWidth: 360, textAlign: "center" }}>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
        {mode === "in" ? "Iniciar sesión" : "Crear cuenta"}
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.5 }}>
        La autenticación se activa en producción con Clerk.
        <br />
        Configura las llaves <code style={{ color: "#ff6b6f" }}>CLERK</code> en Vercel para habilitar el acceso.
      </p>
    </div>
  );
}
