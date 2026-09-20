import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { ProductSiteForm } from "../ProductSiteForm";
import { updateProductSite } from "../actions";

export const metadata: Metadata = { title: "Edit Product Site" };

export default async function EditProductSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const site = await db.productSite.findUnique({ where: { id } });
  if (!site) notFound();

  const rootDomain = process.env.ROOT_DOMAIN || "your-domain.com";
  const boundUpdate = updateProductSite.bind(null, site.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Edit product site
        </h1>
        <Link
          href={`/admin/product-sites/${site.id}/pages`}
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--color-indigo)" }}
        >
          Build pages <ExternalLink size={13} />
        </Link>
      </div>
      <div className="mt-8">
        <ProductSiteForm site={site} action={boundUpdate} submitLabel="Save changes" rootDomain={rootDomain} />
      </div>
    </div>
  );
}
