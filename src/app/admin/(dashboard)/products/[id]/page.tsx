import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layers } from "lucide-react";
import { db } from "@/lib/db";
import { ProjectForm } from "../ProjectForm";
import { updateProject } from "../actions";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, project.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Edit product
        </h1>
        <Link
          href={`/admin/products/${project.id}/pages`}
          className="font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Layers size={15} /> Manage mini-site pages
        </Link>
      </div>
      <p className="mt-1 text-sm opacity-60">
        This form is the product&apos;s data (name, tagline, status, etc.) and its mini-site
        settings (subdomain, colors). Its actual Home/Features/Pricing/… pages are built
        separately — use the button above.
      </p>
      <div className="mt-8">
        <ProjectForm project={project} action={boundUpdate} submitLabel="Save changes" />
      </div>
    </div>
  );
}
