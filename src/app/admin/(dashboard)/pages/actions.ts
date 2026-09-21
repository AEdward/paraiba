"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { defaultBlockData } from "@/lib/blocks/defaults";
import { str, readBlockFormData } from "@/lib/blocks/formData";
import { BLOCK_TYPES, PAGE_SLUGS, type BlockType, type PageSlug } from "@/lib/blocks/types";
import type { Prisma } from "@/generated/prisma/client";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function publicPath(slug: PageSlug): string {
  return slug === "home" ? "/" : `/${slug}`;
}

function revalidatePage(slug: PageSlug) {
  revalidatePath(`/admin/pages/${slug}`);
  revalidatePath(publicPath(slug));
}

export async function addBlock(pageSlug: PageSlug, type: BlockType) {
  await requireSession();
  if (!PAGE_SLUGS.includes(pageSlug) || !BLOCK_TYPES.includes(type)) {
    throw new Error("Invalid page or block type.");
  }
  const page = await db.page.upsert({
    where: { slug: pageSlug },
    update: {},
    create: { slug: pageSlug, title: pageSlug },
  });
  const last = await db.block.findFirst({ where: { pageId: page.id }, orderBy: { order: "desc" } });
  await db.block.create({
    data: {
      pageId: page.id,
      type,
      order: (last?.order ?? -1) + 1,
      data: defaultBlockData(type) as Prisma.InputJsonValue,
    },
  });
  revalidatePage(pageSlug);
}

export async function deleteBlock(pageSlug: PageSlug, formData: FormData) {
  await requireSession();
  const id = str(formData, "id");
  if (!id) throw new Error("Missing block id.");
  await db.block.delete({ where: { id } });
  revalidatePage(pageSlug);
}

export async function reorderBlocks(pageSlug: PageSlug, orderedIds: string[]) {
  await requireSession();
  await db.$transaction(orderedIds.map((id, i) => db.block.update({ where: { id }, data: { order: i } })));
  revalidatePage(pageSlug);
}

// pageSlug comes first so a Server Component can bind it before handing this
// down to the (client) PageBuilder — a plain closure can't cross the
// server/client boundary, but a further client-side .bind(null, blockId) on
// an already-bound server action reference can.
export async function updateBlockData(pageSlug: PageSlug, blockId: string, formData: FormData) {
  await requireSession();
  const block = await db.block.findUnique({ where: { id: blockId } });
  if (!block) throw new Error("Block not found.");
  const data = await readBlockFormData(block.type as BlockType, formData);
  await db.block.update({ where: { id: blockId }, data: { data: data as Prisma.InputJsonValue } });
  revalidatePage(pageSlug);
}
