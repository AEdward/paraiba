import type { ReactNode } from "react";
import type { SectionTheme } from "@/lib/blocks/types";
import { GradientMesh } from "@/components/GradientMesh";

export function SectionShell({
  theme,
  children,
  withMesh = false,
  center = false,
  id,
}: {
  theme: SectionTheme;
  children: ReactNode;
  withMesh?: boolean;
  center?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden border-t`}
      style={{ borderColor: "var(--border-soft)", scrollMarginTop: id ? "90px" : undefined }}
    >
      {withMesh && <GradientMesh />}
      <div className={`relative mx-auto max-w-6xl px-6 py-20 sm:py-24 ${center ? "text-center" : ""}`}>
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
