import type { ComponentType } from "react";
import { X } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, type IconProps } from "@/components/icons/SocialIcons";

export type SocialLink = {
  icon: ComponentType<IconProps>;
  label: string;
  href: string;
};

// Placeholder handles — swap in the real profile URLs when they exist.
export const socialLinks: SocialLink[] = [
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com/meskeday" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/meskeday" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/company/meskeday" },
  { icon: X, label: "X", href: "https://x.com/meskeday" },
];
