import { values } from "@/lib/values";
import { FadeIn } from "@/components/FadeIn";
import { TiltCard } from "@/components/TiltCard";

const accents = ["var(--color-teal)", "var(--color-amber)", "var(--color-ember)"];

export function ValuesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {values.map((value, i) => {
        const Icon = value.icon;
        const accent = accents[i % accents.length];
        return (
          <FadeIn key={value.title} delay={i * 0.06}>
            <TiltCard glowColor={accent} className="rounded-2xl">
              <div
                className="flex h-full flex-col gap-4 rounded-2xl border p-6 shadow-[0_1px_2px_rgba(22,35,63,0.04),0_16px_28px_-12px_rgba(22,35,63,0.18)] backdrop-blur-md"
                style={{
                  borderColor: "var(--border-soft)",
                  background: "color-mix(in srgb, var(--surface) 78%, transparent)",
                }}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-inner"
                  style={{
                    background: `linear-gradient(150deg, color-mix(in srgb, ${accent} 35%, transparent) 0%, color-mix(in srgb, ${accent} 12%, transparent) 100%)`,
                  }}
                >
                  <Icon size={24} style={{ color: accent }} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm opacity-70">{value.description}</p>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        );
      })}
    </div>
  );
}
