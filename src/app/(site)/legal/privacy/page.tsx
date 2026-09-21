import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ComingSoon
      eyebrow="Legal"
      heading="Privacy Policy — coming soon."
      body="We're finalizing our privacy policy. If you have questions about how we handle data in the meantime, get in touch."
    />
  );
}
