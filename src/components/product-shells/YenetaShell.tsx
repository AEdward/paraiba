import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BarChart3,
  Clock,
  ClipboardCheck,
  DoorOpen,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Users,
} from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

const heroFeatures = [
  { icon: Clock, title: "Save Time", subtitle: "Automate routine tasks" },
  { icon: MessageCircle, title: "Improve Communication", subtitle: "Keep everyone connected" },
  { icon: GraduationCap, title: "Better Learning", subtitle: "Support student success" },
  { icon: BarChart3, title: "Data-Driven Decisions", subtitle: "Make informed choices" },
];

const dashboardNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Students" },
  { icon: Users, label: "Teachers" },
  { icon: DoorOpen, label: "Classes" },
  { icon: Award, label: "Grades" },
  { icon: ClipboardCheck, label: "Attendance" },
];

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
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 sm:py-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-ember)" }}>
            Modern School Management System
          </p>
          <h1 className="font-display mt-3 max-w-lg text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl" style={{ color: "var(--ink)" }}>
            Smarter Schools.{" "}
            <span style={{ color: "var(--color-ember)" }}>Brighter Futures.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm opacity-65 sm:text-base">
            {name} is a comprehensive school management system that simplifies daily operations,
            connects your school community, and helps every student reach their full potential.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--color-ember)" }}
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
            {heroFeatures.map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex items-start gap-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "color-mix(in srgb, var(--color-ember) 10%, transparent)" }}
                >
                  <Icon size={15} style={{ color: "var(--color-ember)" }} />
                </span>
                <div>
                  <p className="text-xs font-bold leading-tight" style={{ color: "var(--ink)" }}>
                    {title}
                  </p>
                  <p className="mt-0.5 text-[11px] opacity-55">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full">
          <Image
            src="/yeneta-hero.webp"
            alt=""
            width={1167}
            height={944}
            className="w-full rounded-[2rem] object-cover"
            priority
            unoptimized
          />

          <div
            className="absolute top-4 right-2 w-44 rounded-2xl border p-2.5 shadow-lg sm:right-4 sm:w-48"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <div className="flex items-center gap-1.5 border-b px-1 pb-2" style={{ borderColor: "var(--border-soft)" }}>
              <YenetaMark size={18} />
              <p className="font-display text-xs font-bold" style={{ color: "var(--ink)" }}>
                Yeneta
              </p>
            </div>
            <div className="mt-1.5 flex flex-col gap-0.5">
              {dashboardNavItems.map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg px-1.5 py-1"
                  style={active ? { background: "color-mix(in srgb, var(--color-ember) 10%, transparent)" } : undefined}
                >
                  <Icon size={12} style={{ color: active ? "var(--color-ember)" : "var(--ink)", opacity: active ? 1 : 0.5 }} />
                  <p
                    className="text-[11px] font-semibold"
                    style={{ color: active ? "var(--color-ember)" : "var(--ink)", opacity: active ? 1 : 0.65 }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute right-2 bottom-4 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 shadow-lg sm:right-4"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--color-ember)" }}
            >
              <GraduationCap size={16} style={{ color: "#ffffff" }} />
            </span>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                Better education
              </p>
              <p className="text-[11px] opacity-60">for a brighter tomorrow</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
