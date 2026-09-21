"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

type NavLink = { href: string; label: string };
type NavProduct = { slug: string; name: string };

const companyLinks: NavLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Leadership & Team" },
  { href: "/careers", label: "Careers" },
  { href: "/partners", label: "Partners" },
];

const simpleLinks: NavLink[] = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/resources", label: "Resources" },
];

function NavDropdown({ label, links }: { label: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="font-display inline-flex items-center gap-1 text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
        style={{ color: "var(--ink)" }}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 z-10 mt-3 w-56 -translate-x-1/2 rounded-xl border p-2 shadow-lg"
          style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "var(--ink)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({ products = [] }: { products?: NavProduct[] }) {
  const [open, setOpen] = useState(false);

  const productLinks: NavLink[] = [
    ...products.map((p) => ({ href: `/products/${p.slug}`, label: p.name })),
    { href: "/products", label: "All Products →" },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border-soft)", background: "color-mix(in srgb, var(--background) 85%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo size={40} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className="font-display text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
            style={{ color: "var(--ink)" }}
          >
            Home
          </Link>
          <NavDropdown label="Products" links={productLinks} />
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-medium tracking-wide opacity-80 transition-opacity hover:opacity-100"
              style={{ color: "var(--ink)" }}
            >
              {link.label}
            </Link>
          ))}
          <NavDropdown label="Company" links={companyLinks} />
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/contact"
            className="font-display text-sm font-semibold opacity-80 transition-opacity hover:opacity-100"
            style={{ color: "var(--ink)" }}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="font-display inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--color-ember)" }}
          >
            Get Started
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
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display py-2 text-sm font-medium"
            style={{ color: "var(--ink)" }}
          >
            Home
          </Link>
          <MobileGroup label="Products" links={productLinks} onNavigate={() => setOpen(false)} />
          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display py-2 text-sm font-medium"
              style={{ color: "var(--ink)" }}
            >
              {link.label}
            </Link>
          ))}
          <MobileGroup label="Company" links={companyLinks} onNavigate={() => setOpen(false)} />
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="font-display py-2 text-sm font-medium"
            style={{ color: "var(--ink)" }}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="font-display mt-2 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white"
            style={{ background: "var(--color-ember)" }}
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}

function MobileGroup({ label, links, onNavigate }: { label: string; links: NavLink[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="font-display flex w-full items-center justify-between py-2 text-sm font-medium"
        style={{ color: "var(--ink)" }}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-1 pl-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="py-1.5 text-sm opacity-75"
              style={{ color: "var(--ink)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
