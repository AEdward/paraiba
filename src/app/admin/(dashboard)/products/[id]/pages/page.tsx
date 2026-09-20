import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PRODUCT_PAGE_SLUGS, PRODUCT_PAGE_TITLES } from "@/lib/blocks/types";

export const metadata: Metadata = { title: "Product Pages" };
export const dynamic = "force-dynamic";

export default async function ProductPagesListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id },
    include: { pages: { include: { _count: { select: { blocks: true } } } } },
  });
  if (!project) notFound();

  const bySlug = new Map(project.pages.map((p) => [p.slug, p]));
  const rootDomain = process.env.ROOT_DOMAIN || "your-domain.com";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        {project.name} — Pages
      </h1>
      <p className="mt-2 max-w-lg text-sm opacity-60">
        {project.subdomain ? (
          <>
            Live at <code>{project.subdomain}.{rootDomain}</code> (once DNS is set up — see
            the README). Built the same drag-and-drop way as the main site.
          </>
        ) : (
          <>
            No subdomain set yet — set one on the product&apos;s edit page to publish this
            mini-site. You can still build its pages now.
          </>
        )}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCT_PAGE_SLUGS.map((slug) => {
          const page = bySlug.get(slug);
          const count = page?._count.blocks ?? 0;
          return (
            <Link
              key={slug}
              href={`/admin/products/${project.id}/pages/${slug}`}
              className="rounded-2xl border p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
            >
              <p className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
                {PRODUCT_PAGE_TITLES[slug]}
              </p>
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
