import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Our Work" };

export default function WorkPage() {
  return (
    <ComingSoon
      eyebrow="Work"
      heading="Our portfolio is coming soon."
      body="A full showcase of projects and case studies is on the way. Until then, our Products page is the best look at what we're building."
    />
  );
}
