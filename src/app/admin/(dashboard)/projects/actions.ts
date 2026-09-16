"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getRichSections } from "@/lib/richDoc";

const STATUSES = ["live", "in-progress", "concept", "archived"];
const KINDS = ["client", "product"];
const GITHUB_REPO_PATTERN = /^[\w.-]+\/[\w.-]+$/;

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
  const kind = String(formData.get("kind") ?? "");
  if (!KINDS.includes(kind)) {
    throw new Error("Invalid project kind.");
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

  if (!slug || !name || !tagline || !description) {
    throw new Error("Slug, name, tagline, and description are required.");
  }
  if (githubRepo && !GITHUB_REPO_PATTERN.test(githubRepo)) {
    throw new Error('GitHub repo must look like "owner/repo".');
  }

  return {
    slug,
    name,
    tagline,
    description,
    status,
    kind,
    tags,
    link,
    screenshot,
    embedLive,
    githubRepo,
    featured,
    deliverables,
    caseStudy,
  };
}

export async function createProject(formData: FormData) {
  await requireSession();
  const data = readProjectForm(formData);
  const project = await db.project.create({ data });
  revalidatePath("/admin/projects");
  // A brand-new project doesn't have an edit page to "stay on" yet — send the
  // admin straight into it instead of dumping them back at the bare list.
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireSession();
  const data = readProjectForm(formData);
  await db.project.update({ where: { id }, data });
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id.");
  await db.project.delete({ where: { id } });
  redirect("/admin/projects");
}
