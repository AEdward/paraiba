"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { defaultBlockData } from "@/lib/blocks/defaults";
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

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function optStr(formData: FormData, key: string): string | undefined {
  const v = str(formData, key);
  return v || undefined;
}

function readTheme(formData: FormData): "dark" | "light" {
  return formData.get("theme") === "light" ? "light" : "dark";
}

function readJsonArray<T>(formData: FormData, key: string): T[] {
  try {
    const parsed = JSON.parse(String(formData.get(key) ?? "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readBlockFormData(type: BlockType, formData: FormData): unknown {
  const theme = readTheme(formData);
  switch (type) {
    case "hero":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        headline: str(formData, "headline"),
        headlineHighlight: optStr(formData, "headlineHighlight"),
        subhead: optStr(formData, "subhead"),
        primaryLabel: optStr(formData, "primaryLabel"),
        primaryHref: optStr(formData, "primaryHref"),
        secondaryLabel: optStr(formData, "secondaryLabel"),
        secondaryHref: optStr(formData, "secondaryHref"),
        theme,
        align: formData.get("align") === "center" ? "center" : "left",
        showLogo3D: formData.get("showLogo3D") === "on",
      };
    case "richText": {
      const bodyRaw = str(formData, "body");
      let body;
      try {
        body = JSON.parse(bodyRaw);
      } catch {
        body = { type: "doc", content: [{ type: "paragraph" }] };
      }
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: optStr(formData, "heading"),
        body,
        theme,
        tint: formData.get("tint") === "on",
      };
    }
    case "cardGrid":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: optStr(formData, "heading"),
        body: optStr(formData, "body"),
        items: readJsonArray(formData, "itemsJson").filter(
          (item): item is { title: string } =>
            typeof item === "object" && item !== null && typeof (item as { title?: unknown }).title === "string" && (item as { title: string }).title.trim() !== "",
        ),
        theme,
        columns: formData.get("columns") === "2" ? 2 : 3,
        anchorId: optStr(formData, "anchorId"),
      };
    case "statsQuote":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        stats: readJsonArray(formData, "statsJson").filter(
          (s): s is { number: string; label: string } =>
            typeof s === "object" && s !== null && typeof (s as { label?: unknown }).label === "string" && (s as { label: string }).label.trim() !== "",
        ),
        quote: str(formData, "quote"),
        theme,
      };
    case "quote": {
      const lines = str(formData, "linesText")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      return {
        eyebrow: optStr(formData, "eyebrow"),
        intro: optStr(formData, "intro"),
        lines: lines.length > 0 ? lines : ["A short statement."],
        highlight: optStr(formData, "highlight"),
        theme,
      };
    }
    case "cta":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        buttonLabel: str(formData, "buttonLabel"),
        buttonHref: str(formData, "buttonHref"),
        theme,
      };
    case "productsPreview":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        viewAllLabel: optStr(formData, "viewAllLabel"),
        limit: Math.max(1, Number.parseInt(str(formData, "limit"), 10) || 3),
        theme,
      };
    case "partnersTrustBar":
      return { eyebrow: optStr(formData, "eyebrow"), theme };
    case "openPositions":
      return { eyebrow: optStr(formData, "eyebrow"), heading: str(formData, "heading"), theme };
    case "contactPanel":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        email: str(formData, "email"),
        location: str(formData, "location"),
        theme,
      };
    case "productsGrid":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        emptyMessage: optStr(formData, "emptyMessage"),
        theme,
      };
  }
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

export async function updateBlockData(blockId: string, pageSlug: PageSlug, formData: FormData) {
  await requireSession();
  const block = await db.block.findUnique({ where: { id: blockId } });
  if (!block) throw new Error("Block not found.");
  const data = readBlockFormData(block.type as BlockType, formData);
  await db.block.update({ where: { id: blockId }, data: { data: data as Prisma.InputJsonValue } });
  revalidatePage(pageSlug);
}
