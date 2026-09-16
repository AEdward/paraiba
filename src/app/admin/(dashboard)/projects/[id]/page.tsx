import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProjectForm } from "../ProjectForm";
import { updateProject } from "../actions";

export const metadata: Metadata = { title: "Edit Project" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Edit project
      </h1>
      <div className="mt-8">
        <ProjectForm project={project} action={boundUpdate} submitLabel="Save changes" />
      </div>
    </div>
  );
}
