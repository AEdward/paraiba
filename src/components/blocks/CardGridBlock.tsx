import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "./SectionShell";
import { ICONS, type CardGridData } from "@/lib/blocks/types";

function CompactCard({
  item,
  delay,
  cardStyle,
}: {
  item: CardGridData["items"][number];
  delay: number;
  cardStyle: "bordered" | "tinted" | "plain";
}) {
  const Icon = item.icon ? ICONS[item.icon] : undefined;

  if (cardStyle === "plain") {
    return (
      <FadeIn delay={delay}>
        <div className="flex items-start gap-3">
          {Icon && (
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-ember) 10%, transparent)" }}
            >
              <Icon size={16} style={{ color: "var(--color-ember)" }} />
            </span>
          )}
          <div>
            <p className="text-sm font-bold leading-snug" style={{ color: "var(--ink)" }}>
              {item.title}
            </p>
            {item.description && <p className="mt-0.5 text-xs opacity-60">{item.description}</p>}
          </div>
        </div>
      </FadeIn>
    );
  }

  if (cardStyle === "tinted") {
    return (
      <FadeIn delay={delay}>
        <div
          className="h-full rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
          style={{ background: "color-mix(in srgb, var(--color-ember) 6%, var(--surface))" }}
        >
          {Icon && <Icon size={22} style={{ color: "var(--color-ember)" }} />}
          <h3 className="font-display mt-3 text-sm font-bold" style={{ color: "var(--ink)" }}>
            {item.title}
          </h3>
          {item.description && <p className="mt-1 text-xs opacity-60">{item.description}</p>}
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={delay}>
      <div
        className="h-full rounded-xl border p-4 transition-transform hover:-translate-y-0.5"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        {Icon && (
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "color-mix(in srgb, var(--color-ember) 10%, transparent)" }}
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
          {data.headingHighlight ? data.heading.trimEnd() : data.heading}
          {data.headingHighlight && (
            <>
              {" "}
              <span style={{ color: "var(--color-ember)" }}>{data.headingHighlight}</span>
            </>
          )}
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

  if (data.layout === "split" && data.imageUrl) {
    const imageFirst = (data.imagePosition ?? "left") === "left";
    const contain = data.imageFit === "contain";
    const CaptionIcon = data.imageCaption?.icon ? ICONS[data.imageCaption.icon] : undefined;
    return (
      <SectionShell theme={data.theme} id={data.anchorId} compact>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn className={`relative ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.imageUrl}
              alt=""
              className={contain ? "w-full rounded-2xl object-contain" : "aspect-[4/3] w-full rounded-2xl object-cover"}
            />
            {data.imageCaption && (
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lg"
                style={{ background: "var(--surface)" }}
              >
                {CaptionIcon && (
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--color-ember)" }}
                  >
                    <CaptionIcon size={16} style={{ color: "#ffffff" }} />
                  </span>
                )}
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                    {data.imageCaption.title}
                  </p>
                  {data.imageCaption.subtitle && (
                    <p className="text-[11px] opacity-60">{data.imageCaption.subtitle}</p>
                  )}
                </div>
              </div>
            )}
          </FadeIn>
          <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
            {eyebrowAndHeading}
            {viewAllLink && (
              <FadeIn delay={0.1} className="mt-6">
                {viewAllLink}
              </FadeIn>
            )}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
              {data.items.map((item, i) => (
                <CompactCard key={i} item={item} delay={0.1 + i * 0.06} cardStyle={data.cardStyle ?? "bordered"} />
              ))}
            </div>
          </div>
        </div>
      </SectionShell>
    );
  }

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
              <CompactCard key={i} item={item} delay={i * 0.06} cardStyle={data.cardStyle ?? "bordered"} />
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
                      background: "color-mix(in srgb, var(--color-ember) 8%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--color-ember) 20%, transparent)",
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
