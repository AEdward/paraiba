import "server-only";
import { db } from "@/lib/db";

export const SITE_SETTINGS_ID = "singleton";

export type SiteSettingsData = {
  officeLocation: string;
  phone: string | null;
  email: string;
  mapEmbedUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  telegramUrl: string | null;
  youtubeUrl: string | null;
  linkedinUrl: string | null;
};

const DEFAULTS: SiteSettingsData = {
  officeLocation: "Addis Ababa, Ethiopia",
  phone: null,
  email: "hello@paraiba.com",
  mapEmbedUrl: null,
  facebookUrl: null,
  instagramUrl: null,
  tiktokUrl: null,
  telegramUrl: null,
  youtubeUrl: null,
  linkedinUrl: null,
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const row = await db.siteSettings.findUnique({ where: { id: SITE_SETTINGS_ID } });
  return row ?? DEFAULTS;
}

export type SocialLinkKey =
  | "facebookUrl"
  | "instagramUrl"
  | "tiktokUrl"
  | "telegramUrl"
  | "youtubeUrl"
  | "linkedinUrl";

export const SOCIAL_LINK_LABELS: Record<SocialLinkKey, string> = {
  facebookUrl: "Facebook",
  instagramUrl: "Instagram",
  tiktokUrl: "TikTok",
  telegramUrl: "Telegram",
  youtubeUrl: "YouTube",
  linkedinUrl: "LinkedIn",
};

export const SOCIAL_LINK_KEYS = Object.keys(SOCIAL_LINK_LABELS) as SocialLinkKey[];
