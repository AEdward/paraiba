"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function readPartnerForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const logoUrl = String(formData.get("logoUrl") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const orderRaw = String(formData.get("order") ?? "0").trim();
  const order = Number.parseInt(orderRaw, 10);

  if (!name) throw new Error("Name is required.");

  return {
    name,
    logoUrl: logoUrl || null,
    website: website || null,
    order: Number.isFinite(order) ? order : 0,
  };
}

export async function createPartner(formData: FormData) {
  await requireSession();
  const data = readPartnerForm(formData);
  await db.partner.create({ data });
  redirect("/admin/partners");
}

export async function updatePartner(id: string, formData: FormData) {
  await requireSession();
  const data = readPartnerForm(formData);
  await db.partner.update({ where: { id }, data });
  redirect("/admin/partners");
}

export async function deletePartner(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing partner id.");
  await db.partner.delete({ where: { id } });
  redirect("/admin/partners");
}
