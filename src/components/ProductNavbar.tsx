"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { PRODUCT_PAGE_SLUGS, PRODUCT_PAGE_TITLES, type ProductPageSlug } from "@/lib/blocks/types";

function hrefFor(slug: ProductPageSlug): string {
  return slug === "home" ? "/" : `/${slug}`;
}

export function ProductNavbar({ name, logoUrl }: { name: string; logoUrl?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border-soft)", background: "color-mix(in srgb, var(--background) 85%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="inline-flex items-center gap-2.5">
          {logoUrl ? (
            <Image src={logoUrl} alt={name} width={36} height={36} style={{ objectFit: "contain" }} unoptimized />
          ) : null}
          <span className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
            {name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {PRODUCT_PAGE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={hrefFor(slug)}
              className="font-display text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "var(--ink)" }}
            >
              {PRODUCT_PAGE_TITLES[slug]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            style={{ color: "var(--ink)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 border-t px-6 py-4 lg:hidden"
          style={{ borderColor: "var(--border-soft)" }}
        >
          {PRODUCT_PAGE_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={hrefFor(slug)}
              onClick={() => setOpen(false)}
              className="font-display py-2 text-sm font-medium"
              style={{ color: "var(--ink)" }}
            >
              {PRODUCT_PAGE_TITLES[slug]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
