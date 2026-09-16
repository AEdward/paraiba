import { Accessibility, Lightbulb, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "We build systems people can rely on, and relationships that hold up over time.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "New beginnings are the point. We look for better ways to build, not just familiar ones.",
  },
  {
    icon: Sparkles,
    title: "Impact",
    description: "We measure our work by what it changes for the people and businesses that use it.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    description: "Good technology works for everyone it's meant for, not just the easiest users to reach.",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "We start from the person on the other end of the product, every time.",
  },
];
