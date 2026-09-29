import Link from "next/link";
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import type { JobPosting } from "@/generated/prisma/client";

export function JobCard({ job }: { job: JobPosting }) {
  return (
    <Link
      href={`/careers/${job.id}`}
      className="block rounded-2xl border p-6 transition-colors hover:border-(--color-teal)"
      style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "rgba(22,207,192,0.12)", color: "var(--color-teal)" }}
            >
              {job.category}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-xs font-semibold"
              style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
            >
              {job.level}
            </span>
          </div>

          <h3 className="font-display mt-3 text-lg font-bold" style={{ color: "var(--color-teal)" }}>
            {job.title}
          </h3>
          <p className="mt-2 text-sm opacity-70">{job.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm opacity-60">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={14} /> {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {job.workMode}
            </span>
          </div>
        </div>

        <span
          className="font-display inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold"
          style={{ color: "var(--color-teal)" }}
        >
          View role <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
