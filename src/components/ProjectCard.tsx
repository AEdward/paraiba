import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { statusColor, type Project } from "@/lib/projects";
import { TiltCard } from "@/components/TiltCard";
import { StatusBadge } from "@/components/StatusBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard glowColor={statusColor[project.status]} className="rounded-2xl">
      <Link
        href={`/products/${project.slug}`}
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_1px_2px_rgba(22,35,63,0.04),0_16px_28px_-12px_rgba(22,35,63,0.18)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(22,35,63,0.06),0_24px_40px_-14px_rgba(22,35,63,0.28)]"
        style={{
          borderColor: "var(--border-soft)",
          background: "color-mix(in srgb, var(--surface) 78%, transparent)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${statusColor[project.status]}, transparent)`,
          }}
        />
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
            </div>
            {project.status === "archived" ? (
              <Lock size={16} className="opacity-40" style={{ color: "var(--ink)" }} />
            ) : (
              <ArrowUpRight
                size={18}
                className="opacity-40 transition-all group-hover/tilt:opacity-100 group-hover/tilt:translate-x-0.5 group-hover/tilt:-translate-y-0.5"
                style={{ color: "var(--ink)" }}
              />
            )}
          </div>
          <h3 className="font-display mt-4 text-xl font-bold" style={{ color: "var(--ink)" }}>
            {project.name}
          </h3>
          <p className="mt-2 text-sm opacity-70">{project.tagline}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ background: "var(--background)", color: "var(--foreground)", opacity: 0.75 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </TiltCard>
  );
}
