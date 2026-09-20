// Client-safe: type + pure presentation helpers only. No database import —
// mirrors the split between lib/projects.ts and lib/projects-data.ts.

export type ProductSite = {
  id: string;
  name: string;
  subdomain: string;
  logoUrl?: string;
  themeColor?: string;
  themeColorSecondary?: string;
};

// An uploaded logo is served from our own API route (versioned by updatedAt so
// browsers/CDNs can cache it forever without going stale after a re-upload).
// Falls back to a pasted logoUrl, or null for the text fallback. Mirrors
// lib/partners.ts's partnerLogoSrc().
export function productSiteLogoSrc(site: {
  id: string;
  logoData: unknown;
  logoUrl: string | null;
  updatedAt: Date;
}): string | null {
  if (site.logoData) return `/api/product-sites/${site.id}/logo?v=${site.updatedAt.getTime()}`;
  return site.logoUrl ?? null;
}
