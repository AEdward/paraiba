import "server-only";
import { db } from "@/lib/db";
import type { BlockRecord, BlockType, PageSlug } from "./types";

export async function getPageBlocks(slug: PageSlug): Promise<BlockRecord[]> {
  const page = await db.page.findUnique({
    where: { slug },
    include: { blocks: { orderBy: { order: "asc" } } },
  });
  if (!page) return [];

  return page.blocks.map((block) => ({
    id: block.id,
    pageId: block.pageId,
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
