import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, Clock, MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ApplicationForm } from "@/components/ApplicationForm";
import { getOpenJob, splitLines, splitTags } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await getOpenJob(id);
  if (!job) return {};
  return { title: job.title, description: job.description };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getOpenJob(id);
  if (!job) notFound();

  const responsibilities = splitLines(job.responsibilities);
  const niceToHave = splitLines(job.niceToHave);
  const techStack = splitTags(job.techStack);
  const postedDate = new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(job.createdAt);

  return (
    <div className="paraiba-light-section">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-sm font-medium opacity-70 hover:opacity-100"
              style={{ color: "var(--ink)" }}
            >
              <ArrowLeft size={14} /> All open roles
            </Link>
            <div className="flex items-center gap-2">
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
          </div>

          <h1 className="font-display mt-6 text-3xl leading-tight font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
            {job.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base opacity-70">{job.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm opacity-60">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={14} /> {job.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} /> {job.workMode}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} /> Posted {postedDate}
            </span>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <FadeIn delay={0.05} className="lg:col-span-2">
            <div className="flex flex-col gap-10">
              <section>
                <h2 className="font-display text-xl font-bold" style={{ color: "var(--ink)" }}>
                  About the role
                </h2>
                <p className="mt-3 leading-relaxed opacity-75">{job.aboutRole || job.description}</p>
              </section>

              {responsibilities.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold" style={{ color: "var(--ink)" }}>
                    What you&apos;ll do
                  </h2>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 opacity-75">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: "var(--color-teal)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {niceToHave.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-bold" style={{ color: "var(--ink)" }}>
                    Nice to have
                  </h2>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {niceToHave.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 opacity-75">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 opacity-60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section id="apply">
                <h2 className="font-display text-xl font-bold" style={{ color: "var(--ink)" }}>
                  How to apply
                </h2>
                {job.howToApply && <p className="mt-3 leading-relaxed opacity-75">{job.howToApply}</p>}
                <div
                  className="mt-5 rounded-2xl border p-6"
                  style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
                >
                  <ApplicationForm jobId={job.id} jobTitle={job.title} />
                </div>
              </section>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              className="sticky top-24 rounded-2xl border p-6"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
            >
              <p className="font-display text-xs font-bold tracking-[0.15em] uppercase opacity-60">
                Role at a glance
              </p>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                {[
                  ["Department", job.category],
                  ["Level", job.level],
                  ["Type", job.type],
                  ["Location", job.location],
                  ["Mode", job.workMode],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="opacity-60">{label}</dt>
                    <dd className="font-medium" style={{ color: "var(--ink)" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {techStack.length > 0 && (
                <>
                  <p className="font-display mt-6 text-xs font-bold tracking-[0.15em] uppercase opacity-60">
                    Tech stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {techStack.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <a
                href="#apply"
                className="font-display mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-(--color-cream)"
                style={{ background: "var(--color-indigo)" }}
              >
                Apply now
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
