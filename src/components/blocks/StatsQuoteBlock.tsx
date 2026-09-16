import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "./SectionShell";
import type { StatsQuoteData } from "@/lib/blocks/types";

export function StatsQuoteBlock({ data }: { data: StatsQuoteData }) {
  return (
    <SectionShell theme={data.theme}>
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <div>
            <Eyebrow color={data.theme === "dark" ? "var(--color-amber)" : "var(--color-ember)"}>
              {data.eyebrow}
            </Eyebrow>
            <h2
              className="font-display mt-4 text-3xl leading-tight font-bold sm:text-4xl"
              style={{ color: "var(--ink)", whiteSpace: "pre-line" }}
            >
              {data.heading}
            </h2>
            {data.body && <p className="mt-4 max-w-md opacity-65">{data.body}</p>}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {data.stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
                >
                  <b className="block text-2xl font-bold" style={{ color: "var(--color-ember)" }}>
                    {s.number}
                  </b>
                  <span className="text-xs opacity-60">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div
            className="rounded-3xl border p-10"
            style={{
              borderColor: "rgba(8,124,255,0.2)",
              background:
                "radial-gradient(circle at 80% 20%, rgba(8,124,255,0.09), transparent 48%), var(--surface)",
            }}
          >
            <p className="text-2xl leading-snug font-medium tracking-tight" style={{ color: "var(--ink)" }}>
              &ldquo;{data.quote}&rdquo;
            </p>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
