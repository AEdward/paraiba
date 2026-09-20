"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getRichSections } from "@/lib/richDoc";
import { RESERVED_SUBDOMAINS } from "@/lib/subdomain";

const STATUSES = ["live", "in-progress", "concept", "archived"];
const GITHUB_REPO_PATTERN = /^[\w.-]+\/[\w.-]+$/;
const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function readProjectForm(formData: FormData) {
  const status = String(formData.get("status") ?? "");
  if (!STATUSES.includes(status)) {
    throw new Error("Invalid project status.");
  }
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .join(",");
  const link = String(formData.get("link") ?? "").trim() || null;
  const screenshot = String(formData.get("screenshot") ?? "").trim() || null;
  // A link-less embedLive is already inert in getEmbedUrl() (falls through to the
  // next preview option), so normalize it here instead of blocking the whole save
  // over an unrelated, harmless checkbox state.
  const embedLive = formData.get("embedLive") === "on" && Boolean(link);
  const githubRepoRaw = String(formData.get("githubRepo") ?? "").trim();
  const githubRepo = githubRepoRaw.replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\/+$/, "") || null;
  const featured = formData.get("featured") === "on";
  // The rich text editor always submits a JSON doc, even when the admin left it
  // empty — treat that as blank too instead of storing a hollow "empty doc" string.
  const deliverablesRaw = String(formData.get("deliverables") ?? "").trim();
  const deliverables = deliverablesRaw && getRichSections(deliverablesRaw).length > 0 ? deliverablesRaw : null;
  const caseStudyRaw = String(formData.get("caseStudy") ?? "").trim();
  const caseStudy = caseStudyRaw && getRichSections(caseStudyRaw).length > 0 ? caseStudyRaw : null;

  const subdomainRaw = String(formData.get("subdomain") ?? "").trim().toLowerCase();
  const subdomain = subdomainRaw || null;
  const logoUrl = String(formData.get("logoUrl") ?? "").trim() || null;
  const themeColorRaw = String(formData.get("themeColor") ?? "").trim();
  const themeColor = themeColorRaw || null;
  const themeColorSecondaryRaw = String(formData.get("themeColorSecondary") ?? "").trim();
  const themeColorSecondary = themeColorSecondaryRaw || null;

  if (!slug || !name || !tagline || !description) {
    throw new Error("Slug, name, tagline, and description are required.");
  }
  if (githubRepo && !GITHUB_REPO_PATTERN.test(githubRepo)) {
    throw new Error('GitHub repo must look like "owner/repo".');
  }
  if (subdomain) {
    if (!SUBDOMAIN_PATTERN.test(subdomain)) {
      throw new Error("Subdomain can only contain lowercase letters, numbers, and hyphens.");
    }
    if (RESERVED_SUBDOMAINS.has(subdomain)) {
      throw new Error(`"${subdomain}" is reserved and can't be used as a product subdomain.`);
    }
  }
  if (themeColor && !HEX_COLOR_PATTERN.test(themeColor)) {
    throw new Error("Theme color must be a hex color like #1e6fd9.");
  }
  if (themeColorSecondary && !HEX_COLOR_PATTERN.test(themeColorSecondary)) {
    throw new Error("Secondary theme color must be a hex color like #f5a623.");
  }

  return {
    slug,
    name,
    tagline,
    description,
    status,
    tags,
    link,
    screenshot,
    embedLive,
    githubRepo,
    featured,
    deliverables,
    caseStudy,
    subdomain,
    logoUrl,
    themeColor,
    themeColorSecondary,
  };
}

export async function createProject(formData: FormData) {
  await requireSession();
  const data = readProjectForm(formData);
  const project = await db.project.create({ data });
  revalidatePath("/admin/products");
  // A brand-new project doesn't have an edit page to "stay on" yet — send the
  // admin straight into it instead of dumping them back at the bare list.
  redirect(`/admin/products/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireSession();
  const data = readProjectForm(formData);
  await db.project.update({ where: { id }, data });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}

export async function deleteProject(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id.");
  await db.project.delete({ where: { id } });
  redirect("/admin/products");
}
