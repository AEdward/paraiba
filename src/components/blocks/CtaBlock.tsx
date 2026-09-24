import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import type { CtaData } from "@/lib/blocks/types";

export function CtaBlock({ data }: { data: CtaData }) {
  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} border-t px-6 py-12 sm:py-14`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <FadeIn>
        <div
          className="mx-auto flex max-w-6xl flex-col gap-6 rounded-2xl px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-9"
          style={
            data.theme === "dark"
              ? {
                  background:
                    "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.14), transparent 55%), linear-gradient(115deg, var(--color-ember), #0a2ea8)",
                }
              : { border: "1px solid var(--border-soft)", background: "var(--surface)" }
          }
        >
          <div>
            <h2
              className="font-display text-2xl leading-snug font-bold sm:text-3xl"
              style={{ color: data.theme === "dark" ? "#ffffff" : "var(--ink)" }}
            >
              {data.heading}
            </h2>
            {data.body && (
              <p
                className="mt-2 max-w-lg text-sm"
                style={data.theme === "dark" ? { color: "rgba(255,255,255,0.82)" } : { opacity: 0.65 }}
              >
                {data.body}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={data.buttonHref}
              className="font-display inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={
                data.theme === "dark"
                  ? { background: "#ffffff", color: "var(--color-indigo)" }
                  : { background: "var(--color-ember)", color: "#ffffff" }
              }
            >
              {data.buttonLabel} <ArrowRight size={16} />
            </Link>
            {data.secondaryLabel && data.secondaryHref && (
              <Link
                href={data.secondaryHref}
                className="font-display inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
                style={
                  data.theme === "dark"
                    ? { borderColor: "rgba(255,255,255,0.45)", color: "#ffffff" }
                    : { borderColor: "var(--border-soft)", color: "var(--ink)" }
                }
              >
                {data.secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
