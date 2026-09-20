import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getProductSiteBySubdomain } from "@/lib/productSites-data";
import { getProductPageBlocks } from "@/lib/blocks/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const site = await getProductSiteBySubdomain(subdomain);
  // A product's own site is meant to feel independent — an absolute title
  // skips the root layout's "%s — Paraiba Technology PLC" template.
  return site ? { title: { absolute: site.name } } : {};
}

export default async function ProductSiteHomePage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const site = await getProductSiteBySubdomain(subdomain);
  if (!site) notFound();

  const blocks = await getProductPageBlocks(site.id, "home");

  return (
    <>
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
