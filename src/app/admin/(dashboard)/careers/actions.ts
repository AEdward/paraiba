"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const TYPES = ["Full-time", "Part-time", "Contract"];
const LEVELS = ["Internship", "Junior", "Mid", "Senior", "Lead"];
const WORK_MODES = ["On-site", "Remote", "Hybrid"];
const STATUSES = ["open", "closed"];

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function readJobForm(formData: FormData) {
  const type = String(formData.get("type") ?? "");
  const level = String(formData.get("level") ?? "");
  const workMode = String(formData.get("workMode") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!TYPES.includes(type)) throw new Error("Invalid job type.");
  if (!LEVELS.includes(level)) throw new Error("Invalid job level.");
  if (!WORK_MODES.includes(workMode)) throw new Error("Invalid work mode.");
  if (!STATUSES.includes(status)) throw new Error("Invalid job status.");

  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !category || !location || !description) {
    throw new Error("Title, category, location, and description are required.");
  }

  const optional = (name: string) => String(formData.get(name) ?? "").trim() || null;

  return {
    title,
    category,
    level,
    location,
    type,
    workMode,
    status,
    description,
    aboutRole: optional("aboutRole"),
    responsibilities: optional("responsibilities"),
    niceToHave: optional("niceToHave"),
    techStack: optional("techStack"),
    howToApply: optional("howToApply"),
  };
}

export async function createJob(formData: FormData) {
  await requireSession();
  const data = readJobForm(formData);
  await db.jobPosting.create({ data });
  redirect("/admin/careers");
}

export async function updateJob(id: string, formData: FormData) {
  await requireSession();
  const data = readJobForm(formData);
  await db.jobPosting.update({ where: { id }, data });
  redirect("/admin/careers");
}

export async function deleteJob(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing job id.");
  await db.jobPosting.delete({ where: { id } });
  redirect("/admin/careers");
}
