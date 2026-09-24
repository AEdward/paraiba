import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "./SectionShell";
import { ICONS, type CardGridData } from "@/lib/blocks/types";

function CompactCard({ item, delay }: { item: CardGridData["items"][number]; delay: number }) {
  const Icon = item.icon ? ICONS[item.icon] : undefined;
  return (
    <FadeIn delay={delay}>
      <div
        className="h-full rounded-xl border p-4 transition-transform hover:-translate-y-0.5"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        {Icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "rgba(8,124,255,0.1)" }}
          >
            <Icon size={16} style={{ color: "var(--color-ember)" }} />
          </span>
        )}
        <h3 className="font-display mt-2.5 text-sm font-bold" style={{ color: "var(--ink)" }}>
          {item.title}
        </h3>
        {item.description && <p className="mt-1 text-xs opacity-60">{item.description}</p>}
      </div>
    </FadeIn>
  );
}

export function CardGridBlock({ data }: { data: CardGridData }) {
  const eyebrowAndHeading = (
    <FadeIn>
      <Eyebrow color="var(--color-ember)">
        {data.eyebrow}
      </Eyebrow>
      {data.heading && (
        <h2 className="font-display mt-4 max-w-lg text-3xl leading-tight font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
          {data.heading}
        </h2>
      )}
      {data.body && <p className="mt-4 max-w-lg opacity-65">{data.body}</p>}
    </FadeIn>
  );

  const viewAllLink = data.viewAllLabel && data.viewAllHref && (
    <Link
      href={data.viewAllHref}
      className="font-display inline-flex items-center gap-1 text-sm font-semibold"
      style={{ color: "var(--color-ember)" }}
    >
      {data.viewAllLabel} <ArrowRight size={14} />
    </Link>
  );

  if (data.layout === "split") {
    return (
      <SectionShell theme={data.theme} id={data.anchorId} compact>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-12">
          <div>
            {eyebrowAndHeading}
            {viewAllLink && (
              <FadeIn delay={0.1} className="mt-6">
                {viewAllLink}
              </FadeIn>
            )}
          </div>
          <div className={`grid gap-3 sm:grid-cols-2 ${data.columns === 3 ? "lg:grid-cols-3" : ""}`}>
            {data.items.map((item, i) => (
              <CompactCard key={i} item={item} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell theme={data.theme} id={data.anchorId}>
      <div className="flex items-end justify-between gap-4">
        {eyebrowAndHeading}
        {viewAllLink && (
          <FadeIn delay={0.1} className="hidden sm:block">
            {viewAllLink}
          </FadeIn>
        )}
      </div>
      <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${data.columns === 3 ? "lg:grid-cols-3" : ""}`}>
        {data.items.map((item, i) => {
          const Icon = item.icon ? ICONS[item.icon] : undefined;
          return (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="h-full rounded-2xl border p-7 transition-transform hover:-translate-y-1"
                style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
              >
                {item.number && (
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold"
                    style={{
                      color: "var(--color-ember)",
                      background: "rgba(8,124,255,0.08)",
                      border: "1px solid rgba(8,124,255,0.2)",
                    }}
                  >
                    {item.number}
                  </span>
                )}
                {Icon && !item.number && (
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(150deg, color-mix(in srgb, var(--color-ember) 35%, transparent) 0%, color-mix(in srgb, var(--color-ember) 12%, transparent) 100%)",
                    }}
                  >
                    <Icon size={24} style={{ color: "var(--color-ember)" }} />
                  </span>
                )}
                {item.label && (
                  <small
                    className="mt-3 block text-xs font-bold tracking-[0.14em] uppercase"
                    style={{ color: "var(--color-ember)" }}
                  >
                    {item.label}
                  </small>
                )}
                <h3 className="font-display mt-3 text-lg font-bold" style={{ color: "var(--ink)" }}>
                  {item.title}
                </h3>
                {item.description && <p className="mt-2 text-sm opacity-65">{item.description}</p>}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </SectionShell>
  );
}
