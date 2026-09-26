import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChefHat, ClipboardList, FileBarChart2, PackageSearch, Sparkles, Users } from "lucide-react";
import { ShellNavbar } from "./ShellNavbar";

const heroFeatures = [
  { icon: ClipboardList, label: "Manage Orders & Tables" },
  { icon: PackageSearch, label: "Track Inventory in Real-Time" },
  { icon: Users, label: "Handle Staff & Shifts" },
  { icon: FileBarChart2, label: "Get Detailed Reports" },
];

const heroStats = [
  { label: "Total Sales", value: "ETB 248,500", change: "+12%" },
  { label: "Orders Today", value: "86", change: "+4%" },
  { label: "Active Tables", value: "12", change: "+2%" },
];

const heroRecentOrders = [
  { table: "Table 5", amount: "ETB 1,250", color: "#10b981" },
  { table: "Table 3", amount: "ETB 780", color: "var(--color-ember)" },
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
          <div
            aria-hidden
            className="absolute -inset-10 -z-10"
            style={{
              background: "linear-gradient(135deg, var(--color-ember), var(--color-amber))",
              borderRadius: "44% 56% 58% 42% / 48% 40% 60% 52%",
              filter: "blur(50px)",
              opacity: 0.6,
            }}
          />
          <Image
            src="/mead-hero.webp"
            alt=""
            width={1536}
            height={1024}
            className="w-full rounded-[2rem] object-cover"
            style={{
              maskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 58%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 58%, transparent 100%)",
            }}
            priority
            unoptimized
          />

          <Sparkles aria-hidden size={28} className="absolute top-2 left-10 sm:left-14" style={{ color: "var(--color-amber)" }} />

          <div
            className="absolute right-2 bottom-2 w-64 rounded-2xl border p-3.5 shadow-lg sm:right-4 sm:bottom-4 sm:w-72"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            <div className="flex items-center gap-1.5 border-b pb-2" style={{ borderColor: "var(--border-soft)" }}>
              <MeadMark size={18} />
              <p className="font-display text-xs font-bold" style={{ color: "var(--ink)" }}>
                Overview
              </p>
            </div>

            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[10px] opacity-55">{stat.label}</p>
                  <p className="text-xs font-bold" style={{ color: "var(--ink)" }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-semibold" style={{ color: "#10b981" }}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>

            <svg viewBox="0 0 200 50" className="mt-2.5 h-10 w-full" aria-hidden>
              <polyline
                points="0,40 25,30 50,35 75,20 100,28 125,15 150,22 175,8 200,14"
                fill="none"
                stroke="var(--color-ember)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="mt-2.5 flex flex-col gap-1.5 border-t pt-2.5" style={{ borderColor: "var(--border-soft)" }}>
              <p className="text-[10px] font-bold tracking-wide uppercase opacity-55">Recent Orders</p>
              {heroRecentOrders.map((order) => (
                <div key={order.table} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: order.color }} />
                    <p className="text-[11px] font-semibold" style={{ color: "var(--ink)" }}>
                      {order.table}
                    </p>
                  </div>
                  <p className="text-[11px] opacity-60">{order.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
