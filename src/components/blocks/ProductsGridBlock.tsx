import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/projects-data";
import { getProductSitesBySubdomain } from "@/lib/productSites-data";
import type { ProductsGridData } from "@/lib/blocks/types";

export async function ProductsGridBlock({ data }: { data: ProductsGridData }) {
  const [products, productSites] = await Promise.all([getProjects(), getProductSitesBySubdomain()]);
  const featured = products.find((p) => p.featured);
  const rest = featured ? products.filter((p) => p.id !== featured.id) : products;

  return (
    <section
      className={`${data.theme === "dark" ? "paraiba-dark-section" : "paraiba-light-section"} relative overflow-hidden border-t`}
      style={{ borderColor: "var(--border-soft)" }}
    >
      <GradientMesh />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-teal)" }}>
            {data.eyebrow}
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold" style={{ color: "var(--ink)" }}>
            {data.heading}
          </h1>
          {data.body && <p className="mt-4 max-w-xl opacity-70">{data.body}</p>}
        </FadeIn>

        {featured && (
          <div className="mt-14 border-b pb-14" style={{ borderColor: "var(--border-soft)" }}>
            <FeaturedProject project={featured} />
          </div>
        )}

        <div className="mt-14">
          <ProjectsGrid projects={rest} productSites={productSites} emptyMessage={data.emptyMessage} />
        </div>
      </div>
    </section>
  );
}
