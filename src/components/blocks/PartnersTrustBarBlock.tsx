import { FadeIn } from "@/components/FadeIn";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { getPartners, partnerLogoSrc } from "@/lib/partners";
import type { PartnersTrustBarData } from "@/lib/blocks/types";

export async function PartnersTrustBarBlock({ data }: { data: PartnersTrustBarData }) {
  const partners = await getPartners();
  if (partners.length === 0) return null;

  const display = partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    website: partner.website,
    logoSrc: partnerLogoSrc(partner),
  }));

  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} border-t`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <FadeIn>
          {data.eyebrow && (
            <p className="font-display text-center text-xs font-semibold tracking-[0.3em] uppercase opacity-45">
              {data.eyebrow}
            </p>
          )}
          <div className="mt-6">
            <PartnersMarquee partners={display} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
