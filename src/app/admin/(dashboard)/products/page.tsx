import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteButton } from "../DeleteButton";
import { deleteProject } from "./actions";

export const metadata: Metadata = { title: "Products" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Plus size={15} /> New product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left opacity-60" style={{ borderColor: "var(--border-soft)" }}>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b last:border-0" style={{ borderColor: "var(--border-soft)" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--ink)" }}>
                  {project.name}
                </td>
                <td className="px-4 py-3 opacity-70">{project.status}</td>
                <td className="px-4 py-3 opacity-70">/products/{project.slug}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/products/${project.id}`}
                      className="font-medium"
                      style={{ color: "var(--color-teal)" }}
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteProject} id={project.id} label="product" />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center opacity-50">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
