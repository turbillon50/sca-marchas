export function money(n: number | string | null | undefined): string {
  const v = typeof n === "string" ? parseFloat(n) : n ?? 0;
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(v || 0);
}

export const STATUS_FLOW = [
  "recibido",
  "diagnostico",
  "cotizacion",
  "reparacion",
  "listo",
  "entregado",
] as const;

export type StatusKey = (typeof STATUS_FLOW)[number];

export const STATUS_LABEL: Record<string, string> = {
  recibido: "Recibido",
  diagnostico: "Diagnóstico",
  cotizacion: "Cotización",
  reparacion: "Reparación",
  listo: "Listo",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export const STATUS_COLOR: Record<string, string> = {
  recibido: "#8891A8",
  diagnostico: "#3B82F6",
  cotizacion: "#F59E0B",
  reparacion: "#E31E24",
  listo: "#22C55E",
  entregado: "#16A34A",
  cancelado: "#6B7280",
};

export function statusIndex(status: string): number {
  const i = STATUS_FLOW.indexOf(status as StatusKey);
  return i < 0 ? 0 : i;
}

export function dateShort(d: string | Date | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
}
