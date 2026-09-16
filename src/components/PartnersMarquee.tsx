"use client";

import type { Partner } from "@/generated/prisma/client";

export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  const loop = [...partners, ...partners];

  return (
    <div
      className="partners-marquee-fade relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="partners-marquee-track flex w-max items-center gap-14">
        {loop.map((partner, i) => (
          <PartnerLogo key={`${partner.id}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const content = partner.logoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={partner.logoUrl}
      alt={partner.name}
      className="partners-marquee-logo h-8 w-auto shrink-0 object-contain sm:h-9"
      loading="lazy"
    />
  ) : (
    <span className="font-display shrink-0 text-sm font-bold tracking-[0.08em] whitespace-nowrap opacity-55 transition-opacity hover:opacity-100">
      {partner.name}
    </span>
  );

  if (!partner.website) return content;

  return (
    <a
      href={partner.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className="shrink-0"
    >
      {content}
    </a>
  );
}
