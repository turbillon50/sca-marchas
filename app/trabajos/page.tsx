"use client";
import { motion } from "framer-motion";
import { IconSearch, IconStar, IconClock, IconCheck } from "@/components/icons";
import { useState } from "react";

const IMG_M = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_020643_9fa25382-ebad-472b-b084-e60b5cfbbc4d.png";
const IMG_A = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_020916_b9b8af9d-446e-4b04-8326-8160db09d650.png";
const IMG_P = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_021157_345250a5-5c54-4659-9914-d02aa869da07.png";
const IMG_E = "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_021456_f498d4f2-9b1a-4b25-919e-e2459224a2cf.png";

const TRABAJOS = [
  { id:1, titulo:"Marcha Nissan Frontier 2018", tipo:"Marcha", img:IMG_M, tiempo:"4 hrs", garantia:"6 meses", estrellas:5, cliente:"Roberto M.", comentario:"Quedó perfecta, arranca al primer toque.", precio:"$950" },
  { id:2, titulo:"Alternador Ford F-150 2020", tipo:"Alternador", img:IMG_A, tiempo:"3 hrs", garantia:"6 meses", estrellas:5, cliente:"Jorge L.", comentario:"Excelente trabajo, carga perfecta.", precio:"$1,200" },
  { id:3, titulo:"Marcha Freightliner (Tracto)", tipo:"Pesado", img:IMG_P, tiempo:"6 hrs", garantia:"3 meses", estrellas:5, cliente:"Transportes del Norte", comentario:"Rápido y garantizado.", precio:"Cotización" },
  { id:4, titulo:"Alternador Toyota Hilux 2019", tipo:"Alternador", img:IMG_A, tiempo:"3 hrs", garantia:"6 meses", estrellas:5, cliente:"Carlos P.", comentario:"Salvaron mi camión en un día.", precio:"$1,100" },
  { id:5, titulo:"Marcha Honda CRV 2017", tipo:"Marcha", img:IMG_M, tiempo:"2 hrs", garantia:"6 meses", estrellas:5, cliente:"Ana G.", comentario:"Muy profesionales.", precio:"$850" },
  { id:6, titulo:"Diagnóstico + Alternador GM", tipo:"Diagnóstico", img:IMG_E, tiempo:"5 hrs", garantia:"6 meses", estrellas:5, cliente:"Refaccionaria La Silla", comentario:"Perfecto como siempre.", precio:"$1,350" },
];

const TIPOS = ["Todos","Marcha","Alternador","Pesado","Diagnóstico"];

export default function TrabajosPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const items = TRABAJOS.filter(t =>
    (filtro === "Todos" || t.tipo === filtro) &&
    (busqueda === "" || t.titulo.toLowerCase().includes(busqueda.toLowerCase()))
  );
  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding:"16px 16px 0", position:"sticky", top:0, background:"rgba(248,249,252,0.95)", backdropFilter:"blur(12px)", zIndex:30 }}>
        <h1 style={{ fontSize:22, fontWeight:900, marginBottom:12 }}>Trabajos realizados</h1>
        {/* Buscador */}
        <div style={{ display:"flex", alignItems:"center", gap:10, background:"#fff", border:"1px solid #E4E8F0", borderRadius:14, padding:"10px 14px", marginBottom:12, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
          <IconSearch size={18} style={{ color:"#9CA3AF", flexShrink:0 }} />
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)}
            placeholder="Busca por modelo o servicio..."
            style={{ border:"none", outline:"none", background:"transparent", fontSize:14, flex:1, color:"#0F1117" }} />
        </div>
        {/* Filtros */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:12, scrollbarWidth:"none" }}>
          {TIPOS.map(t => (
            <button key={t} onClick={()=>setFiltro(t)} style={{
              padding:"6px 16px", borderRadius:999, border:"none", cursor:"pointer", whiteSpace:"nowrap",
              fontWeight:600, fontSize:13, transition:"all 0.15s",
              background: filtro===t ? "#E31E24" : "#fff",
              color: filtro===t ? "#fff" : "#6B7280",
              boxShadow: filtro===t ? "0 2px 8px rgba(227,30,36,0.3)" : "0 1px 3px rgba(0,0,0,0.08)",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Grid de trabajos */}
      <div style={{ padding:"0 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        {items.map((t, i) => (
          <motion.div key={t.id}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.05, duration:0.35 }}
            whileTap={{ scale:0.97 }}
            style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 1px 3px rgba(0,0,0,0.06), 0 8px 20px -8px rgba(0,0,0,0.12)", cursor:"pointer" }}>
            {/* Foto */}
            <div style={{ position:"relative", height:110, overflow:"hidden" }}>
              <img src={t.img} alt={t.titulo} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
              <span style={{ position:"absolute", top:8, left:8, background:"#E31E24", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:999 }}>{t.tipo}</span>
              <span style={{ position:"absolute", bottom:8, right:8, background:"rgba(255,255,255,0.9)", backdropFilter:"blur(4px)", fontSize:11, fontWeight:700, color:"#0F1117", padding:"3px 8px", borderRadius:999 }}>{t.precio}</span>
            </div>
            {/* Info */}
            <div style={{ padding:"10px 10px 12px" }}>
              <div style={{ fontSize:13, fontWeight:700, lineHeight:1.3, marginBottom:6, color:"#0F1117" }}>{t.titulo}</div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ display:"flex", alignItems:"center", gap:3, fontSize:11, color:"#6B7280" }}>
                  <IconClock size={12} /> {t.tiempo}
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:3, fontSize:11, color:"#22C55E" }}>
                  <IconCheck size={12} /> {t.garantia}
                </span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <IconStar size={12} style={{ color:"#F59E0B" }} />
                <span style={{ fontSize:11, fontWeight:700 }}>5.0</span>
                <span style={{ fontSize:11, color:"#9CA3AF" }}>· {t.cliente}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Banner rastrear */}
      <div style={{ margin:"20px 16px 0", background:"linear-gradient(135deg,#E31E24,#9B1C1C)", borderRadius:16, padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ color:"#fff", fontWeight:800, fontSize:15 }}>¿Dejaste tu pieza?</div>
          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:12, marginTop:2 }}>Rastrea tu orden con tu folio</div>
        </div>
        <a href="/seguimiento" style={{ background:"#fff", color:"#E31E24", fontWeight:700, fontSize:13, padding:"10px 16px", borderRadius:12, textDecoration:"none" }}>Rastrear →</a>
      </div>
    </div>
  );
}
