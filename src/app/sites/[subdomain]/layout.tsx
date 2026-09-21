import type { CSSProperties, ReactNode } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ProductNavbar } from "@/components/ProductNavbar";
import { ProductFooter } from "@/components/ProductFooter";
import { getProductSiteBySubdomain } from "@/lib/productSites-data";
import { getProductShell } from "@/components/product-shells/registry";
import { getRootSiteUrl } from "@/lib/subdomain";

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

  // ROOT_DOMAIN is meant to be left unset in local dev — derive it from the
  // current request's Host header (stripping this site's own subdomain
  // prefix) so "Back to Paraiba" still resolves to the right port.
  const host = (await headers()).get("host") ?? "";
  const rootDomain =
    process.env.ROOT_DOMAIN ||
    (host.startsWith(`${subdomain}.`) ? host.slice(subdomain.length + 1) : "localhost:3000");
  const homeUrl = getRootSiteUrl(rootDomain);

  return (
    <div className="flex min-h-full flex-1 flex-col" style={themeVars}>
      <Navbar name={site.name} logoUrl={site.logoUrl} homeUrl={homeUrl} />
      <main className="flex-1">{children}</main>
      <ProductFooter name={site.name} homeUrl={homeUrl} />
    </div>
  );
}
