"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { JobBoardCard } from "@/components/JobBoardCard";
import { ETHIOPIA_REGIONS } from "@/lib/jobConstants";
import type { JobPosting } from "@/generated/prisma/client";

const TYPES = ["Full-time", "Part-time", "Contract"] as const;
const PAGE_SIZE = 9;
const MAX_EXPERIENCE = 10;

const selectClass =
  "rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const selectStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--ink)",
};

export function JobBoard({ jobs }: { jobs: JobPosting[] }) {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [experienceMax, setExperienceMax] = useState(3);
  const [includeSenior, setIncludeSenior] = useState(false);
  const [page, setPage] = useState(1);

  const titles = useMemo(() => [...new Set(jobs.map((j) => j.title))].sort(), [jobs]);
  const categories = useMemo(() => [...new Set(jobs.map((j) => j.category))].sort(), [jobs]);
  const cities = useMemo(() => [...new Set(jobs.map((j) => j.location))].sort(), [jobs]);

  function toggleType(type: string) {
    setPage(1);
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (query && !job.title.toLowerCase().includes(query) && !job.description.toLowerCase().includes(query)) {
        return false;
      }
      if (title && job.title !== title) return false;
      if (category && job.category !== category) return false;
      if (city && job.location !== city) return false;
      if (region !== "All" && job.region !== region) return false;
      if (selectedTypes.size > 0 && !selectedTypes.has(job.type)) return false;
      const withinRange = job.minExperienceYears <= experienceMax;
      const seniorRole = job.maxExperienceYears > MAX_EXPERIENCE;
      if (!withinRange && !(includeSenior && seniorRole)) return false;
      return true;
    });
  }, [jobs, search, title, category, city, region, selectedTypes, experienceMax, includeSenior]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} style={{ color: "var(--color-teal)" }} />
          <h3 className="font-display text-sm font-bold" style={{ color: "var(--ink)" }}>
            Additional Filters
          </h3>
        </div>

        <div>
          <p className="text-xs font-semibold opacity-60">Experience (years)</p>
          <input
            type="range"
            min={0}
            max={MAX_EXPERIENCE}
            value={experienceMax}
            onChange={(e) => {
              setPage(1);
              setExperienceMax(Number(e.target.value));
            }}
            className="mt-3 w-full accent-(--color-teal)"
          />
          <div className="mt-1 flex items-center justify-between text-xs opacity-60">
            <span>0</span>
            <span>Up to {experienceMax} years</span>
          </div>
          <label className="mt-2 flex items-center gap-2 text-xs opacity-70">
            <input
              type="checkbox"
              checked={includeSenior}
              onChange={(e) => {
                setPage(1);
                setIncludeSenior(e.target.checked);
              }}
            />
            Also show {MAX_EXPERIENCE}+ years roles
          </label>
        </div>

        <div>
          <p className="text-xs font-semibold opacity-60">Type</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {TYPES.map((type) => {
              const active = selectedTypes.has(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{
                    borderColor: active ? "var(--color-teal)" : "var(--border-soft)",
                    background: active ? "rgba(22,207,192,0.12)" : "transparent",
                    color: active ? "var(--color-teal)" : "var(--ink)",
                  }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold opacity-60">Regions</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setPage(1);
                setRegion("All");
              }}
              className="rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{
                borderColor: region === "All" ? "var(--color-teal)" : "var(--border-soft)",
                background: region === "All" ? "rgba(22,207,192,0.12)" : "transparent",
                color: region === "All" ? "var(--color-teal)" : "var(--ink)",
              }}
            >
              All
            </button>
            {ETHIOPIA_REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setPage(1);
                  setRegion(r);
                }}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                style={{
                  borderColor: region === r ? "var(--color-teal)" : "var(--border-soft)",
                  background: region === r ? "rgba(22,207,192,0.12)" : "transparent",
                  color: region === r ? "var(--color-teal)" : "var(--ink)",
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap gap-3">
          <div
            className="flex flex-1 min-w-[200px] items-center gap-2 rounded-lg border px-3 py-2.5"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <Search size={15} className="opacity-50" />
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search roles..."
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "var(--ink)" }}
            />
          </div>
          <select
            value={title}
            onChange={(e) => {
              setPage(1);
              setTitle(e.target.value);
            }}
            className={selectClass}
            style={selectStyle}
          >
            <option value="">Select Position</option>
            {titles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className={selectClass}
            style={selectStyle}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => {
              setPage(1);
              setCity(e.target.value);
            }}
            className={selectClass}
            style={selectStyle}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {category && (
          <div
            className="mt-5 rounded-xl border p-4"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <p className="font-display text-sm font-bold" style={{ color: "var(--ink)" }}>
              {category} jobs
            </p>
            <p className="mt-1 text-xs opacity-60">
              Open roles at Paraiba Technology PLC in the {category} category.
            </p>
          </div>
        )}

        <p className="mt-5 text-sm opacity-60">
          Showing {paged.length} of {filtered.length} posts
        </p>

        {paged.length > 0 ? (
          <div className="mt-4 flex flex-col gap-5">
            {paged.map((job) => (
              <JobBoardCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center opacity-60">No roles match these filters right now.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className="h-8 w-8 rounded-full text-sm font-semibold"
                style={{
                  background: n === page ? "var(--color-indigo)" : "transparent",
                  color: n === page ? "var(--color-cream)" : "var(--ink)",
                  border: n === page ? "none" : "1px solid var(--border-soft)",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
