import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { DeleteButton } from "../DeleteButton";
import { deleteJob } from "./actions";

export const metadata: Metadata = { title: "Careers" };
export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const jobs = await db.jobPosting.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
          Careers
        </h1>
        <Link
          href="/admin/careers/new"
          className="font-display inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          <Plus size={15} /> New posting
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-soft)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left opacity-60" style={{ borderColor: "var(--border-soft)" }}>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Applicants</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b last:border-0" style={{ borderColor: "var(--border-soft)" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--ink)" }}>
                  {job.title}
                </td>
                <td className="px-4 py-3 opacity-70">{job.location}</td>
                <td className="px-4 py-3 opacity-70">{job.status}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/applicants?jobId=${job.id}`}
                    className="font-medium"
                    style={{ color: "var(--color-teal)" }}
                  >
                    {job._count.applications}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/careers/${job.id}`}
                      className="font-medium"
                      style={{ color: "var(--color-teal)" }}
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteJob} id={job.id} label="posting" />
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center opacity-50">
                  No postings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
