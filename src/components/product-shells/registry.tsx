import type { ComponentType } from "react";
import { YenetaNavbar, YenetaHero } from "./YenetaShell";
import { TenaNavbar, TenaHero } from "./TenaShell";
import { MeadNavbar, MeadHero } from "./MeadShell";
import { KininNavbar, KininHero } from "./KininShell";

export type ShellNavProps = { name: string; logoUrl?: string; homeUrl: string };
export type ShellHeroProps = { name: string };

export type ProductShell = {
  Navbar: ComponentType<ShellNavProps>;
  Hero: ComponentType<ShellHeroProps>;
};

// Bespoke nav+hero per product, keyed by subdomain. A product not listed
// here (e.g. a brand-new one without a style board yet) falls back to the
// generic shared ProductNavbar/hero block — see src/app/sites/[subdomain]/.
const productShells: Record<string, ProductShell> = {
  yeneta: { Navbar: YenetaNavbar, Hero: YenetaHero },
  tena: { Navbar: TenaNavbar, Hero: TenaHero },
  mead: { Navbar: MeadNavbar, Hero: MeadHero },
  kinin: { Navbar: KininNavbar, Hero: KininHero },
};

export function getProductShell(subdomain: string): ProductShell | undefined {
  return productShells[subdomain];
}
