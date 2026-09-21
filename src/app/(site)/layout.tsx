import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProjects } from "@/lib/projects-data";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const products = await getProjects();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar products={products.map((p) => ({ slug: p.slug, name: p.name }))} />
      <main className="flex-1">{children}</main>
      <Footer products={products.map((p) => ({ slug: p.slug, name: p.name }))} />
    </div>
  );
}
