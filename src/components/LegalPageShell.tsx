import { FadeIn } from "@/components/FadeIn";
import { SectionShell, Eyebrow } from "@/components/blocks/SectionShell";
import { renderRichDoc } from "@/lib/blocks/renderRichDoc";
import { LEGAL_LAST_UPDATED } from "@/lib/legalContent";
import type { RichDoc } from "@/lib/blocks/types";

export function LegalPageShell({ heading, body }: { heading: string; body: RichDoc }) {
  return (
    <SectionShell theme="light">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Eyebrow color="var(--color-ember)">Legal</Eyebrow>
          <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
            {heading}
          </h1>
          <p className="mt-3 text-sm opacity-50">Last updated {LEGAL_LAST_UPDATED}</p>
          <div>{renderRichDoc(body)}</div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
