import { STATUS_LABEL, STATUS_COLOR } from "@/lib/format";

export function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLOR[status] ?? "#8891A8";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: `${color}1f`,
        color,
        border: `1px solid ${color}55`,
        borderRadius: 999,
        padding: "4px 10px",
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
