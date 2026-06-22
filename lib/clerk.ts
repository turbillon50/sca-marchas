// Clerk se activa solo si hay publishable key válida.
// Esto permite que las rutas públicas rendericen en local/CI sin keys vivas,
// y que en producción (con keys en Vercel) la auth quede 100% activa.
export const clerkEnabled =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

// Apariencia clara SCA para los componentes de Clerk.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#E31E24",
    colorBackground: "#FFFFFF",
    colorInputBackground: "#F1F3F8",
    colorText: "#0F1117",
    colorTextSecondary: "#6B7A99",
    colorInputText: "#0F1117",
    borderRadius: "12px",
  },
  elements: {
    card: { background: "#FFFFFF", border: "1px solid #E4E8F0", boxShadow: "0 12px 36px rgba(15,23,42,0.14)" },
    headerTitle: { color: "#0F1117" },
    socialButtonsBlockButton: { border: "1px solid #E4E8F0" },
    formButtonPrimary: { background: "#E31E24" },
  },
} as const;
