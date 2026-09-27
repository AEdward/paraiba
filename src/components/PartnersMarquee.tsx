"use client";

export type PartnerDisplay = {
  id: string;
  name: string;
  website: string | null;
  logoSrc: string | null;
};

export function PartnersMarquee({ partners }: { partners: PartnerDisplay[] }) {
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
      <div className="partners-marquee-track flex w-max items-center gap-12">
        {loop.map((partner, i) => (
          <PartnerLogo key={`${partner.id}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

function PartnerLogo({ partner }: { partner: PartnerDisplay }) {
  const content = partner.logoSrc ? (
    <span className="flex h-12 w-32 shrink-0 items-center justify-center opacity-80 transition-opacity hover:opacity-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={partner.logoSrc}
        alt={partner.name}
        className="max-h-12 max-w-full object-contain"
        loading="lazy"
      />
    </span>
  ) : (
    <span className="font-display shrink-0 text-sm font-bold tracking-[0.08em] whitespace-nowrap opacity-70 transition-opacity hover:opacity-100">
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
