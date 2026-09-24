import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { termsAndConditions } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return <LegalPageShell heading="Terms & Conditions" body={termsAndConditions} />;
}
