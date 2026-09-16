import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PartnerForm } from "../PartnerForm";
import { updatePartner } from "../actions";

export const metadata: Metadata = { title: "Edit Partner" };

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await db.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  const boundUpdate = updatePartner.bind(null, partner.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Edit partner
      </h1>
      <div className="mt-8">
        <PartnerForm partner={partner} action={boundUpdate} submitLabel="Save changes" />
      </div>
    </div>
  );
}
