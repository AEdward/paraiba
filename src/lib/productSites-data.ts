import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import type { ProductSite as ProductSiteRow } from "@/generated/prisma/client";
import { productSiteLogoSrc, type ProductSite } from "@/lib/productSites";

function toProductSite(row: ProductSiteRow): ProductSite {
  return {
    id: row.id,
    name: row.name,
    subdomain: row.subdomain,
    // Resolved to whichever source actually renders (uploaded file takes
    // priority over a pasted URL) — see productSiteLogoSrc().
    logoUrl: productSiteLogoSrc(row) ?? undefined,
    themeColor: row.themeColor ?? undefined,
    themeColorSecondary: row.themeColorSecondary ?? undefined,
  };
}

export async function getProductSites() {
  return db.productSite.findMany({ orderBy: { createdAt: "desc" } });
}

// Keyed by subdomain, resolved logo + theme color only — for cards elsewhere
// (the homepage's "Our Products" preview, the /products grid) that want to
// show a catalog Project's real brand mark when one exists, without a
// per-card database round trip.
export async function getProductSitesBySubdomain(): Promise<
  Record<string, { logoUrl?: string; themeColor?: string }>
> {
  const rows = await db.productSite.findMany();
  return Object.fromEntries(
    rows.map((row) => [row.subdomain, { logoUrl: productSiteLogoSrc(row) ?? undefined, themeColor: row.themeColor ?? undefined }]),
  );
}

export async function getProductSiteRow(id: string) {
  return db.productSite.findUnique({ where: { id } });
}

// Cached per-request: the site's layout and its page both need this lookup,
// and without memoizing it'd otherwise hit the database twice.
export const getProductSiteBySubdomain = cache(
  async (subdomain: string): Promise<ProductSite | undefined> => {
    const row = await db.productSite.findUnique({ where: { subdomain } });
    return row ? toProductSite(row) : undefined;
  },
);
