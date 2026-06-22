'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo, LogoMark, LogoSplash } from "@/components/Logo";

const IMGS = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_020434_6ff639c1-15c6-45ff-8618-3cd73f36011e.png",
  M: "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_020643_9fa25382-ebad-472b-b084-e60b5cfbbc4d.png",
  A: "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_020916_b9b8af9d-446e-4b04-8326-8160db09d650.png",
  P: "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_021157_345250a5-5c54-4659-9914-d02aa869da07.png",
  E: "https://d8j0ntlcm91z4.cloudfront.net/user_3DDb66hXpSaWG4DmoX3Ae5V2dqt/hf_20260622_021456_f498d4f2-9b1a-4b25-919e-e2459224a2cf.png",
};

const SERVICIOS = [
  { tipo:"Marcha", titulo:"Reparación de Marchas", img:IMGS.M, precio:"Desde $850" },
  { tipo:"Alternador", titulo:"Reparación de Alternadores", img:IMGS.A, precio:"Desde $950" },
  { tipo:"Pesado", titulo:"Tractos y Maquinaria", img:IMGS.P, precio:"Cotización" },
  { tipo:"Diagnóstico", titulo:"Diagnóstico en Banco", img:IMGS.E, precio:"Desde $150" },
];

const TRABAJOS = [
  { tipo:"Marcha", titulo:"Nissan Frontier 2018", img:IMGS.M, precio:"$950", estrellas:5, tiempo:"4 hrs", garantia:"6 meses", cliente:"Roberto M.", quote:"La marcha quedó perfecta, arranca al primer toque." },
  { tipo:"Alternador", titulo:"Ford F-150 2020", img:IMGS.A, precio:"$1,200", estrellas:5, tiempo:"3 hrs", garantia:"6 meses", cliente:"Jorge L.", quote:"Mi camión quedó perfecto, carga al 100%." },
  { tipo:"Pesado", titulo:"Freightliner Tracto", img:IMGS.P, precio:"Cotización", estrellas:5, tiempo:"6 hrs", garantia:"3 meses", cliente:"Transportes del Norte", quote:"Rápido y garantizado, los mejores para pesado." },
  { tipo:"Alternador", titulo:"Toyota Hilux 2019", img:IMGS.A, precio:"$1,100", estrellas:5, tiempo:"3 hrs", garantia:"6 meses", cliente:"Carlos P.", quote:"Salvaron mi camión, lo entregaron al día siguiente." },
];

const RESENAS = [
  { nombre:"Roberto M.", tipo:"Mecánico independiente", color:"#E31E24", texto:"La marcha de mi Suburban quedó perfecta. La tuvieron lista el mismo día. Ya son mis proveedores de confianza.", estrellas:5 },
  { nombre:"Jorge L.", tipo:"Taller automotriz", color:"#1D4ED8", texto:"Trabajo rápido y garantizado. El seguimiento en la app es muy práctico. Mando todo con SCA.", estrellas:5 },
  { nombre:"Carlos P.", tipo:"Dueño de tracto", color:"#059669", texto:"Mi camión quedó parado por el alternador. SCA lo resolvieron al día siguiente. Salvaron mi semana.", estrellas:5 },
];

