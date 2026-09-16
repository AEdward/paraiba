import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMockup } from "@/components/DeviceMockup";
import { TiltCard } from "@/components/TiltCard";
import { StatusBadge } from "@/components/StatusBadge";
import { DeliverablesGrid } from "@/components/DeliverablesGrid";
import { CaseStudySections } from "@/components/CaseStudySections";
import { LiveBrowserPreview } from "@/components/LiveBrowserPreview";
import { getEmbedLabel, getEmbedUrl, getShowcaseGradient, statusColor } from "@/lib/projects";
import { getProject } from "@/lib/projects-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium opacity-70 hover:opacity-100"
          style={{ color: "var(--ink)" }}
        >
          <ArrowLeft size={14} /> All projects
        </Link>

        <div className="mt-8">
          <StatusBadge status={project.status} size="lg" />
        </div>
        <h1 className="font-display mt-3 text-4xl font-bold sm:text-5xl" style={{ color: "var(--ink)" }}>
          {project.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg opacity-70">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2">
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
      </FadeIn>

      <FadeIn delay={0.1}>
        {(() => {
          const embedUrl = getEmbedUrl(project);
          return embedUrl ? (
            <div className="mt-10">
              <LiveBrowserPreview url={embedUrl} label={getEmbedLabel(project)} />
            </div>
          ) : (
            <TiltCard className="mt-10 rounded-3xl" glowColor={statusColor[project.status]}>
              <DeviceMockup
                gradient={getShowcaseGradient(project.slug)}
                screenshot={project.screenshot}
              />
            </TiltCard>
          );
        })()}
      </FadeIn>

      <FadeIn delay={0.15}>
        <div
          className="mt-10 max-w-2xl rounded-2xl border p-8 shadow-[0_1px_2px_rgba(22,35,63,0.04),0_20px_36px_-16px_rgba(22,35,63,0.22)] backdrop-blur-md"
          style={{
            borderColor: "var(--border-soft)",
            background: "color-mix(in srgb, var(--surface) 80%, transparent)",
          }}
        >
          <p className="text-base leading-relaxed opacity-80">{project.description}</p>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream)"
            style={{ background: "var(--color-indigo)" }}
          >
            Visit website <ArrowUpRight size={16} />
          </a>
        )}

        {project.status === "archived" && !project.link && (
          <p className="mt-8 inline-flex items-center gap-2 text-sm opacity-50">
            <Lock size={14} /> Not published yet
          </p>
        )}
      </FadeIn>

      {project.deliverables && (
        <FadeIn delay={0.2}>
          <div className="mt-16">
            <h2 className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
              What We Built
            </h2>
            <div className="mt-6">
              <DeliverablesGrid text={project.deliverables} />
            </div>
          </div>
        </FadeIn>
      )}

      {project.caseStudy && (
        <div className="mt-16">
          <h2 className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
            Case Study
          </h2>
          <div className="mt-8 max-w-2xl">
            <CaseStudySections text={project.caseStudy} />
          </div>
        </div>
      )}
    </div>
  );
}
