import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import {
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

export default async function ProductPageBuilderPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;
  if (!isProductPageSlug(slug)) notFound();

  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  let page = await db.productPage.findUnique({
    where: { projectId_slug: { projectId: id, slug } },
    include: { blocks: { orderBy: { order: "asc" } } },
  });
  if (!page) {
    page = await db.productPage.create({
      data: { projectId: id, slug, title: PRODUCT_PAGE_TITLES[slug] },
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

  const livePath = project.subdomain
    ? `/sites/${project.subdomain}${slug === "home" ? "" : `/${slug}`}`
    : undefined;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          {project.name} — {PRODUCT_PAGE_TITLES[slug]}
        </h1>
        {livePath && (
          <Link
            href={livePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--color-teal)" }}
          >
            View live page <ExternalLink size={13} />
          </Link>
        )}
      </div>
      <p className="mt-1 text-sm opacity-60">
        Drag to reorder, click a block to edit it, or add a new one below.
      </p>

      <div className="mt-8">
        <PageBuilder blocks={blocks} actions={actions} />
      </div>
    </div>
  );
}
