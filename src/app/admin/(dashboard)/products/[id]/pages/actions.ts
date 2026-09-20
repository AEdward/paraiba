"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { defaultBlockData } from "@/lib/blocks/defaults";
import { str, readBlockFormData } from "@/lib/blocks/formData";
import { BLOCK_TYPES, PRODUCT_PAGE_SLUGS, PRODUCT_PAGE_TITLES, type BlockType, type ProductPageSlug } from "@/lib/blocks/types";
import type { Prisma } from "@/generated/prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

async function revalidateProductPage(projectId: string, slug: ProductPageSlug) {
  revalidatePath(`/admin/products/${projectId}/pages/${slug}`);
  const project = await db.project.findUnique({ where: { id: projectId }, select: { subdomain: true } });
  if (project?.subdomain) {
    revalidatePath(`/sites/${project.subdomain}${slug === "home" ? "" : `/${slug}`}`);
  }
}

export async function addProductBlock(projectId: string, pageSlug: ProductPageSlug, type: BlockType) {
  await requireSession();
  if (!PRODUCT_PAGE_SLUGS.includes(pageSlug) || !BLOCK_TYPES.includes(type)) {
    throw new Error("Invalid page or block type.");
  }
  const page = await db.productPage.upsert({
    where: { projectId_slug: { projectId, slug: pageSlug } },
    update: {},
    create: { projectId, slug: pageSlug, title: PRODUCT_PAGE_TITLES[pageSlug] },
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
  await revalidateProductPage(projectId, pageSlug);
}

export async function deleteProductBlock(projectId: string, pageSlug: ProductPageSlug, formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (!id) throw new Error("Missing block id.");
  await db.productBlock.delete({ where: { id } });
  await revalidateProductPage(projectId, pageSlug);
}

export async function reorderProductBlocks(
  projectId: string,
  pageSlug: ProductPageSlug,
  orderedIds: string[],
) {
  await requireSession();
  await db.$transaction(
    orderedIds.map((id, i) => db.productBlock.update({ where: { id }, data: { order: i } })),
  );
  await revalidateProductPage(projectId, pageSlug);
}

// projectId/pageSlug come first — see the comment on updateBlockData in
// admin/(dashboard)/pages/actions.ts for why.
export async function updateProductBlockData(
  projectId: string,
  pageSlug: ProductPageSlug,
  blockId: string,
  formData: FormData,
) {
  await requireSession();
  const block = await db.productBlock.findUnique({ where: { id: blockId } });
  if (!block) throw new Error("Block not found.");
  const data = readBlockFormData(block.type as BlockType, formData);
  await db.productBlock.update({ where: { id: blockId }, data: { data: data as Prisma.InputJsonValue } });
  await revalidateProductPage(projectId, pageSlug);
}
