import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChefHat, ClipboardList, FileBarChart2, PackageSearch, Users } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

const heroFeatures = [
  { icon: ClipboardList, label: "Manage Orders & Tables" },
  { icon: PackageSearch, label: "Track Inventory in Real-Time" },
  { icon: Users, label: "Handle Staff & Shifts" },
  { icon: FileBarChart2, label: "Get Detailed Reports" },
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
    <section className="paraiba-light-section relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
            Restaurant Management System
          </p>
          <h1 className="font-display mt-4 max-w-lg text-4xl leading-tight font-bold sm:text-5xl" style={{ color: "var(--ink)" }}>
            Great Food Deserves{" "}
            <span style={{ color: "var(--color-ember)" }}>Great Management</span>
          </h1>
          <p className="mt-6 max-w-md opacity-65">
            {name} is a complete restaurant management system that helps you run your
            restaurant, café, or food business smoothly. From orders to inventory, staff to
            reports — everything you need in one powerful platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(110deg, var(--color-ember), var(--color-amber))" }}
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {heroFeatures.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "color-mix(in srgb, var(--color-ember) 10%, transparent)" }}
                >
                  <Icon size={15} style={{ color: "var(--color-ember)" }} />
                </span>
                <p className="text-xs leading-snug font-bold" style={{ color: "var(--ink)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full">
          <Image
            src="/mead-hero.webp"
            alt=""
            width={1536}
            height={1024}
            className="w-full rounded-[2rem] object-cover"
            priority
            unoptimized
          />

          <div
            className="absolute top-4 left-4 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <CheckCircle2 size={16} style={{ color: "#10b981" }} />
            <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
              Order Confirmed
            </p>
          </div>

          <div
            className="absolute right-4 bottom-4 flex items-center gap-2.5 rounded-2xl border px-4 py-3 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--color-ember)" }}
            >
              <ChefHat size={17} style={{ color: "#ffffff" }} />
            </span>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                Great Food.
              </p>
              <p className="text-[11px] opacity-60">Better Business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
