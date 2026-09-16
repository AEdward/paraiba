import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteButton } from "../DeleteButton";
import { deletePartner } from "./actions";

export const metadata: Metadata = { title: "Partners" };
export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await db.partner.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Partners
        </h1>
        <Link
          href="/admin/partners/new"
          className="font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Plus size={15} /> New partner
        </Link>
      </div>

      <p className="mt-2 max-w-lg text-sm opacity-60">
        Shown as a logo bar on the homepage. Only real partners belong here — the section
        disappears from the site until at least one exists.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left opacity-60" style={{ borderColor: "var(--border-soft)" }}>
              <th className="px-4 py-3 font-medium">Logo</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Website</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className="border-b last:border-0" style={{ borderColor: "var(--border-soft)" }}>
                <td className="px-4 py-3">
                  {partner.logoUrl ? (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      width={80}
                      height={28}
                      unoptimized
                      className="h-7 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-xs opacity-40">—</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--ink)" }}>
                  {partner.name}
                </td>
                <td className="px-4 py-3 opacity-70">{partner.website ?? "—"}</td>
                <td className="px-4 py-3 opacity-70">{partner.order}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/partners/${partner.id}`}
                      className="font-medium"
                      style={{ color: "var(--color-teal)" }}
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deletePartner} id={partner.id} label="partner" />
                  </div>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center opacity-50">
                  No partners yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
