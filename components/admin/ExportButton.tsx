"use client";

import type { OrderRow } from "@/lib/queries";
import { IconArrowRight } from "@/components/icons";

export function ExportButton({ orders }: { orders: OrderRow[] }) {
  function exportCsv() {
    const header = ["folio", "cliente", "pieza", "estatus", "total", "fecha"];
    const rows = orders.map((o) => [o.folio, o.client ?? "", o.partKind, o.status, o.total, o.createdAt]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sca-reporte-ordenes.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={exportCsv}
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
      Exportar CSV <IconArrowRight size={16} />
    </button>
  );
}
