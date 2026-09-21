import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <ComingSoon
      eyebrow="Services"
      heading="Our services page is coming soon."
      body="Web and mobile development, custom software, design, cloud, and integrations — full details are on the way. Reach out and we'll talk through what you need in the meantime."
    />
  );
}
