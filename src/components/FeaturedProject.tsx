import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { statusColor, getShowcaseGradient, getEmbedUrl, getEmbedLabel } from "@/lib/projects";
import { StatusBadge } from "@/components/StatusBadge";
import { TiltCard } from "@/components/TiltCard";
import { DeviceMockup } from "@/components/DeviceMockup";
import { LiveBrowserPreview } from "@/components/LiveBrowserPreview";
import { FadeIn } from "@/components/FadeIn";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <FadeIn>
      <div className="flex items-center gap-2">
        <span
          className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: "var(--color-ember)" }}
        >
          Featured
        </span>
      </div>

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <StatusBadge status={project.status} size="lg" />
          <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
            {project.name}
          </h2>
          <p className="mt-3 text-lg opacity-70">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: "var(--surface)", color: "var(--ink)", opacity: 0.8 }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed opacity-75">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) shadow-[0_8px_24px_-8px_rgba(22,35,63,0.55)] transition-all hover:-translate-y-0.5"
              style={{ background: "var(--color-indigo)" }}
            >
              View case study <ArrowRight size={16} />
            </Link>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
              >
                Visit website <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        {(() => {
          const embedUrl = getEmbedUrl(project);
          return embedUrl ? (
            <LiveBrowserPreview url={embedUrl} label={getEmbedLabel(project)} />
          ) : (
            <TiltCard className="rounded-3xl" glowColor={statusColor[project.status]}>
              <DeviceMockup gradient={getShowcaseGradient(project.slug)} screenshot={project.screenshot} />
            </TiltCard>
          );
        })()}
      </div>
    </FadeIn>
  );
}
