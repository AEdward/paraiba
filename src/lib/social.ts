import type { ComponentType } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TiktokIcon,
  YoutubeIcon,
  type IconProps,
} from "@/components/icons/SocialIcons";
import type { SiteSettingsData, SocialLinkKey } from "@/lib/site-settings";

export type SocialLink = {
  icon: ComponentType<IconProps>;
  label: string;
  href: string;
};

const SOCIAL_ICONS: Record<SocialLinkKey, ComponentType<IconProps>> = {
  telegramUrl: TelegramIcon,
  tiktokUrl: TiktokIcon,
  instagramUrl: InstagramIcon,
  facebookUrl: FacebookIcon,
  youtubeUrl: YoutubeIcon,
  linkedinUrl: LinkedinIcon,
};

const SOCIAL_LABELS: Record<SocialLinkKey, string> = {
  telegramUrl: "Telegram",
  tiktokUrl: "TikTok",
  instagramUrl: "Instagram",
  facebookUrl: "Facebook",
  youtubeUrl: "YouTube",
  linkedinUrl: "LinkedIn",
};

// Only platforms with a URL set in Admin → Settings are shown — nothing
// fabricated or placeholder.
export function getSocialLinks(settings: SiteSettingsData): SocialLink[] {
  return (Object.keys(SOCIAL_ICONS) as SocialLinkKey[])
    .filter((key) => settings[key])
    .map((key) => ({ icon: SOCIAL_ICONS[key], label: SOCIAL_LABELS[key], href: settings[key]! }));
}
