import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <ComingSoon
      eyebrow="Resources"
      heading="Documentation and FAQs are on the way."
      body="Product guides, brochures, and answers to common questions will live here. Have a question now? Just get in touch."
    />
  );
}
