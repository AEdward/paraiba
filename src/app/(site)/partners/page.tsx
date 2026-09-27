import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SectionShell, Eyebrow } from "@/components/blocks/SectionShell";
import { getPartners, partnerLogoSrc } from "@/lib/partners";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Partners" };
export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await getPartners();

  if (partners.length === 0) {
    return (
      <ComingSoon
        eyebrow="Partners"
        heading="Our partners page is coming soon."
        body="We're building relationships with technology and business partners across Ethiopia — check back soon to see who we're working with."
      />
    );
  }

  return (
    <SectionShell theme="light" center>
      <Eyebrow>Partners</Eyebrow>
      <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
        Growing together with amazing partners.
      </h1>
      <p className="mx-auto mt-4 max-w-xl opacity-65">
        The technology, business, and integration partners we work with to build and deliver
        for our clients.
      </p>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => {
          const logoSrc = partnerLogoSrc(partner);
          return (
            <div
              key={partner.id}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{ borderColor: "var(--border-soft)" }}
            >
              {logoSrc && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={logoSrc} alt={partner.name} className="h-10 w-auto max-w-[160px] grayscale object-contain" />
              )}
              <p className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
                {partner.name}
              </p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display inline-flex items-center gap-1.5 text-sm font-bold"
                  style={{ color: "var(--color-ember)" }}
                >
                  Visit website <ArrowRight size={14} />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
