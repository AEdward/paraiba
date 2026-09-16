import { getRichSections } from "@/lib/richDoc";
import { FadeIn } from "@/components/FadeIn";

export function CaseStudySections({ text }: { text?: string | null }) {
  const sections = getRichSections(text);
  if (sections.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, i) => (
        <FadeIn key={i} delay={i * 0.05}>
          <div className="flex gap-5">
            <span
              className="font-display shrink-0 text-sm font-bold opacity-40"
              style={{ color: "var(--ink)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              {section.heading && (
                <h3 className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
                  {section.heading}
                </h3>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-2 text-sm leading-relaxed opacity-75">
                  {p}
                </p>
              ))}
              {section.items.length > 0 && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm opacity-75">
                      <span
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "var(--color-ember)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
