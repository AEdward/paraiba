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
      <div className="mx-auto max-w-6xl px-6 py-14">
        <FadeIn>
          {data.eyebrow && (
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-6" style={{ background: "var(--color-ember)" }} />
              <p className="font-display text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "var(--color-ember)" }}>
                {data.eyebrow}
              </p>
            </div>
          )}
          {data.heading && (
            <h2
              className="font-display mt-4 max-w-2xl text-2xl leading-tight font-bold sm:text-3xl"
              style={{ color: "var(--ink)" }}
            >
              {data.heading}
            </h2>
          )}
          <div className="mt-8">
            <PartnersMarquee partners={display} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
