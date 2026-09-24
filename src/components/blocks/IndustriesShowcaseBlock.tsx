import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "./SectionShell";
import { ICONS, type IndustriesShowcaseData } from "@/lib/blocks/types";

// A compact 3-column band (text + CTA | icon grid | photo card) — used in
// place of the tall one-card-per-industry cardGrid layout, which read as
// too long for a short "industries we serve" summary.
export function IndustriesShowcaseBlock({ data }: { data: IndustriesShowcaseData }) {
  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden border-t`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.1fr] lg:gap-8">
          <FadeIn>
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-3xl leading-tight font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
              {data.heading}
            </h2>
            {data.body && <p className="mt-4 max-w-sm opacity-65">{data.body}</p>}
            {data.buttonLabel && data.buttonHref && (
              <Link
                href={data.buttonHref}
                className="font-display mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--color-ember)" }}
              >
                {data.buttonLabel} <ArrowRight size={16} />
              </Link>
            )}
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid h-full grid-cols-2 content-center gap-4">
              {data.items.map((item, i) => {
                const Icon = item.icon ? ICONS[item.icon] : undefined;
                return (
                  <div key={i} className="flex items-center gap-2.5">
                    {Icon && (
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "rgba(8,124,255,0.1)" }}
                      >
                        <Icon size={18} style={{ color: "var(--color-ember)" }} />
                      </span>
                    )}
                    <p className="font-display text-sm font-bold leading-tight" style={{ color: "var(--ink)" }}>
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {data.photoUrl && (
            <FadeIn delay={0.2}>
              <div className="relative h-56 overflow-hidden rounded-2xl lg:h-full lg:min-h-[14rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.photoUrl} alt="" className="h-full w-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(0deg, rgba(6,12,24,0.85) 0%, rgba(6,12,24,0.05) 55%)" }}
                />
                {data.photoHeading && (
                  <p className="font-display absolute right-4 bottom-4 left-4 text-lg leading-snug font-bold text-white">
                    {data.photoHeading}
                  </p>
                )}
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
