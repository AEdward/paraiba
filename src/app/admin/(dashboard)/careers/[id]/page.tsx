import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { JobForm } from "../JobForm";
import { updateJob } from "../actions";

export const metadata: Metadata = { title: "Edit Posting" };

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await db.jobPosting.findUnique({ where: { id } });
  if (!job) notFound();

  const boundUpdate = updateJob.bind(null, job.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Edit posting
        </h1>
        <Link
          href={`/admin/applicants?jobId=${job.id}`}
          className="text-sm font-medium"
          style={{ color: "var(--color-teal)" }}
        >
          View applicants
        </Link>
      </div>
      <div className="mt-8">
        <JobForm job={job} action={boundUpdate} submitLabel="Save changes" />
      </div>
    </div>
  );
}
