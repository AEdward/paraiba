import { FadeIn } from "@/components/FadeIn";
import { SectionShell } from "./SectionShell";
import { renderSectionElement } from "./SectionElements";
import type { SectionData } from "@/lib/blocks/types";

export function SectionBlock({ data }: { data: SectionData }) {
  if (data.elements.length === 0) return null;
  return (
    <SectionShell theme={data.theme}>
      <div className="flex flex-col gap-8">
        {data.elements.map((element, i) => (
          <FadeIn key={element.id} delay={Math.min(i * 0.06, 0.3)}>
            {renderSectionElement(element)}
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
