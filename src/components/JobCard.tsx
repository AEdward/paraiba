"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { ApplicationForm } from "@/components/ApplicationForm";
import type { JobPosting } from "@/generated/prisma/client";

export function JobCard({ job }: { job: JobPosting }) {
  const [open, setOpen] = useState(false);

  return (
    <TiltCard glowColor="var(--color-teal)" className="rounded-2xl">
      <div
        className="rounded-2xl border p-6"
        style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
              {job.title}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-sm opacity-60">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} /> {job.location}
              </span>
              <span>{job.type}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="font-display inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
            style={{ background: "var(--color-indigo)" }}
          >
            {open ? "Close" : "Apply"} <ArrowRight size={14} className={open ? "rotate-90 transition-transform" : "transition-transform"} />
          </button>
        </div>
        <p className="mt-3 text-sm whitespace-pre-wrap opacity-75">{job.description}</p>

        {open && <ApplicationForm jobId={job.id} jobTitle={job.title} />}
      </div>
    </TiltCard>
  );
}
