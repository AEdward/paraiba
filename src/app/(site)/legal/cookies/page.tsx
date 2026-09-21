import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <ComingSoon
      eyebrow="Legal"
      heading="Cookie Policy — coming soon."
      body="We're finalizing our cookie policy. If you have questions in the meantime, get in touch."
    />
  );
}
