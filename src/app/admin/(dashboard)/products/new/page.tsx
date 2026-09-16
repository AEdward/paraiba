import type { Metadata } from "next";
import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";

export const metadata: Metadata = { title: "New Product" };

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        New product
      </h1>
      <div className="mt-8">
        <ProjectForm action={createProject} submitLabel="Create product" />
      </div>
    </div>
  );
}
