import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Compass, MapPin, Rocket } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { TiltCard } from "@/components/TiltCard";
import { getOpenJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Careers",
  description: "Build technology with Ethiopian brilliance at Paraiba Technology PLC.",
};

export const dynamic = "force-dynamic";

const perks = [
  {
    icon: Rocket,
    title: "Build things that ship",
    description: "Real products for real users, not exercises that live in a drawer.",
  },
  {
    icon: Compass,
    title: "Room to shape direction",
    description: "We're small enough that your judgment changes what gets built and how.",
  },
  {
    icon: Briefcase,
    title: "Work across the portfolio",
    description: "Move between projects and problems instead of one narrow lane forever.",
  },
];

export default async function CareersPage() {
  const jobs = await getOpenJobs();

  return (
    <>
      <section className="relative overflow-hidden">
        <GradientMesh />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-teal)" }}
            >
              Careers
            </p>
            <h1
              className="font-display mx-auto mt-4 max-w-2xl text-4xl leading-tight font-bold sm:text-5xl"
              style={{ color: "var(--ink)" }}
            >
              Build technology with Ethiopian brilliance.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg opacity-75">
              We&apos;re a small team building technology, products, and ventures out of Addis
              Ababa. If that sounds like your kind of work, we&apos;d like to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <FadeIn>
            <h2 className="font-display text-2xl font-bold" style={{ color: "var(--ink)" }}>
              Why Paraiba
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <FadeIn key={perk.title} delay={i * 0.08}>
                  <div
                    className="flex h-full flex-col gap-3 rounded-2xl border p-6"
                    style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
                  >
                    <Icon size={22} style={{ color: "var(--color-ember)" }} />
                    <h3 className="font-display text-base font-bold" style={{ color: "var(--ink)" }}>
                      {perk.title}
                    </h3>
                    <p className="text-sm opacity-70">{perk.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <FadeIn>
            <h2 className="font-display text-center text-2xl font-bold" style={{ color: "var(--ink)" }}>
              Open positions
            </h2>
          </FadeIn>

          {jobs.length > 0 ? (
            <div className="mt-10 flex flex-col gap-4">
              {jobs.map((job, i) => (
                <FadeIn key={job.id} delay={i * 0.06}>
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
                        <Link
                          href={`/contact?role=${encodeURIComponent(job.title)}`}
                          className="font-display inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-(--color-cream)"
                          style={{ background: "var(--color-indigo)" }}
                        >
                          Apply <ArrowRight size={14} />
                        </Link>
                      </div>
                      <p className="mt-3 text-sm whitespace-pre-wrap opacity-75">{job.description}</p>
                    </div>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn delay={0.1}>
              <div className="mt-10 text-center">
                <p className="mx-auto max-w-md opacity-70">
                  We don&apos;t have any open roles posted right now. When we do, they&apos;ll
                  show up here — but we&apos;re always glad to hear from people who want to
                  build with us.
                </p>
                <Link
                  href="/contact"
                  className="font-display mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) shadow-[0_8px_24px_-8px_rgba(22,35,63,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(22,35,63,0.6)]"
                  style={{ background: "var(--color-indigo)" }}
                >
                  Get in touch <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
