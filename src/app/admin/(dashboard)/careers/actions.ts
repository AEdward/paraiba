"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const TYPES = ["Full-time", "Part-time", "Contract"];
const STATUSES = ["open", "closed"];

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function readJobForm(formData: FormData) {
  const type = String(formData.get("type") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!TYPES.includes(type)) throw new Error("Invalid job type.");
  if (!STATUSES.includes(status)) throw new Error("Invalid job status.");

  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !location || !description) {
    throw new Error("Title, location, and description are required.");
  }

  return { title, location, type, status, description };
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
