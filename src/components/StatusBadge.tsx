import { statusColor, statusLabel, type Project } from "@/lib/projects";

export function StatusBadge({
  status,
  size = "sm",
}: {
  status: Project["status"];
  size?: "sm" | "lg";
}) {
  const color = statusColor[status];
  return (
    <span
      className={
        size === "lg"
          ? "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase"
          : "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase"
      }
      style={{ color, background: `color-mix(in srgb, ${color} 14%, transparent)` }}
    >
      <span
        className={size === "lg" ? "h-2 w-2 rounded-full" : "h-1.5 w-1.5 rounded-full"}
        style={{ background: color }}
      />
      {statusLabel[status]}
    </span>
  );
}
