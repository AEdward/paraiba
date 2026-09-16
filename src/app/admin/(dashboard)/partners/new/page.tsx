import type { Metadata } from "next";
import { PartnerForm } from "../PartnerForm";
import { createPartner } from "../actions";

export const metadata: Metadata = { title: "New Partner" };

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        New partner
      </h1>
      <div className="mt-8">
        <PartnerForm action={createPartner} submitLabel="Create partner" />
      </div>
    </div>
  );
}
