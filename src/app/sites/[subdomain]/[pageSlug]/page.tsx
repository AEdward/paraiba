import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getProductSiteBySubdomain } from "@/lib/productSites-data";
import { getProductPageBlocks } from "@/lib/blocks/data";
import { PRODUCT_PAGE_SLUGS, PRODUCT_PAGE_TITLES, type ProductPageSlug } from "@/lib/blocks/types";

export const dynamic = "force-dynamic";

function isProductPageSlug(slug: string): slug is ProductPageSlug {
  return (PRODUCT_PAGE_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string; pageSlug: string }>;
}): Promise<Metadata> {
  const { subdomain, pageSlug } = await params;
  if (!isProductPageSlug(pageSlug)) return {};
  const site = await getProductSiteBySubdomain(subdomain);
  if (!site) return {};
  return { title: { absolute: `${PRODUCT_PAGE_TITLES[pageSlug]} — ${site.name}` } };
}

export default async function ProductSiteSubPage({
  params,
}: {
  params: Promise<{ subdomain: string; pageSlug: string }>;
}) {
  const { subdomain, pageSlug } = await params;
  if (!isProductPageSlug(pageSlug)) notFound();
  // "home" is served by /sites/[subdomain]/page.tsx — /home would be a
  // confusing duplicate URL for the same content.
  if (pageSlug === "home") notFound();

  const site = await getProductSiteBySubdomain(subdomain);
  if (!site) notFound();

  const blocks = await getProductPageBlocks(site.id, pageSlug);

  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
