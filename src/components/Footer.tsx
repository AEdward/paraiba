import Link from "next/link";
import { Logo } from "./Logo";
import { getSocialLinks } from "@/lib/social";
import type { SiteSettingsData } from "@/lib/site-settings";
import type { NavData } from "@/lib/nav";

type FooterProduct = { slug: string; name: string };

const solutions = ["Education", "Healthcare", "Restaurant", "Pharmacy", "Hospitality"];
const services = [
  "Web Development",
  "Mobile App Development",
  "Custom Software Development",
  "UI/UX Design",
  "Cloud & Infrastructure",
  "API & System Integration",
];
const legalLinks = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/cookies", label: "Cookie Policy" },
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-display text-xs font-bold tracking-[0.16em] uppercase opacity-50" style={{ color: "var(--ink)" }}>
        {title}
      </p>
      <div className="mt-4 flex flex-col gap-2.5 text-sm">{children}</div>
    </div>
  );
}

export function Footer({
  products = [],
  settings,
  nav,
}: {
  products?: FooterProduct[];
  settings: SiteSettingsData;
  nav: NavData;
}) {
  const socialLinks = getSocialLinks(settings);
  return (
    <footer className="border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-7">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo size={36} />
          <p className="mt-3 max-w-xs text-sm opacity-60">
            Innovative solutions, lasting impact — practical, reliable and beautiful digital
            products, built out of Addis Ababa.
          </p>
          {socialLinks.length > 0 && (
          <div className="mt-5 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border opacity-70 transition-opacity hover:opacity-100"
                  style={{ borderColor: "var(--border-soft)", color: "var(--ink)" }}
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>
          )}
        </div>

        <FooterColumn title="Products">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="opacity-70 hover:opacity-100" style={{ color: "var(--ink)" }}>
              {product.name}
            </Link>
          ))}
          <Link href="/products" className="opacity-70 hover:opacity-100" style={{ color: "var(--ink)" }}>
            All Products
          </Link>
        </FooterColumn>

        <FooterColumn title="Solutions">
          {solutions.map((label) => (
            <Link key={label} href="/solutions" className="opacity-70 hover:opacity-100" style={{ color: "var(--ink)" }}>
              {label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {services.map((label) => (
            <Link key={label} href="/services" className="opacity-70 hover:opacity-100" style={{ color: "var(--ink)" }}>
              {label}
            </Link>
          ))}
        </FooterColumn>

        {nav.groups.map((group) => (
          <FooterColumn key={group.label} title={group.label}>
            {group.links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="opacity-70 hover:opacity-100"
                style={{ color: "var(--ink)" }}
                {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </FooterColumn>
        ))}

        {nav.links.length > 0 && (
          <FooterColumn title="More">
            {nav.links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="opacity-70 hover:opacity-100"
                style={{ color: "var(--ink)" }}
                {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </Link>
            ))}
          </FooterColumn>
        )}

        <FooterColumn title="Contact">
          <span className="opacity-70" style={{ color: "var(--ink)" }}>
            {settings.officeLocation}
          </span>
          {settings.phone && (
            <a href={`tel:${settings.phone}`} className="opacity-70 hover:opacity-100" style={{ color: "var(--ink)" }}>
              {settings.phone}
            </a>
          )}
          <a href={`mailto:${settings.email}`} className="opacity-70 hover:opacity-100" style={{ color: "var(--ink)" }}>
            {settings.email}
          </a>
        </FooterColumn>
      </div>

      <div
        className="border-t px-6 py-5 text-xs opacity-50"
        style={{ borderColor: "var(--border-soft)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span>© {new Date().getFullYear()} Paraiba Technology PLC. All rights reserved.</span>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-80">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
