"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { SITE_SETTINGS_ID, SOCIAL_LINK_KEYS } from "@/lib/site-settings";

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function optStr(formData: FormData, name: string): string | null {
  const value = String(formData.get(name) ?? "").trim();
  return value || null;
}

export async function updateSiteSettings(formData: FormData) {
  await requireSession();

  const officeLocation = String(formData.get("officeLocation") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!officeLocation) throw new Error("Office location is required.");
  if (!email) throw new Error("Email is required.");

  const data = {
    officeLocation,
    email,
    phone: optStr(formData, "phone"),
    mapEmbedUrl: optStr(formData, "mapEmbedUrl"),
    ...Object.fromEntries(SOCIAL_LINK_KEYS.map((key) => [key, optStr(formData, key)])),
  };

  await db.siteSettings.upsert({
    where: { id: SITE_SETTINGS_ID },
    update: data,
    create: { id: SITE_SETTINGS_ID, ...data },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/", "layout");
}
