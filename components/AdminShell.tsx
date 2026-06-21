"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LogoMark } from "./Logo";
import { clerkEnabled } from "@/lib/clerk";
import {
  IconChart,
  IconClipboard,
  IconPeople,
  IconBox,
  IconWrench,
  IconBolt,
} from "./icons";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: IconChart },
  { href: "/admin/ordenes", label: "Órdenes", Icon: IconClipboard },
  { href: "/admin/clientes", label: "Clientes", Icon: IconPeople },
  { href: "/admin/inventario", label: "Inventario", Icon: IconBox },
  { href: "/admin/tecnicos", label: "Técnicos", Icon: IconWrench },
  { href: "/admin/reportes", label: "Reportes", Icon: IconBolt },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", minHeight: "100dvh" }}>
      {/* Sidebar desktop */}
      <aside
        className="hidden md:flex"
        style={{
          width: 240,
          flexDirection: "column",
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
          padding: 16,
          position: "sticky",
          top: 0,
          height: "100dvh",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 20px" }}>
          <LogoMark size={36} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>SCA Admin</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Panel de control</div>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 12px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#fff" : "var(--text-muted)",
                  background: active ? "rgba(227,30,36,.16)" : "transparent",
                  border: active ? "1px solid rgba(227,30,36,.3)" : "1px solid transparent",
                }}
              >
                <Icon size={19} /> {label}
              </Link>
            );
          })}
        </nav>
        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            ← Volver al sitio
          </Link>
        </div>
      </aside>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: "1px solid var(--border)",
            background: "rgba(10,10,15,.7)",
            backdropFilter: "blur(8px)",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div className="md:hidden" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LogoMark size={30} />
            <strong style={{ fontSize: 14 }}>SCA Admin</strong>
          </div>
          <div className="hidden md:block" style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {NAV.find((n) => pathname.startsWith(n.href))?.label ?? "Panel"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {clerkEnabled ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: "linear-gradient(160deg,#E31E24,#7d0f12)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                R
              </span>
            )}
          </div>
        </header>

        {/* Mobile nav scroll */}
        <div
          className="md:hidden"
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {NAV.map(({ href, label, Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  borderRadius: 999,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#fff" : "var(--text-muted)",
                  background: active ? "rgba(227,30,36,.16)" : "var(--surface)",
                  border: `1px solid ${active ? "rgba(227,30,36,.3)" : "var(--border)"}`,
                }}
              >
                <Icon size={16} /> {label}
              </Link>
            );
          })}
        </div>

        <main style={{ flex: 1, padding: "20px 18px 40px", maxWidth: 1100, width: "100%", margin: "0 auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
