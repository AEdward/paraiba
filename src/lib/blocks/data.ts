import "server-only";
import { db } from "@/lib/db";
import type { BlockRecord, BlockType, PageSlug, ProductPageSlug } from "./types";

export async function getPageBlocks(slug: PageSlug): Promise<BlockRecord[]> {
  const page = await db.page.findUnique({
    where: { slug },
    include: { blocks: { orderBy: { order: "asc" } } },
  });
  if (!page) return [];

  return page.blocks.map((block) => ({
    id: block.id,
    type: block.type as BlockType,
    order: block.order,
    data: block.data as BlockRecord["data"],
  }));
}

export async function getAllPagesWithBlockCounts() {
  return db.page.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { blocks: true } } },
  });
}

export async function getProductPageBlocks(
  productSiteId: string,
  slug: ProductPageSlug,
): Promise<BlockRecord[]> {
  const page = await db.productPage.findUnique({
    where: { productSiteId_slug: { productSiteId, slug } },
    include: { blocks: { orderBy: { order: "asc" } } },
  });
  if (!page) return [];

  return page.blocks.map((block) => ({
    id: block.id,
    type: block.type as BlockType,
    order: block.order,
    data: block.data as BlockRecord["data"],
  }));
}
