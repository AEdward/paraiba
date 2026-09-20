import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import {
  MICROSITE_BLOCK_TYPES,
  PRODUCT_PAGE_SLUGS,
  PRODUCT_PAGE_TITLES,
  type BlockRecord,
  type BlockType,
  type ProductPageSlug,
} from "@/lib/blocks/types";
import { PageBuilder, type PageBuilderActions } from "../../../../pages/PageBuilder";
import {
  addProductBlock,
  deleteProductBlock,
  reorderProductBlocks,
  updateProductBlockData,
} from "../actions";

export const dynamic = "force-dynamic";

function isProductPageSlug(slug: string): slug is ProductPageSlug {
  return (PRODUCT_PAGE_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: isProductPageSlug(slug) ? PRODUCT_PAGE_TITLES[slug] : "Page" };
}

export default async function ProductSitePageBuilderPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;
  if (!isProductPageSlug(slug)) notFound();

  const site = await db.productSite.findUnique({ where: { id } });
  if (!site) notFound();

  let page = await db.productPage.findUnique({
    where: { productSiteId_slug: { productSiteId: id, slug } },
    include: { blocks: { orderBy: { order: "asc" } } },
  });
  if (!page) {
    page = await db.productPage.create({
      data: { productSiteId: id, slug, title: PRODUCT_PAGE_TITLES[slug] },
      include: { blocks: { orderBy: { order: "asc" } } },
    });
  }

  const blocks: BlockRecord[] = page.blocks.map((block) => ({
    id: block.id,
    type: block.type as BlockType,
    order: block.order,
    data: block.data as BlockRecord["data"],
  }));

  const actions: PageBuilderActions = {
    addBlock: addProductBlock.bind(null, id, slug),
    deleteBlockAction: deleteProductBlock.bind(null, id, slug),
    reorderBlocks: reorderProductBlocks.bind(null, id, slug),
    updateBlockAction: updateProductBlockData.bind(null, id, slug),
  };

  const livePath = `/sites/${site.subdomain}${slug === "home" ? "" : `/${slug}`}`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          {site.name} — {PRODUCT_PAGE_TITLES[slug]}
        </h1>
        <Link
          href={livePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--color-teal)" }}
        >
          View live page <ExternalLink size={13} />
        </Link>
      </div>
      <p className="mt-1 text-sm opacity-60">
        Drag to reorder, click a block to edit it, or add a new one below.
      </p>

      <div className="mt-8">
        <PageBuilder blocks={blocks} actions={actions} availableTypes={MICROSITE_BLOCK_TYPES} />
      </div>
    </div>
  );
}
