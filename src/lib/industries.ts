import { Clapperboard, Hotel, Landmark, Sprout, Truck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Industry = {
  icon: LucideIcon;
  label: string;
};

// Verticals we build for — edit freely as the portfolio's real focus areas become clear.
export const industries: Industry[] = [
  { icon: Landmark, label: "Fintech & Banking" },
  { icon: Wallet, label: "Digital Payments" },
  { icon: Hotel, label: "Hospitality & Travel" },
  { icon: Truck, label: "Transportation & Logistics" },
  { icon: Clapperboard, label: "Entertainment & Media" },
  { icon: Sprout, label: "Agriculture" },
];
