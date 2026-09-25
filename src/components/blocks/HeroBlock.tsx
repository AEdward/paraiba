import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { Hero3D } from "@/components/three/Hero3D";
import { ICONS, type HeroData } from "@/lib/blocks/types";

export function HeroBlock({ data }: { data: HeroData }) {
  const eyebrowColor = "var(--color-ember)";
  const hasVisual = Boolean(data.showLogo3D || data.mockupImage);
  // The 3D logo card is tall/square and can carry a big, heavily-wrapped
  // headline; the device-mockup image is shorter, so its headline stays
  // closer to the no-visual size to keep the two columns balanced and the
  // whole hero within one viewport.
  const mockupVariant = !data.showLogo3D && Boolean(data.mockupImage);

  return (
    <section className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden`}>
      <GradientMesh />
      <div
        className={
          hasVisual
            ? `relative mx-auto grid max-w-6xl gap-10 px-6 lg:gap-12 ${
                mockupVariant
                  ? "items-start py-10 sm:py-12 lg:grid-cols-[1fr_1.3fr]"
                  : "items-center pt-14 pb-20 sm:pt-16 lg:grid-cols-2 lg:pb-28"
              }`
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
              className={`font-display leading-tight font-bold ${
                mockupVariant
                  ? "mt-3 max-w-lg text-3xl sm:text-4xl lg:text-5xl"
                  : `mt-4 text-4xl sm:text-5xl ${hasVisual ? "max-w-xl leading-[0.98] sm:text-7xl" : "mx-auto max-w-2xl"}`
              }`}
              style={data.theme === "light" ? { color: "var(--ink)" } : undefined}
            >
              {data.headline.trimEnd()}
              {data.headlineHighlight && (
                <>
                  {" "}
                  <span className={data.theme === "dark" ? "paraiba-text-gradient" : ""} style={data.theme === "light" ? { color: "var(--color-ember)" } : undefined}>
                    {data.headlineHighlight}
                  </span>
                </>
              )}
            </h1>
          </FadeIn>
          {data.subhead && (
            <FadeIn delay={0.2}>
              <p className={`opacity-70 ${mockupVariant ? "mt-3 max-w-md text-sm sm:text-base" : `mt-6 text-lg ${hasVisual ? "max-w-lg" : "mx-auto max-w-xl"}`}`}>
                {data.subhead}
              </p>
            </FadeIn>
          )}
          {(data.primaryLabel || data.secondaryLabel) && (
            <FadeIn delay={0.3}>
              <div className={`flex flex-wrap gap-3 ${mockupVariant ? "mt-6" : "mt-10"} ${hasVisual ? "" : "justify-center"}`}>
                {data.primaryLabel && data.primaryHref && (
                  <Link
                    href={data.primaryHref}
                    className={`font-display inline-flex items-center gap-2 rounded-xl text-sm font-bold text-white transition-transform hover:-translate-y-0.5 ${mockupVariant ? "px-5 py-2.5" : "px-6 py-3.5"}`}
                    style={{ background: "var(--color-ember)" }}
                  >
                    {data.primaryLabel} <ArrowRight size={16} />
                  </Link>
                )}
                {data.secondaryLabel && data.secondaryHref && (
                  <Link
                    href={data.secondaryHref}
                    className={`font-display inline-flex items-center gap-2 rounded-xl border text-sm font-bold transition-transform hover:-translate-y-0.5 ${mockupVariant ? "px-5 py-2.5" : "px-6 py-3.5"}`}
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
                  "radial-gradient(circle at 70% 20%, rgba(8,124,255,0.22), transparent 60%), linear-gradient(160deg, #0a1c33, var(--color-indigo))",
              }}
            >
              <Hero3D />
            </div>
            <p className="mt-3 text-center text-xs opacity-40">Drag to spin the mark</p>
          </FadeIn>
        )}

        {!data.showLogo3D && data.mockupImage && (
          <FadeIn delay={0.15} className="relative">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.mockupImage} alt="" className="min-w-0 flex-1 object-contain" />
              {data.sideList && data.sideList.length > 0 && (
                <div className="hidden shrink-0 flex-col gap-5 sm:flex sm:w-36 lg:w-40">
                  {data.sideList.map((item, i) => {
                    const Icon = item.icon ? ICONS[item.icon] : null;
                    return (
                      <div key={i} className="flex items-start gap-2.5">
                        {Icon && (
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                            style={{ background: "color-mix(in srgb, var(--color-ember) 10%, transparent)" }}
                          >
                            <Icon size={15} style={{ color: "var(--color-ember)" }} />
                          </span>
                        )}
                        <div>
                          <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                            {item.title}
                          </p>
                          {item.subtitle && <p className="text-xs opacity-55">{item.subtitle}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
