import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ContactForm } from "@/components/ContactForm";
import { GradientMesh } from "@/components/GradientMesh";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Paraiba Technology PLC.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialMessage = role ? `I'm interested in the ${role} position.\n\n` : "";

  return (
    <div className="paraiba-light-section relative overflow-hidden">
      <GradientMesh />
      <div className="relative mx-auto max-w-5xl px-6 py-20">
        <FadeIn>
          <p
            className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--color-teal)" }}
          >
            Get in touch
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold" style={{ color: "var(--ink)" }}>
            Let&apos;s build something new.
          </h1>
          <p className="mt-4 max-w-lg opacity-70">
            Have a project, partnership, or investment idea in mind? We&apos;d love to hear
            about it.
          </p>
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
                  <a href="mailto:hello@paraiba.com" className="text-sm opacity-70 hover:opacity-100">
                    hello@paraiba.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5" style={{ color: "var(--color-ember)" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    Based in
                  </p>
                  <p className="text-sm opacity-70">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactForm initialMessage={initialMessage} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
