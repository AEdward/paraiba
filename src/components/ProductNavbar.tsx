import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// A product's own site is a single scrolling page, so there's nothing to
// navigate to except back to Paraiba's own site — no page links, no
// mobile menu toggle needed.
export function ProductNavbar({ name, logoUrl, homeUrl }: { name: string; logoUrl?: string; homeUrl: string }) {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border-soft)", background: "color-mix(in srgb, var(--background) 85%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-2.5">
          {logoUrl ? (
            <Image src={logoUrl} alt={name} width={48} height={48} style={{ objectFit: "contain" }} unoptimized />
          ) : null}
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
