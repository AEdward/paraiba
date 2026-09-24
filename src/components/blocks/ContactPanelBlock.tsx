import { Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ContactForm } from "@/components/ContactForm";
import { SectionShell, Eyebrow } from "./SectionShell";
import type { ContactPanelData } from "@/lib/blocks/types";
import { getSiteSettings } from "@/lib/site-settings";
import { getSocialLinks } from "@/lib/social";

export async function ContactPanelBlock({
  data,
  initialMessage = "",
}: {
  data: ContactPanelData;
  initialMessage?: string;
}) {
  const settings = await getSiteSettings();
  const socialLinks = getSocialLinks(settings);

  return (
    <SectionShell theme={data.theme} withMesh id="contact">
      <FadeIn>
        <Eyebrow color="var(--color-ember)">
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
                <a href={`mailto:${settings.email}`} className="text-sm opacity-70 hover:opacity-100">
                  {settings.email}
                </a>
              </div>
            </div>
            {settings.phone && (
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5" style={{ color: "var(--color-ember)" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                    Phone
                  </p>
                  <a href={`tel:${settings.phone}`} className="text-sm opacity-70 hover:opacity-100">
                    {settings.phone}
                  </a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5" style={{ color: "var(--color-ember)" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                  Based in
                </p>
                <p className="text-sm opacity-70">{settings.officeLocation}</p>
              </div>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border opacity-70 transition-opacity hover:opacity-100"
                      style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            )}

            {settings.mapEmbedUrl && (
              <div className="mt-2 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
                <iframe
                  src={settings.mapEmbedUrl}
                  title="Office location map"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactForm initialMessage={initialMessage} />
        </FadeIn>
      </div>
    </SectionShell>
  );
}
