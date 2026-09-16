import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getProjects } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "The projects Paraiba Technology PLC is building.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const featured = projects.find((p) => p.featured);
  const rest = featured ? projects.filter((p) => p.id !== featured.id) : projects;

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20">
      <GradientMesh />
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
          Every product, platform, and experiment we&apos;ve launched together — from
          first sketch to shipped software.
        </p>
      </FadeIn>

      {featured && (
        <div className="mt-14 border-b pb-14" style={{ borderColor: "var(--border-soft)" }}>
          <FeaturedProject project={featured} />
        </div>
      )}

      <ProjectsGrid projects={rest} />
    </div>
  );
}
