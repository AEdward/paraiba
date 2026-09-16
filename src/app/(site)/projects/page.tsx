import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "The products Paraiba Technology PLC owns, and the client projects we've delivered.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.find((p) => p.featured);
  const rest = featured ? projects.filter((p) => p.id !== featured.id) : projects;
  const products = rest.filter((p) => p.kind === "product");
  const clientProjects = rest.filter((p) => p.kind === "client");

  return (
    <div className="paraiba-light-section relative overflow-hidden">
      <GradientMesh />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <p
            className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: "var(--color-teal)" }}
          >
            Portfolio
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold" style={{ color: "var(--ink)" }}>
            Projects
          </h1>
          <p className="mt-4 max-w-xl opacity-70">
            The products we&apos;re building ourselves, and the client projects we&apos;ve
            delivered — from first sketch to shipped software.
          </p>
        </FadeIn>

        {featured && (
          <div className="mt-14 border-b pb-14" style={{ borderColor: "var(--border-soft)" }}>
            <FeaturedProject project={featured} />
          </div>
        )}

        <div className="mt-14">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
              Our Products
            </h2>
            <p className="mt-2 max-w-xl text-sm opacity-70">
              Technology we own and build ourselves — some for our own portfolio, some with
              ambitions to grow into platforms of their own.
            </p>
          </FadeIn>
          <ProjectsGrid projects={products} emptyMessage="No products published yet — we're currently building." />
        </div>

        <div className="mt-20 border-t pt-14" style={{ borderColor: "var(--border-soft)" }}>
          <FadeIn>
            <h2 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
              Client Projects
            </h2>
            <p className="mt-2 max-w-xl text-sm opacity-70">
              Technology built for the businesses and organizations we&apos;ve partnered with.
            </p>
          </FadeIn>
          <ProjectsGrid projects={clientProjects} emptyMessage="No client projects published yet." />
        </div>
      </div>
    </div>
  );
}
