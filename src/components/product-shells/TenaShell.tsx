import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HeartPulse, Stethoscope } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function TenaMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: "var(--color-ember)" }}
    >
      <Stethoscope size={size * 0.55} style={{ color: "#ffffff" }} />
    </span>
  );
}

export function TenaNavbar({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <ShellNavbar
      logo={
        logoUrl ? (
          <Image src={logoUrl} alt={name} width={36} height={36} style={{ objectFit: "contain" }} unoptimized />
        ) : (
          <TenaMark />
        )
      }
      name={name}
      items={NAV_ITEMS}
      cta={{ label: "Book Appointment", href: "/contact" }}
      ctaClassName="font-display inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
      ctaStyle={{ background: "var(--color-ember)" }}
    />
  );
}

export function TenaHero({ name }: { name: string }) {
  return (
    <section className="paraiba-light-section relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
            Healthcare Management System
          </p>
          <h1 className="font-display mt-4 max-w-lg text-4xl leading-tight font-bold sm:text-5xl" style={{ color: "var(--ink)" }}>
            Quality Healthcare Management, Made Simple
          </h1>
          <p className="mt-6 max-w-md opacity-70">
            {name} helps hospitals, clinics and healthcare providers deliver better care, manage
            operations efficiently, and keep patients at the center.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--color-ember)" }}
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <Link
              href="/features"
              className="font-display inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(135deg, var(--color-ember), var(--color-amber))" }}
          />
          <Stethoscope size={110} className="relative" style={{ color: "rgba(255,255,255,0.92)" }} />
          <div
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl border px-4 py-3 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <HeartPulse size={18} style={{ color: "var(--color-ember)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                Healthier People
              </p>
              <p className="text-[11px] opacity-60">Stronger Communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
