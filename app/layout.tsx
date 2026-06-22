import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SplashScreen } from "@/components/SplashScreen";
import { BottomNav } from "@/components/BottomNav";
import { SWRegister } from "@/components/SWRegister";
import { clerkEnabled, clerkAppearance } from "@/lib/clerk";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "SCA — Sistema de Carga y Arranque",
  description:
    "Expertos en reparación de marchas y alternadores en San Nicolás de los Garza, NL. Diagnóstico, servicio pesado y seguimiento de órdenes en línea.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "SCA" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ colorScheme: "light" }}>
      <body className={inter.variable} style={{ paddingBottom: "var(--nav-h)", minHeight: "100dvh" }}>
        <SplashScreen />
        {children}
        <BottomNav />
        <SWRegister />
      </body>
    </html>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (clerkEnabled) {
    return (
      <ClerkProvider appearance={clerkAppearance} signInUrl="/sign-in" signUpUrl="/sign-up">
        <Shell>{children}</Shell>
      </ClerkProvider>
    );
  }
  return <Shell>{children}</Shell>;
}
