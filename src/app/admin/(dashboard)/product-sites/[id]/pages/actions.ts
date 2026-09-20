"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { defaultBlockData } from "@/lib/blocks/defaults";
import { str, readBlockFormData } from "@/lib/blocks/formData";
import {
  MICROSITE_BLOCK_TYPES,
  PRODUCT_PAGE_SLUGS,
  PRODUCT_PAGE_TITLES,
  type BlockType,
  type ProductPageSlug,
} from "@/lib/blocks/types";
import type { Prisma } from "@/generated/prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

async function revalidateProductSitePage(productSiteId: string, slug: ProductPageSlug) {
  revalidatePath(`/admin/product-sites/${productSiteId}/pages/${slug}`);
  const site = await db.productSite.findUnique({ where: { id: productSiteId }, select: { subdomain: true } });
  if (site?.subdomain) {
    revalidatePath(`/sites/${site.subdomain}${slug === "home" ? "" : `/${slug}`}`);
  }
}

export async function addProductBlock(productSiteId: string, pageSlug: ProductPageSlug, type: BlockType) {
  await requireSession();
  if (!PRODUCT_PAGE_SLUGS.includes(pageSlug) || !(MICROSITE_BLOCK_TYPES as readonly BlockType[]).includes(type)) {
    throw new Error("Invalid page or block type.");
  }
  const page = await db.productPage.upsert({
    where: { productSiteId_slug: { productSiteId, slug: pageSlug } },
    update: {},
    create: { productSiteId, slug: pageSlug, title: PRODUCT_PAGE_TITLES[pageSlug] },
  });
  const last = await db.productBlock.findFirst({
    where: { productPageId: page.id },
    orderBy: { order: "desc" },
  });
  await db.productBlock.create({
    data: {
      productPageId: page.id,
      type,
      order: (last?.order ?? -1) + 1,
      data: defaultBlockData(type) as Prisma.InputJsonValue,
    },
  });
  await revalidateProductSitePage(productSiteId, pageSlug);
}

export async function deleteProductBlock(productSiteId: string, pageSlug: ProductPageSlug, formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (!id) throw new Error("Missing block id.");
  await db.productBlock.delete({ where: { id } });
  await revalidateProductSitePage(productSiteId, pageSlug);
}

export async function reorderProductBlocks(
  productSiteId: string,
  pageSlug: ProductPageSlug,
  orderedIds: string[],
) {
  await requireSession();
  await db.$transaction(
    orderedIds.map((id, i) => db.productBlock.update({ where: { id }, data: { order: i } })),
  );
  await revalidateProductSitePage(productSiteId, pageSlug);
}

// productSiteId/pageSlug come first — a plain closure over a server action
// can't cross the server→client boundary, only a direct .bind() result can.
// The caller binds these two here, server-side, and PageBuilder does the
// final .bind(null, blockId) itself, client-side, per block card.
export async function updateProductBlockData(
  productSiteId: string,
  pageSlug: ProductPageSlug,
  blockId: string,
  formData: FormData,
) {
  await requireSession();
  const block = await db.productBlock.findUnique({ where: { id: blockId } });
  if (!block) throw new Error("Block not found.");
  const data = readBlockFormData(block.type as BlockType, formData);
  await db.productBlock.update({ where: { id: blockId }, data: { data: data as Prisma.InputJsonValue } });
  await revalidateProductSitePage(productSiteId, pageSlug);
}
