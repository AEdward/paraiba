import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { Eyebrow } from "./SectionShell";
import type { QuoteData } from "@/lib/blocks/types";

export function QuoteBlock({ data }: { data: QuoteData }) {
  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden border-t`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <GradientMesh />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <FadeIn>
          <Eyebrow color={data.theme === "dark" ? "var(--color-amber)" : "var(--color-ember)"}>
            {data.eyebrow}
          </Eyebrow>
          {data.intro && <p className="mt-4 text-lg opacity-70">{data.intro}</p>}
          <p className="font-display mt-6 text-2xl leading-snug font-bold sm:text-3xl">
            {data.lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < data.lines.length - 1 && <br />}
              </span>
            ))}
          </p>
          {data.highlight && (
            <p className="paraiba-text-gradient font-display mt-8 text-2xl font-bold sm:text-3xl">
              {data.highlight}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
