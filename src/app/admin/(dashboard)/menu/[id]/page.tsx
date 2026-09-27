import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { NavItemForm } from "../NavItemForm";
import { updateNavItem } from "../actions";

export const metadata: Metadata = { title: "Edit Menu Link" };
export const dynamic = "force-dynamic";

export default async function EditNavItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.navItem.findUnique({ where: { id } });
  if (!item) notFound();

  const boundUpdate = updateNavItem.bind(null, item.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Edit menu link
      </h1>
      <div className="mt-8">
        <NavItemForm item={item} action={boundUpdate} submitLabel="Save changes" />
      </div>
    </div>
  );
}
