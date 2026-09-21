import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <ComingSoon
      eyebrow="Legal"
      heading="Terms & Conditions — coming soon."
      body="We're finalizing our terms of service. If you have questions in the meantime, get in touch."
    />
  );
}
