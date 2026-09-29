import type { ReactNode } from "react";
import type { SectionTheme } from "@/lib/blocks/types";
import { GradientMesh } from "@/components/GradientMesh";

export function SectionShell({
  theme,
  children,
  withMesh = false,
  center = false,
  id,
  tightTop = false,
  compact = false,
  background,
  maxWidth = "max-w-6xl",
}: {
  theme: SectionTheme;
  children: ReactNode;
  withMesh?: boolean;
  center?: boolean;
  id?: string;
  // Cuts the section's top padding for when it immediately follows a
  // visually dense block (e.g. the hero or stats bar) and the usual amount
  // of breathing room reads as a big empty gap instead.
  tightTop?: boolean;
  // Cuts padding on both top and bottom — for sections whose content is
  // already dense/compact (e.g. a split text+card-grid layout), where the
  // usual full padding reads as oversized relative to the content.
  compact?: boolean;
  // Full-bleed content (e.g. a background photo + gradient scrim) painted
  // behind everything, edge-to-edge across the whole section — unlike
  // `children`, which stays inside the centered max-w-6xl column.
  background?: ReactNode;
  // Widens the centered content column beyond the default max-w-6xl — for
  // sections like the job board whose sidebar + content layout needs more
  // room to breathe than the standard reading-width column allows.
  maxWidth?: string;
}) {
  const padding = compact
    ? "py-14 sm:py-16"
    : tightTop
      ? "pt-10 pb-20 sm:pt-12 sm:pb-24"
      : "py-20 sm:py-24";
  return (
    <section
      id={id}
      className={`${theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden border-t`}
      style={{ borderColor: "var(--border-soft)", scrollMarginTop: id ? "90px" : undefined }}
    >
      {withMesh && <GradientMesh />}
      {background}
      <div className={`relative mx-auto ${maxWidth} px-6 ${padding} ${center ? "text-center" : ""}`}>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, color = "var(--color-ember)" }: { children: ReactNode; color?: string }) {
  if (!children) return null;
  return (
    <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color }}>
      {children}
    </p>
  );
}
