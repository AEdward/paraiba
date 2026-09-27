import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/blocks/SectionShell";
import { getProjects } from "@/lib/projects-data";
import { getSiteSettings } from "@/lib/site-settings";
import { getNavData } from "@/lib/nav";

export const metadata: Metadata = { title: "Page Not Found" };

export default async function NotFound() {
  const [products, settings, headerNav, footerNav] = await Promise.all([
    getProjects(),
    getSiteSettings(),
    getNavData("header"),
    getNavData("footer"),
  ]);
  const productLinks = products.map((p) => ({ slug: p.slug, name: p.name }));

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Navbar products={productLinks} nav={headerNav} />
      <main className="paraiba-light-section relative flex-1 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full"
          style={{
            background: "linear-gradient(135deg, var(--color-ember), var(--color-amber))",
            filter: "blur(90px)",
            opacity: 0.25,
          }}
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center sm:py-32">
          <p
            className="font-display text-8xl leading-none font-extrabold sm:text-9xl"
            style={{ color: "var(--color-ember)" }}
          >
            404
          </p>
          <div className="mt-6">
            <Eyebrow>Page Not Found</Eyebrow>
          </div>
          <h1 className="font-display mt-4 text-2xl leading-tight font-bold sm:text-3xl" style={{ color: "var(--ink)" }}>
            This page seems to have wandered off.
          </h1>
          <p className="mt-4 max-w-md opacity-65">
            The page you&rsquo;re looking for doesn&rsquo;t exist, may have been moved, or the
            link might be outdated. Let&rsquo;s get you back on track.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="font-display inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(110deg, var(--color-ember), var(--color-amber))" }}
            >
              <Home size={16} /> Back to Home
            </Link>
            <Link
              href="/contact"
              className="font-display inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ borderColor: "var(--border-soft)", background: "var(--surface)", color: "var(--ink)" }}
            >
              <Compass size={16} /> Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </main>
      <Footer products={productLinks} settings={settings} nav={footerNav} />
    </div>
  );
}
