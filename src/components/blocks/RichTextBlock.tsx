import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "./SectionShell";
import { renderRichDoc } from "@/lib/blocks/renderRichDoc";
import type { RichTextData } from "@/lib/blocks/types";

export function RichTextBlock({ data }: { data: RichTextData }) {
  const text = (
    <>
      <Eyebrow color="var(--color-ember)">
        {data.eyebrow}
      </Eyebrow>
      {data.heading && (
        <h2
          className="font-display mt-4 text-3xl font-bold"
          style={{ color: "var(--ink)" }}
        >
          {data.heading}
        </h2>
      )}
      <div>{renderRichDoc(data.body)}</div>
    </>
  );

  const tintStyle = data.tint
    ? { background: "linear-gradient(color-mix(in srgb, var(--color-ember) 5%, transparent), transparent)" }
    : undefined;

  if (data.imageUrl && data.imageBleed) {
    const imageOnRight = (data.imagePosition ?? "right") === "right";
    return (
      <SectionShell
        theme={data.theme}
        background={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.imageUrl} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: imageOnRight
                  ? "linear-gradient(to right, var(--color-indigo) 32%, color-mix(in srgb, var(--color-indigo) 45%, transparent) 58%, transparent 88%)"
                  : "linear-gradient(to left, var(--color-indigo) 32%, color-mix(in srgb, var(--color-indigo) 45%, transparent) 58%, transparent 88%)",
              }}
            />
          </>
        }
      >
        <FadeIn className="max-w-lg">{text}</FadeIn>
      </SectionShell>
    );
  }

  if (data.imageUrl) {
    const imageFirst = (data.imagePosition ?? "left") === "left";
    const contain = data.imageFit === "contain";
    return (
      <SectionShell theme={data.theme}>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <FadeIn className={imageFirst ? "lg:order-1" : "lg:order-2"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.imageUrl}
              alt=""
              className={contain ? "w-full rounded-2xl object-contain" : "aspect-[4/3] w-full rounded-2xl object-cover"}
            />
          </FadeIn>
          <FadeIn delay={0.1} className={imageFirst ? "lg:order-2" : "lg:order-1"}>
            <div className="rounded-2xl p-6" style={tintStyle}>
              {text}
            </div>
          </FadeIn>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell theme={data.theme}>
      <div className="mx-auto max-w-3xl" style={tintStyle}>
        <FadeIn>{text}</FadeIn>
      </div>
    </SectionShell>
  );
}
