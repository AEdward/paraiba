"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

export type ShellNavItem = { label: string; href: string };

// Shared structural/accessibility plumbing (mobile toggle, sticky/blur bar)
// for a product's bespoke nav — each product supplies its own logo mark,
// nav items, and CTA styling so the *feel* still differs per site, while
// the mobile-menu behavior doesn't need reinventing four times.
export function ShellNavbar({
  logo,
  name,
  items,
  cta,
  ctaClassName,
  ctaStyle,
}: {
  logo: ReactNode;
  name: string;
  items: ShellNavItem[];
  cta: { label: string; href: string };
  ctaClassName: string;
  ctaStyle: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="paraiba-light-section sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border-soft)", background: "color-mix(in srgb, var(--surface) 90%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="inline-flex items-center gap-2.5">
          {logo}
          <span className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
            {name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "var(--ink)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href={cta.href} className={ctaClassName} style={ctaStyle}>
            {cta.label}
          </Link>
        </div>

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
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display py-2 text-sm font-medium"
              style={{ color: "var(--ink)" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className={`${ctaClassName} mt-2 w-fit`}
            style={ctaStyle}
          >
            {cta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
