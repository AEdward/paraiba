"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { RESERVED_SUBDOMAINS } from "@/lib/subdomain";

const MAX_LOGO_BYTES = 2 * 1024 * 1024;
const SUBDOMAIN_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;

async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function readBaseFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const subdomain = String(formData.get("subdomain") ?? "")
    .trim()
    .toLowerCase();
  const logoUrl = String(formData.get("logoUrl") ?? "").trim();
  const themeColor = String(formData.get("themeColor") ?? "").trim();
  const themeColorSecondary = String(formData.get("themeColorSecondary") ?? "").trim();

  if (!name) throw new Error("Name is required.");
  if (!subdomain) throw new Error("Subdomain is required.");
  if (!SUBDOMAIN_PATTERN.test(subdomain)) {
    throw new Error("Subdomain can only contain lowercase letters, numbers, and hyphens.");
  }
  if (RESERVED_SUBDOMAINS.has(subdomain)) {
    throw new Error(`"${subdomain}" is reserved and can't be used as a product site subdomain.`);
  }
  if (themeColor && !HEX_COLOR_PATTERN.test(themeColor)) {
    throw new Error("Theme color must be a hex color like #1e6fd9.");
  }
  if (themeColorSecondary && !HEX_COLOR_PATTERN.test(themeColorSecondary)) {
    throw new Error("Secondary theme color must be a hex color like #f5a623.");
  }

  return {
    name,
    subdomain,
    logoUrl: logoUrl || null,
    themeColor: themeColor || null,
    themeColorSecondary: themeColorSecondary || null,
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

type ProductSiteData = {
  name: string;
  subdomain: string;
  logoUrl: string | null;
  themeColor: string | null;
  themeColorSecondary: string | null;
  logoData?: Uint8Array<ArrayBuffer> | null;
  logoMimeType?: string | null;
};

export async function createProductSite(formData: FormData) {
  await requireSession();
  const data: ProductSiteData = readBaseFields(formData);
  const uploaded = await readUploadedLogo(formData);
  if (uploaded) {
    data.logoData = uploaded.logoData;
    data.logoMimeType = uploaded.logoMimeType;
  }
  const site = await db.productSite.create({ data });
  revalidatePath("/admin/product-sites");
  redirect(`/admin/product-sites/${site.id}`);
}

export async function updateProductSite(id: string, formData: FormData) {
  await requireSession();
  const data: ProductSiteData = readBaseFields(formData);
  const uploaded = await readUploadedLogo(formData);
  const removeLogo = formData.get("removeLogo") === "on";

  if (uploaded) {
    data.logoData = uploaded.logoData;
    data.logoMimeType = uploaded.logoMimeType;
  } else if (removeLogo) {
    data.logoData = null;
    data.logoMimeType = null;
  }

  const existing = await db.productSite.findUnique({ where: { id }, select: { subdomain: true } });
  await db.productSite.update({ where: { id }, data });
  revalidatePath("/admin/product-sites");
  revalidatePath(`/admin/product-sites/${id}`);
  if (existing?.subdomain) revalidatePath(`/sites/${existing.subdomain}`, "layout");
  if (data.subdomain !== existing?.subdomain) revalidatePath(`/sites/${data.subdomain}`, "layout");
}

export async function deleteProductSite(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product site id.");
  await db.productSite.delete({ where: { id } });
  revalidatePath("/admin/product-sites");
  redirect("/admin/product-sites");
}
