import type { Metadata } from "next";
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
      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
        {partners.map((partner) => {
          const logoSrc = partnerLogoSrc(partner);
          const content = (
            <div
              className="flex h-28 flex-col items-center justify-center gap-3 rounded-2xl border p-5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
            >
              {logoSrc ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={logoSrc} alt={partner.name} className="max-h-10 w-auto max-w-[140px] object-contain" />
              ) : (
                <span className="font-display text-base font-bold" style={{ color: "var(--ink)" }}>
                  {partner.name}
                </span>
              )}
            </div>
          );
          return partner.website ? (
            <a key={partner.id} href={partner.website} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <div key={partner.id}>{content}</div>
          );
        })}
      </div>
    </SectionShell>
  );
}
