import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProjects } from "@/lib/projects-data";
import { getSiteSettings } from "@/lib/site-settings";
import { getNavData } from "@/lib/nav";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [products, settings, headerNav, footerNav] = await Promise.all([
    getProjects(),
    getSiteSettings(),
    getNavData("header"),
    getNavData("footer"),
  ]);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar products={products.map((p) => ({ slug: p.slug, name: p.name }))} nav={headerNav} />
      <main className="flex-1">{children}</main>
      <Footer
        products={products.map((p) => ({ slug: p.slug, name: p.name }))}
        settings={settings}
        nav={footerNav}
      />
    </div>
  );
}
