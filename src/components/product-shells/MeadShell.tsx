import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChefHat } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

function MeadMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-2xl"
      style={{ width: size, height: size, background: "var(--color-ember)" }}
    >
      <ChefHat size={size * 0.56} style={{ color: "var(--color-amber)" }} />
    </span>
  );
}

export function MeadNavbar({ name, logoUrl }: { name: string; logoUrl?: string }) {
  return (
    <ShellNavbar
      logo={
        logoUrl ? (
          <Image src={logoUrl} alt={name} width={36} height={36} style={{ objectFit: "contain" }} unoptimized />
        ) : (
          <MeadMark />
        )
      }
      name={name}
      items={NAV_ITEMS}
      cta={{ label: "Get Started", href: "/contact" }}
      ctaClassName="font-display inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
      ctaStyle={{ background: "linear-gradient(110deg, var(--color-ember), var(--color-amber))" }}
    />
  );
}

export function MeadHero({ name }: { name: string }) {
  return (
    <section className="paraiba-dark-section relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-amber)" }}>
            Restaurant Management System
          </p>
          <h1 className="font-display mt-4 max-w-lg text-4xl leading-tight font-bold sm:text-5xl">
            Simple. Flexible. Powerful Restaurant Management.
          </h1>
          <p className="mt-6 max-w-md opacity-70">
            {name} helps you manage your tables, orders, staff and inventory — so you can focus
            on what you do best: serving great food.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="font-display inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(110deg, var(--color-ember), var(--color-amber))" }}
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <Link
              href="/features"
              className="font-display inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "rgba(245,250,255,0.16)", background: "rgba(255,255,255,0.03)" }}
            >
              See How It Works
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-[2.5rem]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, var(--color-amber) 0%, transparent 55%), linear-gradient(135deg, var(--color-ember), #3a1005)",
            }}
          />
          <ChefHat size={96} className="relative" style={{ color: "rgba(255,255,255,0.92)" }} />
        </div>
      </div>
    </section>
  );
}
