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
          className="inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "var(--color-teal)" }}
        >
          <Layers size={14} /> Manage mini-site pages
        </Link>
      </div>
      <div className="mt-8">
        <ProjectForm project={project} action={boundUpdate} submitLabel="Save changes" />
      </div>
    </div>
  );
}
