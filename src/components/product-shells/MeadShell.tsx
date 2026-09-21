import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChefHat, TrendingUp } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

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

export function MeadNavbar({ name, logoUrl, homeUrl }: { name: string; logoUrl?: string; homeUrl: string }) {
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
      homeUrl={homeUrl}
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
            Great Food Deserves Great Management
          </h1>
          <p className="mt-6 max-w-md opacity-70">
            {name} is a complete restaurant management system that helps you run your
            restaurant, café, or food business smoothly — orders, inventory, staff, and reports,
            all in one platform.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(110deg, var(--color-ember), var(--color-amber))" }}
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="font-display inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "rgba(245,250,255,0.16)", background: "rgba(255,255,255,0.03)" }}
            >
              See How It Works
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2.5rem]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, var(--color-amber) 0%, transparent 55%), linear-gradient(135deg, var(--color-ember), #3a1005)",
              }}
            />
            <ChefHat size={92} className="relative" style={{ color: "rgba(255,255,255,0.92)" }} />
          </div>

          <div
            className="absolute -right-4 bottom-6 flex items-center gap-2 rounded-2xl border px-4 py-3 shadow-lg"
            style={{ borderColor: "rgba(245,250,255,0.16)", background: "#1a0f08" }}
          >
            <TrendingUp size={18} style={{ color: "var(--color-amber)" }} />
            <div>
              <p className="text-xs font-bold text-white">Faster Service</p>
              <p className="text-[11px] text-white/60">Happier Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
