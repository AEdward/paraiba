import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HeartPulse, Stethoscope } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

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

export function TenaNavbar({ name, logoUrl, homeUrl }: { name: string; logoUrl?: string; homeUrl: string }) {
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
      homeUrl={homeUrl}
    />
  );
}

export function TenaHero({ name }: { name: string }) {
  return (
    <section className="paraiba-light-section relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
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
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--color-ember)" }}
            >
              Book Appointment <ArrowRight size={16} />
            </Link>
            <Link
              href="#features"
              className="font-display inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10"
            style={{
              background: "linear-gradient(135deg, var(--color-ember), var(--color-amber))",
              borderRadius: "42% 58% 56% 44% / 46% 40% 60% 54%",
              filter: "blur(50px)",
              opacity: 0.6,
            }}
          />
          <Image
            src="/tena-hero.webp"
            alt=""
            width={1686}
            height={933}
            className="w-full rounded-[2rem] object-cover"
            style={{
              maskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 58%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 58%, transparent 100%)",
            }}
            priority
            unoptimized
          />
          <div
            className="absolute bottom-4 left-4 flex items-center gap-2.5 rounded-2xl border px-4 py-3 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--color-ember)" }}
            >
              <HeartPulse size={17} style={{ color: "#ffffff" }} />
            </span>
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
