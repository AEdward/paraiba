import { Gem, Lightbulb, ShieldCheck, Sparkles, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const values: Value[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Build useful things, not technology for its own sake.",
  },
  {
    icon: Sparkles,
    title: "Clarity",
    description: "Make complex technology understandable and usable.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Prioritize stable products, security and dependable delivery.",
  },
  {
    icon: Gem,
    title: "Craft",
    description: "Care about details, design and the quality of the final experience.",
  },
  {
    icon: Target,
    title: "Impact",
    description: "Measure success by the value technology creates.",
  },
];
