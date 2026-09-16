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
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com/paraiba" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/paraiba" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/company/paraiba" },
  { icon: X, label: "X", href: "https://x.com/paraiba" },
];
