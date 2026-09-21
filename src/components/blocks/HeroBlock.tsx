import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { Hero3D } from "@/components/three/Hero3D";
import type { HeroData } from "@/lib/blocks/types";

export function HeroBlock({ data }: { data: HeroData }) {
  const eyebrowColor = "var(--color-ember)";

  return (
    <section className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden`}>
      <GradientMesh />
      <div
        className={
          data.showLogo3D
            ? "relative mx-auto grid max-w-6xl items-center gap-10 px-6 pt-14 pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:pb-28"
            : `relative mx-auto max-w-4xl px-6 py-20 sm:py-28 ${data.align === "center" ? "text-center" : ""}`
        }
      >
        <div>
          {data.eyebrow && (
            <FadeIn>
              <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: eyebrowColor }}>
                {data.eyebrow}
              </p>
            </FadeIn>
          )}
          <FadeIn delay={0.1}>
            <h1
              className={`font-display mt-4 text-4xl leading-tight font-bold sm:text-5xl ${data.showLogo3D ? "max-w-xl leading-[0.98] sm:text-7xl" : "mx-auto max-w-2xl"}`}
              style={data.theme === "light" ? { color: "var(--ink)" } : undefined}
            >
              {data.headline}
              {data.headlineHighlight && (
                <span className={data.theme === "dark" ? "paraiba-text-gradient" : ""} style={data.theme === "light" ? { color: "var(--color-ember)" } : undefined}>
                  {data.headlineHighlight}
                </span>
              )}
            </h1>
          </FadeIn>
          {data.subhead && (
            <FadeIn delay={0.2}>
              <p className={`mt-6 text-lg opacity-70 ${data.showLogo3D ? "max-w-lg" : "mx-auto max-w-xl"}`}>
                {data.subhead}
              </p>
            </FadeIn>
          )}
          {(data.primaryLabel || data.secondaryLabel) && (
            <FadeIn delay={0.3}>
              <div className={`mt-10 flex flex-wrap gap-3 ${data.showLogo3D ? "" : "justify-center"}`}>
                {data.primaryLabel && data.primaryHref && (
                  <Link
                    href={data.primaryHref}
                    className="font-display inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--color-ember)" }}
                  >
                    {data.primaryLabel} <ArrowRight size={16} />
                  </Link>
                )}
                {data.secondaryLabel && data.secondaryHref && (
                  <Link
                    href={data.secondaryHref}
                    className="font-display inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
                    style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
                  >
                    {data.secondaryLabel}
                  </Link>
                )}
              </div>
            </FadeIn>
          )}
        </div>

        {data.showLogo3D && (
          <FadeIn delay={0.15} className="relative">
            <div
              className="mx-auto flex max-w-md items-center justify-center rounded-3xl border p-6"
              style={{
                borderColor: "rgba(8,124,255,0.18)",
                background:
                  "radial-gradient(circle at 70% 20%, rgba(8,124,255,0.14), transparent 60%), rgba(255,255,255,0.03)",
              }}
            >
              <Hero3D />
            </div>
            <p className="mt-3 text-center text-xs opacity-40">Drag to spin the mark</p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
