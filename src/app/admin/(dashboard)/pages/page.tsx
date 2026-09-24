import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { PAGE_SLUGS, PAGE_TITLES } from "@/lib/blocks/types";

export const metadata: Metadata = { title: "Pages" };
export const dynamic = "force-dynamic";

export default async function AdminPagesListPage() {
  const pages = await db.page.findMany({ include: { _count: { select: { blocks: true } } } });
  const bySlug = new Map(pages.map((p) => [p.slug, p]));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Pages
      </h1>
      <p className="mt-2 max-w-lg text-sm opacity-60">
        Every section of every page on the site is built from blocks you add, edit, reorder,
        and remove here — no code changes needed.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAGE_SLUGS.map((slug) => {
          const page = bySlug.get(slug);
          const count = page?._count.blocks ?? 0;
          const published = page?.published ?? true;
          return (
            <Link
              key={slug}
              href={`/admin/pages/${slug}`}
              className="rounded-2xl border p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
                  {PAGE_TITLES[slug]}
                </p>
                {!published && (
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                    style={{ background: "rgba(8,124,255,0.1)", color: "var(--color-ember)" }}
                  >
                    Unpublished
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm opacity-60">
                {count} block{count === 1 ? "" : "s"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
