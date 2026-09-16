import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { IndustriesGrid } from "@/components/IndustriesGrid";
import { Hero3D } from "@/components/three/Hero3D";
import { getProjects } from "@/lib/projects-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientMesh />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pt-20 pb-12 sm:pt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pb-20">
          <div>
            <FadeIn>
              <p
                className="font-display text-sm font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-ember)" }}
              >
                Technology · Products · Software
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="font-display mt-6 max-w-xl text-4xl leading-tight font-bold sm:text-6xl"
                style={{ color: "var(--ink)" }}
              >
                Technology with Ethiopian brilliance.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-xl text-lg opacity-75">
                Paraiba Technology PLC builds practical, reliable and beautiful digital
                products — modern technology without unnecessary complexity.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) shadow-[0_8px_24px_-8px_rgba(22,35,63,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(22,35,63,0.6)]"
                  style={{ background: "var(--color-indigo)" }}
                >
                  View our projects <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="font-display inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all hover:-translate-y-0.5"
                  style={{ borderColor: "var(--border-soft)", color: "var(--ink)", background: "color-mix(in srgb, var(--surface) 55%, transparent)" }}
                >
                  Get in touch
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="mt-4 text-xs opacity-40 lg:hidden">Drag the mark to spin it.</p>
            </FadeIn>
          </div>
          <FadeIn delay={0.15} className="relative">
            <Hero3D />
            <p className="mt-1 hidden text-center text-xs opacity-40 lg:block">
              Drag to spin the mark
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <FadeIn>
            <h2
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-teal)" }}
            >
              Our Story
            </h2>
          </FadeIn>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0.05}>
              <p className="max-w-md text-base opacity-80">
                The name <strong style={{ color: "var(--ink)" }}>Paraiba</strong> is inspired
                by the vivid blue and blue-green brilliance of Paraíba tourmaline — a
                metaphor for clarity, rarity, energy and brilliance, translated into
                technology.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="max-w-md text-base opacity-80">
                We&apos;re Ethiopian in origin and global in ambition: bold ideas, precise
                execution, and products built to stand out — practical, reliable and
                beautiful technology that helps people and businesses operate, grow and
                connect.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-ember)" }}
            >
              Industries
            </p>
            <h2 className="font-display mt-4 text-2xl font-bold" style={{ color: "var(--ink)" }}>
              Where we build.
            </h2>
          </FadeIn>
          <div className="mt-10">
            <IndustriesGrid />
          </div>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-4">
            <FadeIn>
              <h2 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
                What we&apos;re building
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link
                href="/projects"
                className="font-display hidden items-center gap-1 text-sm font-semibold sm:inline-flex"
                style={{ color: "var(--color-teal)" }}
              >
                View all <ArrowRight size={14} />
              </Link>
            </FadeIn>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t" style={{ borderColor: "var(--border-soft)" }}>
        <GradientMesh />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold" style={{ color: "var(--ink)" }}>
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-md opacity-70">
              We&apos;re always looking for the next new beginning. Tell us what
              you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="font-display mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) shadow-[0_8px_24px_-8px_rgba(193,86,46,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(193,86,46,0.6)]"
              style={{ background: "var(--color-ember)" }}
            >
              Start a conversation <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
