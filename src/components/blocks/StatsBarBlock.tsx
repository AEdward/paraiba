import { FadeIn } from "@/components/FadeIn";
import { ICONS, type StatsBarData } from "@/lib/blocks/types";

export function StatsBarBlock({ data }: { data: StatsBarData }) {
  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} border-t`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
        {data.items.map((item, i) => {
          const Icon = item.icon ? ICONS[item.icon] : undefined;
          return (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex items-center gap-3">
                {Icon && (
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(8,124,255,0.1)" }}
                  >
                    <Icon size={18} style={{ color: "var(--color-ember)" }} />
                  </span>
                )}
                <div>
                  <p className="font-display text-sm font-bold leading-tight" style={{ color: "var(--ink)" }}>
                    {item.label}
                  </p>
                  {item.sublabel && <p className="mt-0.5 text-xs opacity-55">{item.sublabel}</p>}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
