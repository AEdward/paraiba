import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "./SectionShell";
import { renderRichDoc } from "@/lib/blocks/renderRichDoc";
import type { RichTextData } from "@/lib/blocks/types";

export function RichTextBlock({ data }: { data: RichTextData }) {
  return (
    <SectionShell theme={data.theme}>
      <div
        className="mx-auto max-w-3xl"
        style={
          data.tint
            ? { background: "linear-gradient(rgba(8,124,255,0.05), transparent)" }
            : undefined
        }
      >
        <FadeIn>
          <Eyebrow color={data.theme === "dark" ? "var(--color-amber)" : "var(--color-ember)"}>
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
        </FadeIn>
      </div>
    </SectionShell>
  );
}
