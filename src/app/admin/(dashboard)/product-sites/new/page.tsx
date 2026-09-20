import type { Metadata } from "next";
import { ProductSiteForm } from "../ProductSiteForm";
import { createProductSite } from "../actions";

export const metadata: Metadata = { title: "New Product Site" };

export default function NewProductSitePage() {
  const rootDomain = process.env.ROOT_DOMAIN || "your-domain.com";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        New product site
      </h1>
      <div className="mt-8">
        <ProductSiteForm action={createProductSite} submitLabel="Create site" rootDomain={rootDomain} />
      </div>
    </div>
  );
}
