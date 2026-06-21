"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { NewOrderModal } from "./NewOrderModal";
import { STATUS_LABEL, STATUS_FLOW, money } from "@/lib/format";
import { IconSearch, IconPlus } from "@/components/icons";
import type { OrderRow, TechRow } from "@/lib/queries";

const FILTERS = ["todos", ...STATUS_FLOW] as const;

export function OrdersClient({ orders, techs }: { orders: OrderRow[]; techs: TechRow[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("todos");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchQ =
        !q ||
        o.folio.toLowerCase().includes(q.toLowerCase()) ||
        (o.client ?? "").toLowerCase().includes(q.toLowerCase());
      const matchS = status === "todos" || o.status === status;
      return matchQ && matchS;
    });
  }, [orders, q, status]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 24, fontWeight: 900 }}>Órdenes</h1>
        <button
          onClick={() => setOpen(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#E31E24",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "11px 18px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <IconPlus size={18} /> Nueva orden
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "0 14px",
          marginBottom: 12,
        }}
      >
        <IconSearch size={18} className="opacity-60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por folio o cliente…"
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 14, padding: "12px 0" }}
        />
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12 }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setStatus(f)}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              fontSize: 13,
              whiteSpace: "nowrap",
              fontWeight: status === f ? 700 : 500,
              color: status === f ? "#fff" : "var(--text-muted)",
              background: status === f ? "rgba(227,30,36,.16)" : "var(--surface)",
              border: `1px solid ${status === f ? "rgba(227,30,36,.3)" : "var(--border)"}`,
              cursor: "pointer",
            }}
          >
            {f === "todos" ? "Todos" : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      <div className="sca-card" style={{ overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <p style={{ padding: 24, textAlign: "center", color: "var(--text-muted)" }}>Sin órdenes para este filtro.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--text-muted)", fontSize: 12 }}>
                  <th style={{ padding: "12px 16px" }}>Folio</th>
                  <th style={{ padding: "12px 16px" }}>Cliente</th>
                  <th style={{ padding: "12px 16px" }}>Pieza</th>
                  <th style={{ padding: "12px 16px" }}>Total</th>
                  <th style={{ padding: "12px 16px" }}>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} style={{ borderTop: "1px solid var(--border)", fontSize: 14 }}>
                    <td style={{ padding: "12px 16px", fontWeight: 700 }}>{o.folio}</td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{o.client ?? "Pieza suelta"}</td>
                    <td style={{ padding: "12px 16px", textTransform: "capitalize" }}>{o.partKind}</td>
                    <td style={{ padding: "12px 16px" }}>{money(o.total)}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <StatusBadge status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <NewOrderModal
          techs={techs}
          onClose={() => setOpen(false)}
          onCreated={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
