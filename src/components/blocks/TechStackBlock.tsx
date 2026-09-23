import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "./SectionShell";
import { TECH_ICONS } from "@/lib/techIcons";
import type { TechStackData } from "@/lib/blocks/types";

export function TechStackBlock({ data }: { data: TechStackData }) {
  return (
    <SectionShell theme={data.theme}>
      <FadeIn>
        <Eyebrow color="var(--color-ember)">{data.eyebrow}</Eyebrow>
        {data.heading && (
          <h2 className="font-display mt-4 max-w-lg text-3xl leading-tight font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
            {data.heading}
          </h2>
        )}
        {data.body && <p className="mt-4 max-w-lg opacity-65">{data.body}</p>}
      </FadeIn>
      <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {data.items.map((item, i) => {
          const Icon = TECH_ICONS[item.icon];
          return (
            <FadeIn key={i} delay={Math.min(i * 0.03, 0.4)}>
              <div
                className="flex flex-col items-center gap-2.5 rounded-2xl border p-4 text-center transition-transform hover:-translate-y-1"
                style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
              >
                <Icon size={30} style={{ color: "var(--ink)" }} />
                <p className="text-xs font-semibold opacity-75" style={{ color: "var(--ink)" }}>
                  {item.label}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SectionShell>
  );
}
