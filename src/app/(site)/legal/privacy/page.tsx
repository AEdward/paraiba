import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { privacyPolicy } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <LegalPageShell heading="Privacy Policy" body={privacyPolicy} />;
}
