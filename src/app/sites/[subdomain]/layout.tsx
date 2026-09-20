import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { ProductNavbar } from "@/components/ProductNavbar";
import { ProductFooter } from "@/components/ProductFooter";
import { getProjectBySubdomain } from "@/lib/projects-data";

type ThemeVars = CSSProperties & Record<`--${string}`, string>;

export default async function ProductSiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const project = await getProjectBySubdomain(subdomain);
  if (!project) notFound();

  const themeVars: ThemeVars = {};
  if (project.themeColor) {
    themeVars["--color-ember"] = project.themeColor;
    themeVars["--color-teal"] = project.themeColor;
  }
  if (project.themeColorSecondary) {
    themeVars["--color-amber"] = project.themeColorSecondary;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col" style={themeVars}>
      <ProductNavbar name={project.name} logoUrl={project.logoUrl} />
      <main className="flex-1">{children}</main>
      <ProductFooter name={project.name} />
    </div>
  );
}
