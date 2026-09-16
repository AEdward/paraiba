import { Mail, MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ContactForm } from "@/components/ContactForm";
import { SectionShell, Eyebrow } from "./SectionShell";
import type { ContactPanelData } from "@/lib/blocks/types";

export function ContactPanelBlock({
  data,
  initialMessage = "",
}: {
  data: ContactPanelData;
  initialMessage?: string;
}) {
  return (
    <SectionShell theme={data.theme} withMesh>
      <FadeIn>
        <Eyebrow color={data.theme === "dark" ? "var(--color-amber)" : "var(--color-teal)"}>
          {data.eyebrow}
        </Eyebrow>
        <h1 className="font-display mt-4 text-4xl font-bold" style={{ color: "var(--ink)" }}>
          {data.heading}
        </h1>
        {data.body && <p className="mt-4 max-w-lg opacity-70">{data.body}</p>}
      </FadeIn>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5" style={{ color: "var(--color-ember)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                  Email
                </p>
                <a href={`mailto:${data.email}`} className="text-sm opacity-70 hover:opacity-100">
                  {data.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5" style={{ color: "var(--color-ember)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                  Based in
                </p>
                <p className="text-sm opacity-70">{data.location}</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactForm initialMessage={initialMessage} />
        </FadeIn>
      </div>
    </SectionShell>
  );
}
