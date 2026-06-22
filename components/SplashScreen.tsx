"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./Logo";

// Splash 2s: fondo ROJO SCA, emblema blanco + wordmark blanco, fade-in / sostén / fade-out.
export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#E31E24",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
          >
            <LogoMark size={96} />
            <div style={{ lineHeight: 1, textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: 2, color: "#FFFFFF" }}>SCA</div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  marginTop: 8,
                }}
              >
                Sistema de Carga y Arranque
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ width: 140, height: 3, borderRadius: 3, overflow: "hidden", background: "rgba(255,255,255,0.25)" }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
              style={{ width: "60%", height: "100%", background: "#FFFFFF" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
