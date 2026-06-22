"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconClipboard, IconSearch, IconPeople, IconUser } from "./icons";

const TABS = [
  { href: "/", label: "Inicio", Icon: IconHome },
  { href: "/mis-ordenes", label: "Órdenes", Icon: IconClipboard },
  { href: "/seguimiento", label: "Buscar", Icon: IconSearch },
  { href: "/admin/clientes", label: "Clientes", Icon: IconPeople },
  { href: "/dashboard", label: "Perfil", Icon: IconUser },
];

// Bottom nav móvil: 5 items, 56px, portrait. Oculto en >=768px y en /admin (admin tiene su propia nav).
export function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/sign-")) return null;

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "var(--nav-h)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -2px 16px rgba(15,23,42,0.05)",
        display: "flex",
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {TABS.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              color: active ? "#E31E24" : "var(--text-muted)",
              fontSize: 10,
              fontWeight: active ? 700 : 500,
              transition: "color var(--anim-fast)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 28,
                borderRadius: 999,
                background: active ? "var(--red-light)" : "transparent",
                transition: "background var(--anim-fast)",
              }}
            >
              <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
