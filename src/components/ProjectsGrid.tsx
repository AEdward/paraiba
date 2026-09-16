"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { FadeIn } from "@/components/FadeIn";
import type { Project } from "@/lib/projects";

export function ProjectsGrid({
  projects,
  emptyMessage = "No projects yet.",
}: {
  projects: Project[];
  emptyMessage?: string;
}) {
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
    [projects],
  );
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  if (projects.length === 0) {
    return <p className="mt-8 text-center opacity-50">{emptyMessage}</p>;
  }

  return (
    <div>
      {tags.length > 1 && (
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors"
            style={
              active === null
                ? { background: "var(--color-indigo)", color: "var(--color-cream)" }
                : { background: "var(--surface)", color: "var(--ink)", opacity: 0.7 }
            }
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors"
              style={
                active === tag
                  ? { background: "var(--color-indigo)", color: "var(--color-cream)" }
                  : { background: "var(--surface)", color: "var(--ink)", opacity: 0.7 }
              }
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center opacity-50">No projects tagged &ldquo;{active}&rdquo;.</p>
      )}
    </div>
  );
}
