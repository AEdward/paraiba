import Link from "next/link";
import { Construction, ArrowRight } from "lucide-react";
import { SectionShell, Eyebrow } from "./blocks/SectionShell";

export function ComingSoon({ eyebrow, heading, body }: { eyebrow: string; heading: string; body: string }) {
  return (
    <SectionShell theme="light" center>
      <div className="mx-auto flex max-w-lg flex-col items-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "rgba(8,124,255,0.1)" }}
        >
          <Construction size={26} style={{ color: "var(--color-ember)" }} />
        </span>
        <div className="mt-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl" style={{ color: "var(--ink)" }}>
          {heading}
        </h1>
        <p className="mt-4 opacity-65">{body}</p>
        <Link
          href="/contact"
          className="font-display mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white"
          style={{ background: "var(--color-ember)" }}
        >
          Talk to Paraiba <ArrowRight size={16} />
        </Link>
      </div>
    </SectionShell>
  );
}
