"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getRichSections } from "@/lib/richDoc";

const STATUSES = ["live", "in-progress", "concept", "archived"];
const GITHUB_REPO_PATTERN = /^[\w.-]+\/[\w.-]+$/;
const MAX_SCREENSHOT_BYTES = 4 * 1024 * 1024;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

async function readUploadedScreenshot(formData: FormData) {
  const file = formData.get("screenshotFile");
  if (!(file instanceof File) || file.size === 0) return undefined;

  if (!file.type.startsWith("image/")) {
    throw new Error("Screenshot must be an image file.");
  }
  if (file.size > MAX_SCREENSHOT_BYTES) {
    throw new Error("Screenshot must be smaller than 4MB.");
  }

  const screenshotData = new Uint8Array(await file.arrayBuffer());
  return { screenshotData, screenshotMimeType: file.type };
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
    tags,
    link,
    screenshot,
    embedLive,
    githubRepo,
    featured,
    deliverables,
    caseStudy,
    screenshotData: undefined as Uint8Array<ArrayBuffer> | null | undefined,
    screenshotMimeType: undefined as string | null | undefined,
  };
}

export async function createProject(formData: FormData) {
  await requireSession();
  const data = readProjectForm(formData);
  const uploaded = await readUploadedScreenshot(formData);
  if (uploaded) {
    data.screenshotData = uploaded.screenshotData;
    data.screenshotMimeType = uploaded.screenshotMimeType;
  }
  const project = await db.project.create({ data });
  revalidatePath("/admin/products");
  // A brand-new project doesn't have an edit page to "stay on" yet — send the
  // admin straight into it instead of dumping them back at the bare list.
  redirect(`/admin/products/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  await requireSession();
  const data = readProjectForm(formData);
  const uploaded = await readUploadedScreenshot(formData);
  const removeScreenshot = formData.get("removeScreenshot") === "on";

  if (uploaded) {
    data.screenshotData = uploaded.screenshotData;
    data.screenshotMimeType = uploaded.screenshotMimeType;
  } else if (removeScreenshot) {
    data.screenshotData = null;
    data.screenshotMimeType = null;
  }

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
