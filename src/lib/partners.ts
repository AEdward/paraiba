import { db } from "@/lib/db";

export async function getPartners() {
  return db.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

// An uploaded logo is served from our own API route (versioned by updatedAt so
// browsers/CDNs can cache it forever without going stale after a re-upload).
// Falls back to a pasted logoUrl, or null for the text-badge fallback.
export function partnerLogoSrc(partner: {
  id: string;
  logoData: unknown;
  logoUrl: string | null;
  updatedAt: Date;
}): string | null {
  if (partner.logoData) return `/api/partners/${partner.id}/logo?v=${partner.updatedAt.getTime()}`;
  return partner.logoUrl ?? null;
}
