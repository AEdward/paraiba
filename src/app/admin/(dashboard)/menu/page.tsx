import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteButton } from "../DeleteButton";
import { deleteNavItem } from "./actions";

export const metadata: Metadata = { title: "Menu" };
export const dynamic = "force-dynamic";

const LOCATION_LABELS: Record<string, string> = {
  header: "Header only",
  footer: "Footer only",
  both: "Both",
};

export default async function AdminMenuPage() {
  const items = await db.navItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Menu
        </h1>
        <Link
          href="/admin/menu/new"
          className="font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Plus size={15} /> New link
        </Link>
      </div>

      <p className="mt-2 max-w-lg text-sm opacity-60">
        The header nav and footer links — choose where each one shows, group related links into a
        dropdown/column, or remove one entirely. The Products dropdown and Footer&apos;s Contact
        block are managed elsewhere (Products, Settings) since they&apos;re data-driven.
        A link to an unpublished page hides itself here automatically — no need to remove it by hand.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left opacity-60" style={{ borderColor: "var(--border-soft)" }}>
              <th className="px-4 py-3 font-medium">Label</th>
              <th className="px-4 py-3 font-medium">Link</th>
              <th className="px-4 py-3 font-medium">Show in</th>
              <th className="px-4 py-3 font-medium">Group</th>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b last:border-0" style={{ borderColor: "var(--border-soft)" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--ink)" }}>
                  {item.label}
                </td>
                <td className="px-4 py-3 opacity-70">{item.href}</td>
                <td className="px-4 py-3 opacity-70">{LOCATION_LABELS[item.location] ?? item.location}</td>
                <td className="px-4 py-3 opacity-70">{item.group ?? "—"}</td>
                <td className="px-4 py-3 opacity-70">{item.order}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/menu/${item.id}`} className="font-medium" style={{ color: "var(--color-teal)" }}>
                      Edit
                    </Link>
                    <DeleteButton action={deleteNavItem} id={item.id} label="link" />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center opacity-50">
                  No menu links yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
