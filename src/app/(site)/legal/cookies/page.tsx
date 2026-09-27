import type { Metadata } from "next";
import { LegalPageShell } from "@/components/LegalPageShell";
import { cookiePolicy } from "@/lib/legalContent";

export const metadata: Metadata = { title: "Cookie Policy" };
export const dynamic = "force-dynamic";

export default function CookiesPage() {
  return <LegalPageShell heading="Cookie Policy" body={cookiePolicy} />;
}
