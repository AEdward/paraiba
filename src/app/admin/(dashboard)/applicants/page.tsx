import type { Metadata } from "next";
import { db } from "@/lib/db";
import { APPLICATION_STATUSES, APPLICATION_STATUS_LABELS } from "@/lib/applications";
import { DeleteButton } from "../DeleteButton";
import { StatusSelect } from "./StatusSelect";
import { deleteApplication } from "./actions";

export const metadata: Metadata = { title: "Applicants" };
export const dynamic = "force-dynamic";

const selectClass = "rounded-lg border px-3 py-2 text-sm outline-none focus:border-(--color-teal)";
const selectStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};

export default async function AdminApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string; status?: string; q?: string }>;
}) {
  const { jobId = "", status = "", q = "" } = await searchParams;

  const [jobs, applications] = await Promise.all([
    db.jobPosting.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } }),
    db.jobApplication.findMany({
      where: {
        ...(jobId ? { jobId } : {}),
        ...(status ? { status } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        job: { select: { title: true } },
        documents: { select: { id: true, fileName: true }, orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
        Applicants
      </h1>
      <p className="mt-1 text-sm opacity-60">Applications submitted from the /careers page.</p>

      <form method="get" className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="jobId" className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Job
          </label>
          <select id="jobId" name="jobId" defaultValue={jobId} className={selectClass} style={selectStyle}>
            <option value="">All jobs</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Status
          </label>
          <select id="status" name="status" defaultValue={status} className={selectClass} style={selectStyle}>
            <option value="">All statuses</option>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {APPLICATION_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q" className="mb-1.5 block text-xs font-medium" style={{ color: "var(--ink)" }}>
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Name or email"
            className={selectClass}
            style={selectStyle}
          />
        </div>
        <button
          type="submit"
          className="font-display rounded-lg px-4 py-2 text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-indigo)" }}
        >
          Filter
        </button>
        {(jobId || status || q) && (
          <a href="/admin/applicants" className="text-sm font-medium" style={{ color: "var(--color-teal)" }}>
            Clear
          </a>
        )}
      </form>

      <div className="mt-8 flex flex-col gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl border p-5"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold" style={{ color: "var(--ink)" }}>
                  {app.name}
                </p>
                <a href={`mailto:${app.email}`} className="text-sm opacity-60 hover:opacity-100">
                  {app.email}
                </a>
                {app.phone && <span className="ml-2 text-sm opacity-60">· {app.phone}</span>}
                <p className="mt-1 text-xs opacity-50">
                  Applied for <strong>{app.job.title}</strong> ·{" "}
                  {new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(
                    app.createdAt,
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {app.resumeUrl && (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium"
                    style={{ color: "var(--color-teal)" }}
                  >
                    Resume link
                  </a>
                )}
                <StatusSelect id={app.id} status={app.status} />
                <DeleteButton action={deleteApplication} id={app.id} label="application" />
              </div>
            </div>
            {app.documents.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {app.documents.map((doc) => (
                  <a
                    key={doc.id}
                    href={`/api/admin/documents/${doc.id}`}
                    className="rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor: "var(--border-soft)", color: "var(--color-teal)" }}
                  >
                    {doc.fileName}
                  </a>
                ))}
              </div>
            )}
            {app.coverLetter && (
              <p className="mt-3 text-sm whitespace-pre-wrap opacity-80">{app.coverLetter}</p>
            )}
          </div>
        ))}

        {applications.length === 0 && (
          <div
            className="rounded-2xl border p-8 text-center opacity-50"
            style={{ borderColor: "var(--border-soft)" }}
          >
            No applications match these filters.
          </div>
        )}
      </div>
    </div>
  );
}
