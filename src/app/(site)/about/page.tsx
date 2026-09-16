import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { ValuesGrid } from "@/components/ValuesGrid";

export const metadata: Metadata = {
  title: "About",
  description: "A new discovery from Ethiopia — the story and philosophy behind Paraiba Technology PLC.",
};

const philosophy = [
  "Powerful enough to make an impact.",
  "Simple enough to use.",
  "Beautiful enough to inspire.",
  "Reliable enough to trust.",
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GradientMesh />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-teal)" }}
            >
              About Us
            </p>
            <h1
              className="font-display mt-4 max-w-2xl text-4xl leading-tight font-bold sm:text-5xl"
              style={{ color: "var(--ink)" }}
            >
              A new discovery from Ethiopia.
            </h1>
          </FadeIn>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed opacity-80">
                <strong style={{ color: "var(--ink)" }}>Paraiba Technology PLC</strong> is an
                Ethiopian technology company building the next generation of digital
                products, platforms, and technology solutions.
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                Just as Paraiba represents something rare and brilliant discovered in
                Ethiopia, Paraiba Technology is our own new addition to Ethiopia&apos;s
                growing technology landscape — born here, built here, and created with
                ambitions that reach far beyond Ethiopia.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed opacity-80">
                We believe great technology doesn&apos;t simply have to be imported. It can
                be discovered, designed, engineered, and built here.
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                At Paraiba, we combine technology, design, and practical problem-solving to
                turn ideas into products people can actually use. We are currently
                developing our own portfolio of digital products while also helping
                businesses and organizations build the technology they need to operate,
                grow, and connect.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-ember)" }}
            >
              More Than a Technology Company
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
              We are building technology.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-80">
              Paraiba is not built around simply writing software for clients. Some of that
              technology will be created for businesses. Some will become products of our
              own. And some may grow into platforms capable of serving thousands or millions
              of users.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80">
              Our goal is to create a company where{" "}
              <strong style={{ color: "var(--ink)" }}>
                products, platforms, services, and innovation live under one technology
                brand.
              </strong>
            </p>
          </FadeIn>
        </div>
      </section>

      <section
        className="border-t"
        style={{
          borderColor: "var(--border-soft)",
          background: "linear-gradient(rgba(8,124,255,0.05), transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 py-20">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-teal)" }}
            >
              Our Origin
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
              Born in Ethiopia. Built for the world.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-80">
              Ethiopia is where Paraiba begins. We see Ethiopia not only as our home
              market, but as a place where ambitious technology can be created and
              exported to the world.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80">
              Our identity is Ethiopian in origin, but our ambition is global. We want
              Paraiba to become a technology brand recognized for creating products that
              are useful, beautifully designed, reliable, and built to scale.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-ember)" }}
            >
              Our Philosophy
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
              We believe technology should be —
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {philosophy.map((line, i) => (
              <FadeIn key={line} delay={i * 0.06}>
                <div
                  className="h-full rounded-2xl border p-6"
                  style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
                >
                  <p className="font-display text-lg font-bold" style={{ color: "var(--ink)" }}>
                    {line}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed opacity-80">
              We don&apos;t build technology for the sake of technology.{" "}
              <strong style={{ color: "var(--ink)" }}>
                We build technology that moves ideas forward.
              </strong>
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "var(--border-soft)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-ember)" }}
            >
              What We Value
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold" style={{ color: "var(--ink)" }}>
              How we build.
            </h2>
          </FadeIn>
          <div className="mt-10">
            <ValuesGrid />
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden border-t"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <GradientMesh />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <FadeIn>
            <p
              className="font-display text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "var(--color-amber)" }}
            >
              Paraiba
            </p>
            <p className="mt-4 text-lg opacity-70">A new discovery from Ethiopia.</p>
            <p className="font-display mt-6 text-2xl leading-snug font-bold sm:text-3xl">
              A new name in technology.
              <br />
              A new generation of digital products.
              <br />
              A new kind of technology company.
            </p>
            <p className="paraiba-text-gradient font-display mt-8 text-2xl font-bold sm:text-3xl">
              Technology with Ethiopian Brilliance.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
