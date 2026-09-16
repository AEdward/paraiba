import { getRichSections } from "@/lib/richDoc";

export function DeliverablesGrid({ text }: { text?: string | null }) {
  const sections = getRichSections(text);
  if (sections.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((section, i) => (
        <div
          key={i}
          className="rounded-2xl border p-6"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
        >
          <h3 className="font-display text-sm font-bold tracking-wide uppercase" style={{ color: "var(--color-teal)" }}>
            {section.heading || "General"}
          </h3>
          <ul className="mt-3 flex flex-col gap-1.5">
            {section.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm opacity-80">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--color-teal)" }} />
                {item}
              </li>
            ))}
          </ul>
          {section.paragraphs.length > 0 && (
            <p className="mt-2 text-sm opacity-70">{section.paragraphs.join(" ")}</p>
          )}
        </div>
      ))}
    </div>
  );
}
