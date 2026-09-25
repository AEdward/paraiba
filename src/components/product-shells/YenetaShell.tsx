import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Clock, GraduationCap, MessageCircle, PlayCircle } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

const heroFeatures = [
  { icon: Clock, title: "Save Time", subtitle: "Automate routine tasks" },
  { icon: MessageCircle, title: "Improve Communication", subtitle: "Keep everyone connected" },
  { icon: GraduationCap, title: "Better Learning", subtitle: "Support student success" },
  { icon: BarChart3, title: "Data-Driven Decisions", subtitle: "Make informed choices" },
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
            <Link
              href="#features"
              className="font-display inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
            >
              <PlayCircle size={16} /> Watch Video
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
            width={339}
            height={264}
            className="w-full rounded-[2rem] object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
