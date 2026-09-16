import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { ValuesGrid } from "@/components/ValuesGrid";

export const metadata: Metadata = {
  title: "About",
  description: "The story and values behind Paraiba Technology PLC.",
};

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
              Ethiopian brilliance, translated into technology.
            </h1>
          </FadeIn>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed opacity-80">
                The name <strong style={{ color: "var(--ink)" }}>Paraiba</strong> is inspired
                by the vivid blue and blue-green character of Paraíba tourmaline — a
                metaphor for clarity, rarity, energy and brilliance. We translate those
                qualities into technology: bold ideas, precise execution, and products
                designed to stand out.
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                Our mission is to build practical, reliable and beautiful technology that
                helps people and businesses operate, grow and connect. Our vision is to
                become a recognized African technology brand known for turning ambitious
                ideas into useful digital products.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed opacity-80">
                We&apos;re a premium-but-accessible technology company for businesses,
                organizations and consumers who need modern digital solutions without
                unnecessary complexity. Paraiba makes technology feel powerful, modern and
                usable.
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                We&apos;re Ethiopian in origin and global in ambition — without relying on
                literal flags, maps, or clichés.
              </p>
            </FadeIn>
          </div>
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
    </>
  );
}
