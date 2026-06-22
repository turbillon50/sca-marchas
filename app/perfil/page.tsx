"use client";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/Logo";
import { IconUser, IconClipboard, IconBolt, IconCheck } from "@/components/icons";

export default function PerfilPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!isLoaded) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <div style={{ width:32, height:32, borderRadius:"50%", border:"3px solid #E31E24", borderTopColor:"transparent", animation:"spin 0.7s linear infinite" }} />
    </div>
  );

  // NO autenticado — pantalla de bienvenida con CTA de login
  if (!isSignedIn) return (
    <div style={{ paddingBottom:80 }}>
      <div style={{ padding:"40px 24px 0", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
        <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.5 }}>
          <LogoMark size={80} />
        </motion.div>
        <h2 style={{ fontSize:24, fontWeight:900, marginTop:20, marginBottom:8 }}>SCA — Tu taller de confianza</h2>
        <p style={{ color:"#6B7280", fontSize:15, lineHeight:1.6, marginBottom:32, maxWidth:300 }}>
          Regístrate para rastrear tus órdenes, ver el historial de tus piezas y más.
        </p>
        <SignInButton mode="modal">
          <button style={{ width:"100%", maxWidth:320, background:"#E31E24", color:"#fff", fontWeight:700, fontSize:16, padding:"16px 24px", borderRadius:16, border:"none", cursor:"pointer", boxShadow:"0 4px 16px rgba(227,30,36,0.35)" }}>
            Iniciar sesión
          </button>
        </SignInButton>
        <p style={{ color:"#9CA3AF", fontSize:13, marginTop:16 }}>
          ¿Primera vez? <SignInButton mode="modal"><span style={{ color:"#E31E24", fontWeight:600, cursor:"pointer" }}>Crear cuenta</span></SignInButton>
        </p>
      </div>
      {/* Beneficios */}
      <div style={{ margin:"40px 16px 0", display:"flex", flexDirection:"column", gap:12 }}>
        {[
          { icon:<IconClipboard size={20}/>, t:"Historial completo", d:"Ve todas tus órdenes pasadas y activas" },
          { icon:<IconBolt size={20}/>,      t:"Seguimiento en tiempo real", d:"Sabe exactamente en qué etapa está tu pieza" },
          { icon:<IconCheck size={20}/>,     t:"Garantías registradas", d:"Consulta tus garantías cuando las necesites" },
        ].map((b,i) => (
          <motion.div key={i} initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1*i+0.3 }}
            style={{ display:"flex", alignItems:"center", gap:14, background:"#fff", borderRadius:16, padding:"14px 16px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:"rgba(227,30,36,0.08)", color:"#E31E24", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{b.icon}</div>
            <div><div style={{ fontWeight:700, fontSize:14 }}>{b.t}</div><div style={{ color:"#6B7280", fontSize:12, marginTop:2 }}>{b.d}</div></div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // AUTENTICADO — perfil + toggle admin si aplica
  return (
    <div style={{ paddingBottom:80 }}>
      {/* Header perfil */}
      <div style={{ padding:"24px 20px 0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"#E31E24", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {user.imageUrl
              ? <img src={user.imageUrl} alt="" style={{ width:64, height:64, borderRadius:"50%", objectFit:"cover" }} />
              : <span style={{ fontSize:26, fontWeight:900, color:"#fff" }}>{user.firstName?.[0] ?? "U"}</span>
            }
          </div>
          <div>
            <div style={{ fontSize:18, fontWeight:800 }}>{user.fullName ?? "Usuario"}</div>
            <div style={{ fontSize:13, color:"#6B7280", marginTop:2 }}>{user.primaryEmailAddress?.emailAddress}</div>
            {isAdmin && <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(227,30,36,0.1)", color:"#E31E24", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999, marginTop:6 }}>⚡ Administrador</div>}
          </div>
        </div>

        {/* BOTÓN ADMIN — solo visible si tiene rol admin */}
        {isAdmin && (
          <motion.button
            whileTap={{ scale:0.97 }}
            onClick={() => router.push("/admin/dashboard")}
            style={{ width:"100%", background:"linear-gradient(135deg,#E31E24,#9B1C1C)", color:"#fff", fontWeight:700, fontSize:15, padding:"16px 20px", borderRadius:16, border:"none", cursor:"pointer", boxShadow:"0 4px 16px rgba(227,30,36,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:16 }}>
            <IconBolt size={20} />
            Ir al panel de administración
          </motion.button>
        )}

        {/* Menú perfil */}
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { label:"Mis órdenes", sub:"Ver historial completo", href:"/mis-ordenes" },
            { label:"Mis vehículos", sub:"Piezas y vehículos registrados", href:"#" },
            { label:"Notificaciones", sub:"Activadas", href:"#" },
            { label:"Contactar SCA", sub:"WhatsApp · 81-XXXX-XXXX", href:"https://wa.me/5218112345678" },
            { label:"Términos y Privacidad", sub:"", href:"#" },
          ].map((item,i) => (
            <a key={i} href={item.href} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fff", borderRadius:14, padding:"14px 16px", textDecoration:"none", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" }}>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:"#0F1117" }}>{item.label}</div>
                {item.sub && <div style={{ fontSize:12, color:"#6B7280", marginTop:2 }}>{item.sub}</div>}
              </div>
              <span style={{ color:"#9CA3AF", fontSize:18 }}>›</span>
            </a>
          ))}
        </div>

        <SignOutButton>
          <button style={{ width:"100%", background:"transparent", border:"1px solid #E4E8F0", color:"#6B7280", fontWeight:600, fontSize:14, padding:"14px", borderRadius:14, cursor:"pointer", marginTop:16 }}>
            Cerrar sesión
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
