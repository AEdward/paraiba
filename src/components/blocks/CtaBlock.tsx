import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Eyebrow } from "./SectionShell";
import type { CtaData } from "@/lib/blocks/types";

export function CtaBlock({ data }: { data: CtaData }) {
  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} border-t px-6 py-24`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <FadeIn>
        <div
          className="mx-auto max-w-3xl rounded-3xl border p-16 text-center"
          style={
            data.theme === "dark"
              ? {
                  borderColor: "var(--border-soft)",
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(8,220,232,0.15), transparent 50%), linear-gradient(145deg, #0a2038, var(--color-indigo))",
                }
              : { borderColor: "var(--border-soft)", background: "var(--surface)" }
          }
        >
          <Eyebrow color={data.theme === "dark" ? "var(--color-amber)" : "var(--color-ember)"}>
            {data.eyebrow}
          </Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl" style={data.theme === "light" ? { color: "var(--ink)" } : undefined}>
            {data.heading}
          </h2>
          {data.body && (
            <p className="mx-auto mt-4 max-w-md opacity-65">{data.body}</p>
          )}
          <Link
            href={data.buttonHref}
            className="font-display mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-[#03111f] transition-transform hover:-translate-y-0.5"
            style={{ background: "linear-gradient(110deg, var(--color-amber), var(--color-ember))" }}
          >
            {data.buttonLabel} <ArrowRight size={16} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
