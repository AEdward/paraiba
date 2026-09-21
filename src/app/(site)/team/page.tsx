import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Leadership & Team" };

export default function TeamPage() {
  return (
    <ComingSoon
      eyebrow="Company"
      heading="Meet the team — page coming soon."
      body="We're putting together a proper introduction to the people behind Paraiba. Check back soon."
    />
  );
}
