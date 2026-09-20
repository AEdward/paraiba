import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import type { Project as ProjectRow } from "@/generated/prisma/client";
import type { Project, ProjectStatus } from "@/lib/projects";

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    status: row.status as ProjectStatus,
    tags: row.tags ? row.tags.split(",").filter(Boolean) : [],
    link: row.link ?? undefined,
    screenshot: row.screenshot ?? undefined,
    embedLive: row.embedLive,
    githubRepo: row.githubRepo ?? undefined,
    featured: row.featured,
    deliverables: row.deliverables ?? undefined,
    caseStudy: row.caseStudy ?? undefined,
    subdomain: row.subdomain ?? undefined,
    logoUrl: row.logoUrl ?? undefined,
    themeColor: row.themeColor ?? undefined,
    themeColorSecondary: row.themeColorSecondary ?? undefined,
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

// Cached per-request: the product site's layout and its page both need this
// lookup, and without memoizing it'd otherwise hit the database twice.
export const getProjectBySubdomain = cache(async (subdomain: string): Promise<Project | undefined> => {
  const row = await db.project.findUnique({ where: { subdomain } });
  return row ? toProject(row) : undefined;
});
