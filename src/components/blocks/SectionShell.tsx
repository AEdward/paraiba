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
}) {
  return (
    <section
      id={id}
      className={`${theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden border-t`}
      style={{ borderColor: "var(--border-soft)", scrollMarginTop: id ? "90px" : undefined }}
    >
      {withMesh && <GradientMesh />}
      <div
        className={`relative mx-auto max-w-6xl px-6 ${tightTop ? "pt-10 pb-20 sm:pt-12 sm:pb-24" : "py-20 sm:py-24"} ${center ? "text-center" : ""}`}
      >
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
