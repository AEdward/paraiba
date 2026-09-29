"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, Briefcase, Clock, Eye, MapPin, Share2, Users } from "lucide-react";
import type { JobPosting } from "@/generated/prisma/client";

const SAVED_JOBS_KEY = "paraiba_saved_jobs";

function readSavedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSavedIds(ids: Set<string>) {
  try {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable (private browsing, etc.) — saving is best-effort only
  }
}

function formatCount(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

function timeLeftLabel(expiresAt: Date | null, createdAt: Date): string {
  if (!expiresAt) {
    const days = Math.floor((Date.now() - createdAt.getTime()) / 86_400_000);
    if (days <= 0) return "Posted today";
    return `Posted ${days} day${days === 1 ? "" : "s"} ago`;
  }
  const ms = expiresAt.getTime() - Date.now();
  if (ms <= 0) return "Closing soon";
  const hours = Math.round(ms / 3_600_000);
  if (hours < 24) return `About ${hours} hour${hours === 1 ? "" : "s"} left`;
  const days = Math.round(hours / 24);
  return `About ${days} day${days === 1 ? "" : "s"} left`;
}

export function JobBoardCard({ job }: { job: JobPosting }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSavedIds().has(job.id));
  }, [job.id]);

  function toggleSave() {
    const ids = readSavedIds();
    if (ids.has(job.id)) ids.delete(job.id);
    else ids.add(job.id);
    writeSavedIds(ids);
    setSaved(ids.has(job.id));
  }

  async function share() {
    const url = `${window.location.origin}/careers/${job.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: job.title, url });
      } catch {
        // user cancelled the share sheet — nothing to do
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard unavailable — silently ignore, sharing is a nice-to-have
    }
  }

  const experienceLabel =
    job.minExperienceYears === job.maxExperienceYears
      ? `${job.minExperienceYears} years`
      : `${job.minExperienceYears} - ${job.maxExperienceYears} years`;

  return (
    <div
      className="flex flex-col rounded-2xl border p-5"
      style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium opacity-60">
          <Clock size={12} /> {timeLeftLabel(job.expiresAt, job.createdAt)}
        </span>
        <button
          type="button"
          onClick={toggleSave}
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
          style={{ borderColor: "var(--border-soft)", color: saved ? "var(--color-teal)" : "var(--ink)" }}
        >
          <Bookmark size={12} fill={saved ? "var(--color-teal)" : "none"} /> {saved ? "Saved" : "Save"}
        </button>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl"
          style={{ background: "var(--background)" }}
        >
          <Image src="/paraiba-symbol.png" alt="" width={28} height={28} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base leading-snug font-bold" style={{ color: "var(--ink)" }}>
            {job.title}
          </h3>
          <p className="mt-0.5 text-xs opacity-60">Paraiba Technology PLC</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5 text-sm opacity-70">
        <span className="inline-flex items-center gap-1.5">
          <Briefcase size={13} /> {job.category}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={13} /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock size={13} /> {experienceLabel}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users size={13} /> {job.positions} position{job.positions === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-3">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: "rgba(22,207,192,0.12)", color: "var(--color-teal)" }}
        >
          {job.type}
        </span>
      </div>

      <p className="mt-4 line-clamp-2 flex-1 border-t pt-4 text-sm opacity-70" style={{ borderColor: "var(--border-soft)" }}>
        {job.description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/careers/${job.id}`}
          className="font-display flex-1 rounded-full border px-4 py-2 text-center text-sm font-semibold"
          style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
        >
          Read More
        </Link>
        <Link
          href={`/careers/${job.id}#apply`}
          className="font-display flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-(--color-cream)"
          style={{ background: "var(--color-teal)" }}
        >
          Apply Now
        </Link>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs opacity-50">
        <span className="inline-flex items-center gap-1">
          <Eye size={12} /> {formatCount(job.viewCount)}
        </span>
        <button type="button" onClick={share} aria-label="Share this role">
          <Share2 size={13} />
        </button>
      </div>
    </div>
  );
}
