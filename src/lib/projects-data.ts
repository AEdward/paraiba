import "server-only";
import { db } from "@/lib/db";
import type { Project as ProjectRow } from "@/generated/prisma/client";
import type { Project, ProjectStatus, ProjectKind } from "@/lib/projects";

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    status: row.status as ProjectStatus,
    kind: row.kind as ProjectKind,
    tags: row.tags ? row.tags.split(",").filter(Boolean) : [],
    link: row.link ?? undefined,
    screenshot: row.screenshot ?? undefined,
    embedLive: row.embedLive,
    githubRepo: row.githubRepo ?? undefined,
    featured: row.featured,
    deliverables: row.deliverables ?? undefined,
    caseStudy: row.caseStudy ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toProject);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const row = await db.project.findUnique({ where: { slug } });
  return row ? toProject(row) : undefined;
}
