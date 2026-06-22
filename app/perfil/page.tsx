"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/Logo";
import { IconClipboard, IconBolt, IconCheck } from "@/components/icons";

export default function PerfilPage() {
  return (
    <div style={{ paddingBottom:80, background:"#F7F8FA", minHeight:"100vh" }}>
      <div style={{ padding:"32px 24px 0", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
        <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.5 }}>
          <LogoMark size={88} />
        </motion.div>
        <h2 style={{ fontSize:24, fontWeight:900, marginTop:20, marginBottom:8 }}>SCA — Tu taller de confianza</h2>
        <p style={{ color:"#6B7280", fontSize:15, lineHeight:1.6, marginBottom:32, maxWidth:300 }}>
          Regístrate para rastrear tus órdenes, ver el historial de tus piezas y recibir notificaciones.
        </p>
        <Link href="/sign-in" style={{ display:"block", width:"100%", maxWidth:320, background:"#E31E24", color:"#fff", fontWeight:700, fontSize:16, padding:"16px 24px", borderRadius:16, textDecoration:"none", textAlign:"center", boxShadow:"0 4px 16px rgba(227,30,36,.35)" }}>
          Iniciar sesión
        </Link>
        <p style={{ color:"#9CA3AF", fontSize:13, marginTop:16 }}>
          ¿Primera vez? <Link href="/sign-up" style={{ color:"#E31E24", fontWeight:600, textDecoration:"none" }}>Crear cuenta</Link>
        </p>
      </div>

      <div style={{ margin:"40px 16px 0", display:"flex", flexDirection:"column", gap:12 }}>
        {[
          { Icon:IconClipboard, t:"Historial completo", d:"Ve todas tus órdenes pasadas y activas" },
          { Icon:IconBolt,      t:"Seguimiento en tiempo real", d:"Sabe exactamente en qué etapa está tu pieza" },
          { Icon:IconCheck,     t:"Garantías registradas", d:"Consulta tus garantías cuando las necesites" },
        ].map((b,i)=>(
          <motion.div key={i} initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1*i+0.3 }}
            style={{ display:"flex", alignItems:"center", gap:14, background:"#fff", borderRadius:16, padding:"14px 16px", boxShadow:"0 2px 8px rgba(0,0,0,.06)" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:"rgba(227,30,36,.08)", color:"#E31E24", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <b.Icon size={22} />
            </div>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>{b.t}</div>
              <div style={{ color:"#6B7280", fontSize:12, marginTop:2 }}>{b.d}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ margin:"24px 16px 0", background:"linear-gradient(135deg,#E31E24,#9B1C1C)", borderRadius:18, padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <div>
          <div style={{ color:"#fff", fontWeight:800, fontSize:15 }}>¿Eres administrador?</div>
          <div style={{ color:"rgba(255,255,255,.8)", fontSize:12, marginTop:2 }}>Accede al panel SCA Admin</div>
        </div>
        <Link href="/sign-in" style={{ background:"#fff", color:"#E31E24", fontWeight:700, fontSize:13, padding:"10px 14px", borderRadius:12, textDecoration:"none" }}>Admin →</Link>
      </div>
    </div>
  );
}
