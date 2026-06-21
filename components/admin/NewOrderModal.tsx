"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TechRow } from "@/lib/queries";

export function NewOrderModal({
  techs,
  onClose,
  onCreated,
}: {
  techs: TechRow[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    clientName: "",
    phone: "",
    intakeType: "vehiculo",
    partKind: "marcha",
    description: "",
    technicianId: "",
    total: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo crear la orden");
      onCreated();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "11px 12px",
    color: "var(--text)",
    fontSize: 14,
    outline: "none",
  };
  const labelStyle: React.CSSProperties = { fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 0,
      }}
      className="md:items-center md:p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="sca-card"
        style={{
          width: "100%",
          maxWidth: 460,
          maxHeight: "90dvh",
          overflowY: "auto",
          padding: 22,
          borderRadius: "20px 20px 0 0",
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Nueva orden</h2>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={labelStyle}>Cliente</label>
            <input style={inputStyle} value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="Nombre del cliente" />
          </div>
          <div>
            <label style={labelStyle}>Teléfono</label>
            <input style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+52…" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Tipo de ingreso</label>
              <select style={inputStyle} value={form.intakeType} onChange={(e) => set("intakeType", e.target.value)}>
                <option value="vehiculo">Vehículo</option>
                <option value="pieza_suelta">Pieza suelta</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Pieza</label>
              <select style={inputStyle} value={form.partKind} onChange={(e) => set("partKind", e.target.value)}>
                <option value="marcha">Marcha</option>
                <option value="alternador">Alternador</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Descripción del trabajo</label>
            <textarea
              style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Falla reportada…"
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>Técnico asignado</label>
              <select style={inputStyle} value={form.technicianId} onChange={(e) => set("technicianId", e.target.value)}>
                <option value="">Sin asignar</option>
                {techs.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Total estimado</label>
              <input style={inputStyle} value={form.total} onChange={(e) => set("total", e.target.value)} placeholder="0.00" inputMode="decimal" />
            </div>
          </div>
        </div>

        {error && <p style={{ color: "#ff6b6f", fontSize: 13, marginTop: 12 }}>{error}</p>}

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <button
            onClick={onClose}
            style={{ flex: 1, background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px", fontWeight: 600, cursor: "pointer" }}
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            disabled={saving || !form.clientName}
            style={{
              flex: 1,
              background: saving || !form.clientName ? "#7d0f12" : "#E31E24",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px",
              fontWeight: 700,
              cursor: saving ? "default" : "pointer",
              opacity: !form.clientName ? 0.6 : 1,
            }}
          >
            {saving ? "Guardando…" : "Crear orden"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
