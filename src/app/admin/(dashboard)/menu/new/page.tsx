import type { Metadata } from "next";
import { NavItemForm } from "../NavItemForm";
import { createNavItem } from "../actions";

export const metadata: Metadata = { title: "New Menu Link" };

export default function NewNavItemPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        New menu link
      </h1>
      <div className="mt-8">
        <NavItemForm action={createNavItem} submitLabel="Create link" />
      </div>
    </div>
  );
}
