import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { JobCard } from "@/components/JobCard";
import { SectionShell, Eyebrow } from "./SectionShell";
import { getOpenJobs } from "@/lib/jobs";
import type { OpenPositionsData } from "@/lib/blocks/types";

export async function OpenPositionsBlock({ data }: { data: OpenPositionsData }) {
  const jobs = await getOpenJobs();

  return (
    <SectionShell theme={data.theme} center>
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <Eyebrow color="var(--color-ember)">
            {data.eyebrow}
          </Eyebrow>
          <h2 className="font-display mt-4 text-2xl font-bold" style={{ color: "var(--ink)" }}>
            {data.heading}
          </h2>
        </FadeIn>

        {jobs.length > 0 ? (
          <div className="mt-10 flex flex-col gap-4 text-left">
            {jobs.map((job, i) => (
              <FadeIn key={job.id} delay={i * 0.06}>
                <JobCard job={job} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-10 max-w-md opacity-70">
              We don&apos;t have any open roles posted right now. When we do, they&apos;ll show up
              here — but we&apos;re always glad to hear from people who want to build with us.
            </p>
            <Link
              href="/contact"
              className="font-display mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-(--color-cream) shadow-[0_8px_24px_-8px_rgba(22,35,63,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(22,35,63,0.6)]"
              style={{ background: "var(--color-indigo)" }}
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </FadeIn>
        )}
      </div>
    </SectionShell>
  );
}
