import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Sparkles, UserCheck } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

function YenetaMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: "var(--color-ember)" }}
    >
      <GraduationCap size={size * 0.58} style={{ color: "var(--color-amber)" }} />
    </span>
  );
}

export function YenetaNavbar({ name, logoUrl, homeUrl }: { name: string; logoUrl?: string; homeUrl: string }) {
  return (
    <ShellNavbar
      logo={
        logoUrl ? (
          <Image src={logoUrl} alt={name} width={36} height={36} style={{ objectFit: "contain" }} unoptimized />
        ) : (
          <YenetaMark />
        )
      }
      name={name}
      homeUrl={homeUrl}
    />
  );
}

export function YenetaHero({ name }: { name: string }) {
  return (
    <section className="paraiba-light-section relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
            School Management System
          </p>
          <h1 className="font-display mt-4 max-w-lg text-4xl leading-tight font-bold sm:text-5xl" style={{ color: "var(--ink)" }}>
            Smarter Schools. Brighter Futures.
          </h1>
          <p className="mt-6 max-w-md opacity-70">
            {name} is a comprehensive school management system that simplifies daily operations,
            connects your school community, and helps every student reach their full potential.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--color-ember)" }}
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="font-display inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
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
              style={{ background: "linear-gradient(135deg, var(--color-ember), var(--color-amber))" }}
            />
            <div
              aria-hidden
              className="absolute -top-10 -right-10 h-56 w-56 rounded-full"
              style={{ background: "rgba(255,255,255,0.14)" }}
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-10 h-64 w-64 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
            <GraduationCap size={96} className="relative" style={{ color: "rgba(255,255,255,0.92)" }} />
          </div>

          <div
            className="absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <UserCheck size={16} style={{ color: "#10b981" }} />
            <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
              Attendance Tracked
            </p>
          </div>

          <div
            className="absolute -right-4 bottom-6 flex items-center gap-2 rounded-2xl border px-4 py-3 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <Sparkles size={18} style={{ color: "var(--color-ember)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                Better Education
              </p>
              <p className="text-[11px] opacity-60">Brighter Tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
