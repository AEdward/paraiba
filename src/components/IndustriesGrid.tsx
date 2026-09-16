import { industries } from "@/lib/industries";
import { FadeIn } from "@/components/FadeIn";

const accents = ["var(--color-teal)", "var(--color-amber)", "var(--color-ember)"];

export function IndustriesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry, i) => {
        const Icon = industry.icon;
        const accent = accents[i % accents.length];
        return (
          <FadeIn key={industry.label} delay={i * 0.05}>
            <div
              className="flex items-center gap-4 rounded-2xl border p-5 backdrop-blur-md"
              style={{
                borderColor: "var(--border-soft)",
                background: "color-mix(in srgb, var(--surface) 78%, transparent)",
              }}
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)` }}
              >
                <Icon size={20} style={{ color: accent }} />
              </span>
              <span className="font-display text-sm font-semibold" style={{ color: "var(--ink)" }}>
                {industry.label}
              </span>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
