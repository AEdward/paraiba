"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { APPLICATION_STATUSES } from "@/lib/applications";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function updateApplicationStatus(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id) throw new Error("Missing application id.");
  if (!APPLICATION_STATUSES.includes(status as (typeof APPLICATION_STATUSES)[number])) {
    throw new Error("Invalid status.");
  }
  await db.jobApplication.update({ where: { id }, data: { status } });
  revalidatePath("/admin/applicants");
}

export async function deleteApplication(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing application id.");
  await db.jobApplication.delete({ where: { id } });
  revalidatePath("/admin/applicants");
}
