import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cloud, Cpu, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { getProjects } from "@/lib/projects-data";

export const dynamic = "force-dynamic";

const solutions = [
  {
    number: "01",
    title: "Business Technology",
    description:
      "ERP, workflow, management and custom software that helps organizations operate with greater clarity.",
  },
  {
    number: "02",
    title: "Digital Products",
    description:
      "Web platforms, mobile experiences and SaaS products designed around the people who use them.",
  },
  {
    number: "03",
    title: "Emerging Technology",
    description:
      "AI, automation, cloud and connected digital services that turn new possibilities into practical products.",
  },
];

const stats = [
  { number: "01", label: "Clarity in every product" },
  { number: "02", label: "Design-led technology" },
  { number: "03", label: "Built to scale" },
  { number: "04", label: "African roots, global ambition" },
];

const products = [
  {
    icon: Cloud,
    label: "Cloud",
    title: "Paraiba Cloud",
    description: "Infrastructure, hosting and cloud services for modern organizations.",
  },
  {
    icon: Cpu,
    label: "Business",
    title: "Paraiba ERP",
    description: "Business management tools designed for growing companies.",
  },
  {
    icon: Sparkles,
    label: "Intelligence",
    title: "Paraiba AI",
    description: "Practical AI products, automation and intelligent workflows.",
  },
];

