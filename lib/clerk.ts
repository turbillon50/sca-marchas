// Clerk se activa solo si hay publishable key válida.
// Esto permite que las rutas públicas rendericen en local/CI sin keys vivas,
// y que en producción (con keys en Vercel) la auth quede 100% activa.
export const clerkEnabled =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

// Apariencia oscura SCA para los componentes de Clerk.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#E31E24",
    colorBackground: "#13131A",
    colorInputBackground: "#1A1A24",
    colorText: "#F0F4FF",
    colorTextSecondary: "#8891A8",
    colorInputText: "#F0F4FF",
    borderRadius: "12px",
  },
  elements: {
    card: { background: "#13131A", border: "1px solid #24242E" },
    headerTitle: { color: "#F0F4FF" },
    socialButtonsBlockButton: { border: "1px solid #24242E" },
    formButtonPrimary: { background: "#E31E24" },
  },
} as const;
