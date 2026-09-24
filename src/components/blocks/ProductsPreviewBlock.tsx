import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionShell, Eyebrow } from "./SectionShell";
import { getProjects } from "@/lib/projects-data";
import { getProductSitesBySubdomain } from "@/lib/productSites-data";
import type { ProductsPreviewData } from "@/lib/blocks/types";

export async function ProductsPreviewBlock({ data }: { data: ProductsPreviewData }) {
  const [products, productSites] = await Promise.all([
    getProjects().then((all) => all.slice(0, data.limit)),
    getProductSitesBySubdomain(),
  ]);
  if (products.length === 0) return null;

  return (
    <SectionShell theme={data.theme} tightTop>
      <div className="flex items-end justify-between gap-4">
        <FadeIn>
          <Eyebrow color="var(--color-ember)">
            {data.eyebrow}
          </Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
            {data.heading}
          </h2>
        </FadeIn>
        {data.viewAllLabel && (
          <FadeIn delay={0.1}>
            <Link
              href="/products"
              className="font-display hidden items-center gap-1 text-sm font-semibold sm:inline-flex"
              style={{ color: "var(--color-ember)" }}
            >
              {data.viewAllLabel} <ArrowRight size={14} />
            </Link>
          </FadeIn>
        )}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <FadeIn key={product.slug} delay={i * 0.08}>
            <ProjectCard
              project={product}
              logoUrl={productSites[product.slug]?.logoUrl}
              accentColor={productSites[product.slug]?.themeColor}
            />
          </FadeIn>
        ))}
      </div>
    </SectionShell>
  );
}
