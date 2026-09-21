import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { ProductNavbar } from "@/components/ProductNavbar";
import { ProductFooter } from "@/components/ProductFooter";
import { getProductSiteBySubdomain } from "@/lib/productSites-data";
import { getProductShell } from "@/components/product-shells/registry";

type ThemeVars = CSSProperties & Record<`--${string}`, string>;

export default async function ProductSiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const site = await getProductSiteBySubdomain(subdomain);
  if (!site) notFound();

  const themeVars: ThemeVars = {};
  if (site.themeColor) {
    themeVars["--color-ember"] = site.themeColor;
    themeVars["--color-teal"] = site.themeColor;
  }
  if (site.themeColorSecondary) {
    themeVars["--color-amber"] = site.themeColorSecondary;
  }

  const shell = getProductShell(subdomain);
  const Navbar = shell?.Navbar ?? ProductNavbar;

  return (
    <div className="flex min-h-full flex-1 flex-col" style={themeVars}>
      <Navbar name={site.name} logoUrl={site.logoUrl} />
      <main className="flex-1">{children}</main>
      <ProductFooter name={site.name} />
    </div>
  );
}
