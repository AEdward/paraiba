import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { statusColor, type Project } from "@/lib/projects";
import { TiltCard } from "@/components/TiltCard";
import { StatusBadge } from "@/components/StatusBadge";

export function ProjectCard({
  project,
  logoUrl,
  accentColor,
}: {
  project: Project;
  // When this product also has its own bespoke ProductSite, its real logo
  // and brand color take over the card's mark and glow — otherwise it falls
  // back to a lettermark and the generic status color, same as before.
  logoUrl?: string;
  accentColor?: string;
}) {
  const accent = accentColor ?? statusColor[project.status];

  return (
    <TiltCard glowColor={accent} className="rounded-2xl">
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
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: accent }}
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-2"
              style={{
                borderColor: "var(--border-soft)",
                background: logoUrl ? "#ffffff" : `color-mix(in srgb, ${accent} 14%, transparent)`,
              }}
            >
              {logoUrl ? (
                <Image src={logoUrl} alt="" width={48} height={48} style={{ objectFit: "contain", width: "100%", height: "100%" }} unoptimized />
              ) : (
                <span className="font-display text-2xl font-bold" style={{ color: accent }}>
                  {project.name.charAt(0)}
                </span>
              )}
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
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
          </div>
          <h3 className="font-display mt-3 text-xl font-bold" style={{ color: "var(--ink)" }}>
            {project.name}
          </h3>
          <p className="mt-2 text-sm opacity-70">{project.tagline}</p>
        </div>
        <div className="relative mt-6 flex flex-wrap gap-2">
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
