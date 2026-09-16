import Link from "next/link";
import { Logo } from "./Logo";
import { socialLinks } from "@/lib/social";

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo size={36} />
          <p className="mt-3 max-w-sm text-sm opacity-60">
            Technology · Innovation · Investment — building new beginnings out of Addis Ababa.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border opacity-70 transition-opacity hover:opacity-100"
                  style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
        </div>
        <nav
          className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-medium sm:flex sm:gap-6"
          style={{ color: "var(--ink)" }}
        >
          <Link href="/about" className="opacity-70 hover:opacity-100">
            About
          </Link>
          <Link href="/projects" className="opacity-70 hover:opacity-100">
            Projects
          </Link>
          <Link href="/careers" className="opacity-70 hover:opacity-100">
            Careers
          </Link>
          <Link href="/contact" className="opacity-70 hover:opacity-100">
            Contact
          </Link>
        </nav>
      </div>
      <div
        className="border-t px-6 py-5 text-center text-xs opacity-50"
        style={{ borderColor: "var(--border-soft)" }}
      >
        © {new Date().getFullYear()} Meskeday Technologies Group. All rights reserved.
      </div>
    </footer>
  );
}
