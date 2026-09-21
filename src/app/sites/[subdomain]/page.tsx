import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getProductSiteBySubdomain } from "@/lib/productSites-data";
import { getProductPageBlocks } from "@/lib/blocks/data";
import { getProductShell } from "@/components/product-shells/registry";

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

  const shell = getProductShell(subdomain);
  const blocks = await getProductPageBlocks(site.id, "home");
  // A bespoke shell already renders its own hero — skip a redundant "hero"
  // block if one was also added from the page builder.
  const visibleBlocks = shell ? blocks.filter((block) => block.type !== "hero") : blocks;

  return (
    <>
      {shell && <shell.Hero name={site.name} />}
      {visibleBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
