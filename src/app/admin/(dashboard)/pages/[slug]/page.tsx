import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { PAGE_SLUGS, PAGE_TITLES, type BlockRecord, type BlockType, type PageSlug } from "@/lib/blocks/types";
import { PageBuilder, type PageBuilderActions } from "../PageBuilder";
import { addBlock, deleteBlock, reorderBlocks, updateBlockData, togglePagePublished } from "../actions";

export const dynamic = "force-dynamic";

function isPageSlug(slug: string): slug is PageSlug {
  return (PAGE_SLUGS as readonly string[]).includes(slug);
}

function publicPath(slug: PageSlug): string {
  return slug === "home" ? "/" : `/${slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: isPageSlug(slug) ? PAGE_TITLES[slug] : "Page" };
}

export default async function PageBuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();

  let page = await db.page.findUnique({
    where: { slug },
    include: { blocks: { orderBy: { order: "asc" } } },
  });
  if (!page) {
    page = await db.page.create({
      data: { slug, title: PAGE_TITLES[slug] },
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
    addBlock: addBlock.bind(null, slug),
    deleteBlockAction: deleteBlock.bind(null, slug),
    reorderBlocks: reorderBlocks.bind(null, slug),
    updateBlockAction: updateBlockData.bind(null, slug),
  };

  const toggleAction = togglePagePublished.bind(null, slug, !page.published);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
            {PAGE_TITLES[slug]}
          </h1>
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase"
            style={
              page.published
                ? { background: "rgba(16,185,129,0.12)", color: "#10b981" }
                : { background: "rgba(8,124,255,0.1)", color: "var(--color-ember)" }
            }
          >
            {page.published ? "Published" : "Unpublished"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <form action={toggleAction}>
            <button
              type="submit"
              className="rounded-lg border px-3 py-1.5 text-sm font-medium"
              style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
            >
              {page.published ? "Unpublish" : "Publish"}
            </button>
          </form>
          <Link
            href={publicPath(slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--color-teal)" }}
          >
            View live page <ExternalLink size={13} />
          </Link>
        </div>
      </div>
      <p className="mt-1 text-sm opacity-60">
        Drag to reorder, click a block to edit it, or add a new one below.
        {!page.published && " This page is unpublished — visitors see a 404 until you publish it."}
      </p>

      <div className="mt-8">
        <PageBuilder blocks={blocks} actions={actions} />
      </div>
    </div>
  );
}
