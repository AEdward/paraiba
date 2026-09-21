import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Solutions" };

export default function SolutionsPage() {
  return (
    <ComingSoon
      eyebrow="Solutions"
      heading="Industry solutions, coming soon."
      body="Dedicated pages for each industry we serve — education, healthcare, hospitality, and more — are on the way. In the meantime, take a look at our products or get in touch to talk about your industry."
    />
  );
}
