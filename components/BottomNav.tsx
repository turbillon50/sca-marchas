"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconHome, IconClipboard, IconSearch, IconGrid, IconUser } from "./icons";

const TABS = [
  { href: "/",           label: "Inicio",    Icon: IconHome },
  { href: "/trabajos",   label: "Trabajos",  Icon: IconGrid },
  { href: "/seguimiento",label: "Rastrear",  Icon: IconSearch },
  { href: "/mis-ordenes",label: "Mis órdenes",Icon: IconClipboard },
  { href: "/perfil",     label: "Perfil",    Icon: IconUser },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/sign-")) return null;
  return (
    <nav className="md:hidden" style={{
      position:"fixed",bottom:0,left:0,right:0,height:"var(--nav-h)",
      background:"rgba(255,255,255,0.95)",backdropFilter:"blur(16px)",
      WebkitBackdropFilter:"blur(16px)",borderTop:"1px solid var(--border)",
      boxShadow:"0 -1px 0 var(--border)",display:"flex",zIndex:50,
      paddingBottom:"env(safe-area-inset-bottom)",
    }}>
      {TABS.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link key={href} href={href} style={{
            flex:1,display:"flex",flexDirection:"column",alignItems:"center",
            justifyContent:"center",gap:3,textDecoration:"none",
            color: active ? "#E31E24" : "#9CA3AF",
            fontSize:10,fontWeight: active ? 700 : 500,
            transition:"color 0.15s",
          }}>
            <span style={{
              display:"flex",alignItems:"center",justifyContent:"center",
              width:44,height:28,borderRadius:999,
              background: active ? "rgba(227,30,36,0.1)" : "transparent",
              transition:"background 0.15s",
            }}>
              <Icon size={21} strokeWidth={active ? 2.2 : 1.8} />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
