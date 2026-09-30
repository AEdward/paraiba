import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

// Shared structural plumbing for a product's bespoke nav — each product
// supplies its own logo mark so the *feel* still differs per site, while
// the "back to Paraiba" link (the only navigation a single-page site
// needs) doesn't need reinventing four times.
export function ShellNavbar({
  logo,
  name,
  homeUrl,
}: {
  logo: ReactNode;
  name: string;
  homeUrl: string;
}) {
  return (
    <header
      className="paraiba-light-section sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--border-soft)", background: "var(--background)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2.5">
          {logo}
          <span className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
            {name}
          </span>
        </Link>

        <a
          href={homeUrl}
          className="font-display inline-flex items-center gap-1.5 text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
          style={{ color: "var(--ink)" }}
        >
          <ArrowLeft size={15} /> Back to Paraiba
        </a>
      </div>
    </header>
  );
}
