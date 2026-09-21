import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteButton } from "../DeleteButton";
import { deleteProductSite } from "./actions";

export const metadata: Metadata = { title: "Product Sites" };
export const dynamic = "force-dynamic";

export default async function AdminProductSitesPage() {
  const sites = await db.productSite.findMany({
    orderBy: { createdAt: "desc" },
    include: { pages: { select: { _count: { select: { blocks: true } } } } },
  });
  const rootDomain = process.env.ROOT_DOMAIN || "your-domain.com";

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
            Product Sites
          </h1>
          <p className="mt-1 text-sm opacity-60">
            Standalone, custom-themed marketing sites for products still in development — separate
            from the Products catalog.
          </p>
        </div>
        <Link
          href="/admin/product-sites/new"
          className="font-display inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Plus size={15} /> New site
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left opacity-60" style={{ borderColor: "var(--border-soft)" }}>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Subdomain</th>
              <th className="px-4 py-3 font-medium">Blocks</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.id} className="border-b last:border-0" style={{ borderColor: "var(--border-soft)" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--ink)" }}>
                  {site.name}
                </td>
                <td className="px-4 py-3 opacity-70">
                  {site.subdomain}.{rootDomain}
                </td>
                <td className="px-4 py-3 opacity-70">{site.pages[0]?._count.blocks ?? 0}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/product-sites/${site.id}/pages/home`}
                      className="font-medium"
                      style={{ color: "var(--color-indigo)" }}
                    >
                      Build page
                    </Link>
                    <Link
                      href={`/admin/product-sites/${site.id}`}
                      className="font-medium"
                      style={{ color: "var(--color-teal)" }}
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteProductSite} id={site.id} label="product site" />
                  </div>
                </td>
              </tr>
            ))}
            {sites.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center opacity-50">
                  No product sites yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