export default function HomePage() {
  const [popup, setPopup] = useState<any>(null);

  return (
    <main style={{ background:"#F7F8FA", minHeight:"100vh", paddingBottom:80 }}>

      {/* HERO */}
      <div style={{ position:"relative", margin:"12px", borderRadius:22, overflow:"hidden", height:280 }}>
        <img src={IMGS.hero} alt="Taller SCA" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,.75) 100%)" }}/>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:20 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,.18)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.3)", borderRadius:999, padding:"5px 12px", fontSize:11, fontWeight:700, color:"#fff", marginBottom:10 }}>
            📍 San Nicolás de los Garza, NL
          </div>
          <h1 style={{ fontSize:26, fontWeight:900, color:"#fff", lineHeight:1.15, marginBottom:8 }}>
            Expertos en marchas<br/>y alternadores
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.82)", marginBottom:16, lineHeight:1.5 }}>
            Reparación profesional para auto, carga y maquinaria pesada. Diagnóstico en banco, garantía real.
          </p>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/seguimiento" style={{ background:"#E31E24", color:"#fff", borderRadius:14, padding:"12px 20px", fontSize:14, fontWeight:700, display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 16px rgba(227,30,36,.4)", textDecoration:"none" }}>
              Rastrear orden →
            </Link>
            <a href="tel:+528112345678" style={{ background:"rgba(255,255,255,.18)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.3)", color:"#fff", borderRadius:14, padding:"12px 18px", fontSize:14, fontWeight:600, display:"flex", alignItems:"center", gap:6, textDecoration:"none" }}>
              📞 Llamar
            </a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, margin:"0 12px 24px" }}>
        {[{n:"+2,400",l:"Piezas reparadas"},{n:"4.9⭐",l:"127 reseñas"},{n:"+12 años",l:"Experiencia"}].map(s=>(
          <div key={s.l} style={{ background:"#fff", borderRadius:16, padding:"14px 12px", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize:20, fontWeight:900, color:"#E31E24" }}>{s.n}</div>
            <div style={{ fontSize:10, color:"#6B7280", marginTop:3, fontWeight:600, lineHeight:1.3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* SERVICIOS CARRUSEL */}
      <div style={{ padding:"0 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:17, fontWeight:800 }}>Servicios</span>
        <Link href="/trabajos" style={{ fontSize:13, color:"#E31E24", fontWeight:600, textDecoration:"none" }}>Ver todos →</Link>
      </div>
      <div style={{ display:"flex", gap:14, overflowX:"auto", padding:"0 16px 8px", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
        {SERVICIOS.map((s,i)=>(
          <motion.div key={i} whileTap={{ scale:0.96 }} onClick={()=>setPopup(TRABAJOS.find(t=>t.tipo===s.tipo)||TRABAJOS[0])}
            style={{ minWidth:180, background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,.06),0 12px 24px -8px rgba(0,0,0,.10)", scrollSnapAlign:"start", flexShrink:0, cursor:"pointer" }}>
            <img src={s.img} alt={s.titulo} style={{ width:"100%", height:120, objectFit:"cover" }}/>
            <div style={{ padding:12 }}>
              <div style={{ fontSize:10, fontWeight:700, color:"#E31E24", letterSpacing:.5, textTransform:"uppercase", marginBottom:4 }}>{s.tipo}</div>
              <div style={{ fontSize:13, fontWeight:700, lineHeight:1.3 }}>{s.titulo}</div>
              <div style={{ fontSize:13, color:"#E31E24", fontWeight:800, marginTop:6 }}>{s.precio}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TRABAJOS RECIENTES */}
      <div style={{ padding:"0 16px", margin:"24px 0 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:17, fontWeight:800 }}>Trabajos recientes</span>
        <Link href="/trabajos" style={{ fontSize:13, color:"#E31E24", fontWeight:600, textDecoration:"none" }}>Ver todos →</Link>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, padding:"0 12px" }}>
        {TRABAJOS.map((t,i)=>(
          <motion.div key={i} whileTap={{ scale:0.97 }} onClick={()=>setPopup(t)}
            style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 2px 8px rgba(0,0,0,.06),0 12px 24px -8px rgba(0,0,0,.10)", cursor:"pointer" }}>
            <div style={{ position:"relative", height:130, overflow:"hidden" }}>
              <img src={t.img} alt={t.titulo} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 55%)" }}/>
              <span style={{ position:"absolute", top:8, left:8, background:"#E31E24", color:"#fff", fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:999, textTransform:"uppercase", letterSpacing:.3 }}>{t.tipo}</span>
              <span style={{ position:"absolute", bottom:8, right:8, background:"rgba(255,255,255,.92)", backdropFilter:"blur(4px)", fontSize:11, fontWeight:800, color:"#0F1117", padding:"3px 8px", borderRadius:999 }}>{t.precio}</span>
            </div>
            <div style={{ padding:"10px 10px 12px" }}>
              <div style={{ fontSize:12, fontWeight:700, lineHeight:1.3, marginBottom:6 }}>{t.titulo}</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ color:"#F59E0B", fontSize:10, fontWeight:700 }}>{"★".repeat(t.estrellas)}</span>
                <span style={{ fontSize:10, color:"#6B7280" }}>{t.tiempo} · {t.garantia}</span>
              </div>
              <div style={{ fontSize:11, color:"#6B7280", marginTop:4 }}>{t.cliente}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* RESEÑAS CARRUSEL */}
      <div style={{ padding:"0 16px", margin:"24px 0 14px" }}>
        <span style={{ fontSize:17, fontWeight:800 }}>Lo que dicen</span>
      </div>
      <div style={{ display:"flex", gap:12, overflowX:"auto", padding:"0 16px 8px", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
        {RESENAS.map((r,i)=>(
          <div key={i} style={{ minWidth:240, background:"#fff", borderRadius:18, padding:16, boxShadow:"0 2px 8px rgba(0,0,0,.06)", scrollSnapAlign:"start", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:r.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, color:"#fff", flexShrink:0 }}>{r.nombre[0]}</div>
              <div><strong style={{ fontSize:14 }}>{r.nombre}</strong><div style={{ fontSize:11, color:"#6B7280" }}>{r.tipo}</div></div>
            </div>
            <div style={{ color:"#F59E0B", fontSize:13, marginBottom:8 }}>{"★".repeat(r.estrellas)}</div>
            <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.5 }}>"{r.texto}"</div>
          </div>
        ))}
      </div>

      {/* CTA BANNER */}
      <div style={{ margin:"20px 12px 0", background:"linear-gradient(135deg,#E31E24,#9B1C1C)", borderRadius:20, padding:20, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <div>
          <div style={{ color:"#fff", fontWeight:800, fontSize:15 }}>¿Dejaste tu pieza?</div>
          <div style={{ color:"rgba(255,255,255,.8)", fontSize:12, marginTop:2 }}>Rastrea tu orden con tu folio</div>
        </div>
        <Link href="/seguimiento" style={{ background:"#fff", color:"#E31E24", fontWeight:700, fontSize:13, padding:"10px 16px", borderRadius:12, textDecoration:"none", whiteSpace:"nowrap" }}>Rastrear →</Link>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={()=>setPopup(null)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", zIndex:200, display:"flex", alignItems:"flex-end" }}>
            <motion.div initial={{ y:"100%" }} animate={{ y:0 }} exit={{ y:"100%" }}
              transition={{ type:"spring", damping:30, stiffness:300 }}
              onClick={e=>e.stopPropagation()}
              style={{ background:"#fff", borderRadius:"24px 24px 0 0", width:"100%", maxHeight:"80vh", overflow:"auto", padding:20, paddingBottom:"calc(20px + env(safe-area-inset-bottom))" }}>
              <div style={{ width:36, height:4, background:"#E4E8F0", borderRadius:2, margin:"0 auto 16px" }}/>
              <img src={popup.img} alt={popup.titulo} style={{ width:"100%", height:200, objectFit:"cover", borderRadius:16, marginBottom:16 }}/>
              <span style={{ display:"inline-block", background:"#E31E24", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:999, marginBottom:10 }}>{popup.tipo}</span>
              <h2 style={{ fontSize:20, fontWeight:900, marginBottom:6 }}>{popup.titulo}</h2>
              <div style={{ display:"flex", gap:16, marginBottom:14 }}>
                <span style={{ fontSize:13, color:"#6B7280" }}>⏱ {popup.tiempo}</span>
                <span style={{ fontSize:13, color:"#22C55E", fontWeight:600 }}>✓ {popup.garantia} garantía</span>
              </div>
              <div style={{ background:"#F7F8FA", borderLeft:"3px solid #E31E24", padding:"12px 14px", borderRadius:"0 12px 12px 0", fontSize:13, color:"#6B7280", lineHeight:1.6, fontStyle:"italic", marginBottom:16 }}>
                "{popup.quote}" — {popup.cliente}
              </div>
              <div style={{ fontSize:24, fontWeight:900, color:"#E31E24", marginBottom:4 }}>{popup.precio}</div>
              <div style={{ fontSize:12, color:"#22C55E", fontWeight:600, marginBottom:20 }}>✓ Garantía por escrito incluida</div>
              <button onClick={()=>setPopup(null)} style={{ width:"100%", background:"#F7F8FA", border:"1px solid #E4E8F0", color:"#6B7280", fontWeight:600, padding:14, borderRadius:14, fontSize:14, cursor:"pointer" }}>Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
