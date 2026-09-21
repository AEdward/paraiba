import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, ArrowRight, CheckCircle2, Pill, ShieldCheck } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

function KininMark({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: "var(--color-ember)" }}
    >
      <Pill size={size * 0.52} style={{ color: "var(--color-amber)" }} />
    </span>
  );
}

export function KininNavbar({ name, logoUrl, homeUrl }: { name: string; logoUrl?: string; homeUrl: string }) {
  return (
    <ShellNavbar
      logo={
        logoUrl ? (
          <Image src={logoUrl} alt={name} width={36} height={36} style={{ objectFit: "contain" }} unoptimized />
        ) : (
          <KininMark />
        )
      }
      name={name}
      homeUrl={homeUrl}
    />
  );
}

export function KininHero({ name }: { name: string }) {
  return (
    <section className="paraiba-light-section relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
            Pharmacy Management System
          </p>
          <h1 className="font-display mt-4 max-w-lg text-4xl leading-tight font-bold sm:text-5xl" style={{ color: "var(--ink)" }}>
            Smarter Pharmacy Management for Healthier Communities
          </h1>
          <p className="mt-6 max-w-md opacity-70">
            {name} helps pharmacies and drug stores manage inventory, prescriptions, sales, and
            operations — all in one easy-to-use platform. Work smarter, reduce errors, and
            deliver better care to your customers.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(110deg, var(--color-ember), var(--color-amber))" }}
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="font-display inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
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
              className="absolute -top-12 -left-12 h-56 w-56 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            <Pill size={92} className="relative" style={{ color: "rgba(255,255,255,0.92)" }} />
          </div>

          <div
            className="absolute -top-4 -right-4 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <CheckCircle2 size={16} style={{ color: "#10b981" }} />
            <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
              Dispense Prescription
            </p>
          </div>

          <div
            className="absolute top-1/3 -left-6 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <AlertTriangle size={16} style={{ color: "#f59e0b" }} />
            <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
              Stock Alert
            </p>
          </div>

          <div
            className="absolute -right-4 bottom-6 flex items-center gap-2 rounded-2xl border px-4 py-3 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <ShieldCheck size={18} style={{ color: "var(--color-ember)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                Safe Meds
              </p>
              <p className="text-[11px] opacity-60">Healthy Communities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
