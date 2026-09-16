import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { GradientMesh } from "@/components/GradientMesh";
import { ValuesGrid } from "@/components/ValuesGrid";

export const metadata: Metadata = {
  title: "About",
  description: "The story and values behind Meskeday Technologies Group.",
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
              A new beginning, built by two histories.
            </h1>
          </FadeIn>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed opacity-80">
                <strong style={{ color: "var(--ink)" }}>Meskeday</strong> was built from the
                people behind it — Meskerem, the mother whose name means &ldquo;new
                beginnings&rdquo; and marks the first month of the Ethiopian calendar, joined
                with Giday, the family name shared by our founders, Anahom and Dagmawi.
              </p>
              <p className="mt-4 text-base leading-relaxed opacity-80">
                We&apos;re a technology, innovation, and investment group — the home for the
                products and ventures we build together, from first sketch to shipped
                software.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed opacity-80">
                Our mark, the <strong style={{ color: "var(--ink)" }}>Adey Circuit</strong>,
                is the Adey Abeba — the yellow flower that blooms across Ethiopia at the New
                Year — rebuilt from six alternating nodes: warm gold and clay for the season
                it comes from, teal and indigo for the technology it&apos;s becoming.
              </p>
              <p
                className="font-amharic mt-4 text-base opacity-70"
                style={{ fontFamily: "var(--font-amharic)" }}
              >
                መስከዳይ ቴክኖሎጂ ግሩፕ — አዲስ ጅማሮ በቴክኖሎጂ።
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
