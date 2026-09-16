import { kindColor, kindLabel, type Project } from "@/lib/projects";

export function KindBadge({
  kind,
  size = "sm",
}: {
  kind: Project["kind"];
  size?: "sm" | "lg";
}) {
  const color = kindColor[kind];
  return (
    <span
      className={
        size === "lg"
          ? "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase"
          : "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.15em] uppercase"
      }
      style={{ color, borderColor: `color-mix(in srgb, ${color} 40%, transparent)` }}
    >
      {kindLabel[kind]}
    </span>
  );
}
