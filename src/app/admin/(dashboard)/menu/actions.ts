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

function readFields(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const location = String(formData.get("location") ?? "both").trim();
  const group = String(formData.get("group") ?? "").trim();
  const orderRaw = String(formData.get("order") ?? "0").trim();
  const order = Number.parseInt(orderRaw, 10);

  if (!label) throw new Error("Label is required.");
  if (!href) throw new Error("Link is required.");
  if (!["header", "footer", "both"].includes(location)) throw new Error("Invalid location.");

  return {
    label,
    href,
    location,
    group: group || null,
    order: Number.isFinite(order) ? order : 0,
    newTab: formData.get("newTab") === "on",
  };
}

function revalidateNav() {
  revalidatePath("/admin/menu");
  revalidatePath("/", "layout");
}

export async function createNavItem(formData: FormData) {
  await requireSession();
  await db.navItem.create({ data: readFields(formData) });
  revalidateNav();
  redirect("/admin/menu");
}

export async function updateNavItem(id: string, formData: FormData) {
  await requireSession();
  await db.navItem.update({ where: { id }, data: readFields(formData) });
  revalidateNav();
  redirect("/admin/menu");
}

export async function deleteNavItem(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing nav item id.");
  await db.navItem.delete({ where: { id } });
  revalidateNav();
  redirect("/admin/menu");
}
