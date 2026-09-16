"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const MAX_LOGO_BYTES = 2 * 1024 * 1024;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function readBaseFields(formData: FormData) {
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

async function readUploadedLogo(formData: FormData) {
  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) return undefined;

  if (!file.type.startsWith("image/")) {
    throw new Error("Logo must be an image file.");
  }
  if (file.size > MAX_LOGO_BYTES) {
    throw new Error("Logo must be smaller than 2MB.");
  }

  const logoData = new Uint8Array(await file.arrayBuffer());
  return { logoData, logoMimeType: file.type };
}

type PartnerData = {
  name: string;
  logoUrl: string | null;
  website: string | null;
  order: number;
  logoData?: Uint8Array<ArrayBuffer> | null;
  logoMimeType?: string | null;
};

export async function createPartner(formData: FormData) {
  await requireSession();
  const data: PartnerData = readBaseFields(formData);
  const uploaded = await readUploadedLogo(formData);
  if (uploaded) {
    data.logoData = uploaded.logoData;
    data.logoMimeType = uploaded.logoMimeType;
  }
  await db.partner.create({ data });
  redirect("/admin/partners");
}

export async function updatePartner(id: string, formData: FormData) {
  await requireSession();
  const data: PartnerData = readBaseFields(formData);
  const uploaded = await readUploadedLogo(formData);
  const removeLogo = formData.get("removeLogo") === "on";

  if (uploaded) {
    data.logoData = uploaded.logoData;
    data.logoMimeType = uploaded.logoMimeType;
  } else if (removeLogo) {
    data.logoData = null;
    data.logoMimeType = null;
  }

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
