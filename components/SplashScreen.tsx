"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoSplash } from "./Logo";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#E31E24",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <LogoSplash size={128} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: 3, color: "#FFFFFF" }}>SCA</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: 1.5, marginTop: 6 }}>
                Sistema de Carga y Arranque
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{ width: 100, height: 3, borderRadius: 3, background: "rgba(255,255,255,0.45)", transformOrigin: "left" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
