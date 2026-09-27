import type { Metadata } from "next";
import { JobForm } from "../JobForm";
import { createJob } from "../actions";

export const metadata: Metadata = { title: "New Posting" };
export const dynamic = "force-dynamic";

export default function NewJobPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        New posting
      </h1>
      <div className="mt-8">
        <JobForm action={createJob} submitLabel="Create posting" />
      </div>
    </div>
  );
}
