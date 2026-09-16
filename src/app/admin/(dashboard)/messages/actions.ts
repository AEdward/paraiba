"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function toggleRead(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const current = String(formData.get("read") ?? "false") === "true";
  if (!id) throw new Error("Missing message id.");
  await db.contactSubmission.update({ where: { id }, data: { read: !current } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing message id.");
  await db.contactSubmission.delete({ where: { id } });
  redirect("/admin/messages");
}