export default async function Home() {
  const projects = (await getProjects()).slice(0, 3);

  return (
    <div className="paraiba-dark-section">
      <section className="relative overflow-hidden">
        <GradientMesh />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pt-32 pb-20 sm:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-28">
          <div>
            <FadeIn>
              <p
                className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-amber)" }}
              >
                Ethiopian Technology Company
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display mt-6 max-w-xl text-5xl leading-[0.98] font-bold tracking-tight sm:text-7xl">
                Technology with <span className="paraiba-text-gradient">Brilliance.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-lg text-lg opacity-70">
                Paraiba Technology PLC builds modern digital products and technology
                solutions designed to make business simpler, smarter and more connected.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="font-display inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-[#03111f] transition-transform hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(110deg, var(--color-amber), var(--color-ember))",
                  }}
                >
                  Start a Project <ArrowRight size={16} />
                </Link>
                <a
                  href="#solutions"
                  className="font-display inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
                  style={{ borderColor: "rgba(245,250,255,0.16)", background: "rgba(255,255,255,0.03)" }}
                >
                  Explore Solutions
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.15} className="relative">
            <div
              className="motion-safe:animate-[float_5s_ease-in-out_infinite] mx-auto flex max-w-md items-center justify-center rounded-3xl border p-10"
              style={{
                borderColor: "rgba(8,220,232,0.16)",
                background:
                  "radial-gradient(circle at 70% 20%, rgba(8,220,232,0.12), transparent 60%), rgba(255,255,255,0.03)",
              }}
            >
              <Image
                src="/paraiba-logo-full.png"
                alt="Paraiba Technology PLC — crystalline P emblem and wordmark"
                width={1049}
                height={772}
                className="h-auto w-full drop-shadow-[0_0_50px_rgba(8,220,232,0.16)]"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="solutions" className="border-t" style={{ borderColor: "rgba(245,250,255,0.1)", scrollMarginTop: "90px" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-amber)" }}
            >
              What we build
            </p>
            <h2 className="font-display mt-4 max-w-lg text-3xl leading-tight font-bold sm:text-4xl">
              Digital solutions built for real life.
            </h2>
            <p className="mt-4 max-w-lg opacity-65">
              From business systems to digital experiences, Paraiba turns ambitious ideas
              into reliable technology.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {solutions.map((s, i) => (
              <FadeIn key={s.number} delay={i * 0.08}>
                <div
                  className="h-full rounded-2xl border p-7 transition-transform hover:-translate-y-1"
                  style={{ borderColor: "rgba(245,250,255,0.1)", background: "rgba(255,255,255,0.03)" }}
                >
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold"
                    style={{
                      color: "var(--color-amber)",
                      background: "rgba(8,220,232,0.08)",
                      border: "1px solid rgba(8,220,232,0.2)",
                    }}
                  >
                    {s.number}
                  </span>
                  <h3 className="font-display mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm opacity-65">{s.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t"
        style={{
          borderColor: "rgba(245,250,255,0.1)",
          background: "linear-gradient(rgba(8,124,255,0.05), transparent)",
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <div>
              <p
                className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "var(--color-amber)" }}
              >
                The Paraiba idea
              </p>
              <h2 className="font-display mt-4 text-3xl leading-tight font-bold sm:text-4xl">
                Born in Ethiopia.
                <br />
                Built for what&apos;s next.
              </h2>
              <p className="mt-4 max-w-md opacity-65">
                Inspired by the brilliance and vivid color associated with Paraíba-type
                tourmaline, our identity represents precision, energy and distinction.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.number}
                    className="rounded-xl border p-5"
                    style={{ borderColor: "rgba(245,250,255,0.1)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <b className="block text-2xl font-bold" style={{ color: "var(--color-amber)" }}>
                      {s.number}
                    </b>
                    <span className="text-xs opacity-60">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              className="rounded-3xl border p-10"
              style={{
                borderColor: "rgba(8,220,232,0.18)",
                background:
                  "radial-gradient(circle at 80% 20%, rgba(8,220,232,0.11), transparent 48%), rgba(255,255,255,0.03)",
              }}
            >
              <p className="text-2xl leading-snug font-medium tracking-tight">
                &ldquo;Great technology should not feel complicated. It should feel
                natural, powerful and useful.&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="border-t" style={{ borderColor: "rgba(245,250,255,0.1)" }}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="flex items-end justify-between gap-4">
              <FadeIn>
                <p
                  className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "var(--color-amber)" }}
                >
                  Portfolio
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold">What we&apos;re building</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <Link
                  href="/projects"
                  className="font-display hidden items-center gap-1 text-sm font-semibold sm:inline-flex"
                  style={{ color: "var(--color-amber)" }}
                >
                  View all <ArrowRight size={14} />
                </Link>
              </FadeIn>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <FadeIn key={project.slug} delay={i * 0.08}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="products" className="border-t" style={{ borderColor: "rgba(245,250,255,0.1)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-amber)" }}
            >
              Future ecosystem
            </p>
            <h2 className="font-display mt-4 max-w-lg text-3xl leading-tight font-bold sm:text-4xl">
              One brand. Many possibilities.
            </h2>
            <p className="mt-4 max-w-lg opacity-65">
              The Paraiba master brand can support a growing family of digital products
              and platforms.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div
                    className="h-full rounded-2xl border p-7"
                    style={{ borderColor: "rgba(245,250,255,0.1)", background: "#081a2d" }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} style={{ color: "var(--color-amber)" }} />
                      <small
                        className="text-xs font-bold tracking-[0.14em] uppercase"
                        style={{ color: "var(--color-amber)" }}
                      >
                        {p.label}
                      </small>
                    </div>
                    <h3 className="font-display mt-3 text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm opacity-65">{p.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-24" style={{ borderColor: "rgba(245,250,255,0.1)" }}>
        <FadeIn>
          <div
            className="mx-auto max-w-3xl rounded-3xl border p-16 text-center"
            style={{
              borderColor: "rgba(245,250,255,0.1)",
              background:
                "radial-gradient(circle at 50% 0%, rgba(8,220,232,0.15), transparent 50%), linear-gradient(145deg, #0a2038, var(--color-indigo))",
            }}
          >
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-amber)" }}
            >
              Let&apos;s build
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">
              Have an idea worth building?
            </h2>
            <p className="mx-auto mt-4 max-w-md opacity-65">
              Tell us what you want to create. Paraiba can help turn the idea into a
              clear digital product and technology roadmap.
            </p>
            <Link
              href="/contact"
              className="font-display mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-[#03111f] transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(110deg, var(--color-amber), var(--color-ember))" }}
            >
              Talk to Paraiba <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
