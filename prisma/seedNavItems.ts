// Seeds the NavItem rows that reproduce the site's original, hand-written
// nav/footer links — run once per environment so the menu isn't empty after
// the migration to the admin-managed nav system. Safe to re-run: skips
// entirely if any NavItem already exists (admin edits, including deletions,
// are never overwritten).

import type { PrismaClient } from "../src/generated/prisma/client";

type SeedNavItem = {
  label: string;
  href: string;
  location: "header" | "footer" | "both";
  group?: string;
  order: number;
};

const NAV_ITEMS: SeedNavItem[] = [
  // Flat header links (no footer equivalent existed for these before).
  { label: "Solutions", href: "/solutions", location: "header", order: 10 },
  { label: "Services", href: "/services", location: "header", order: 20 },
  { label: "Work", href: "/work", location: "header", order: 30 },
  { label: "Resources", href: "/resources", location: "header", order: 40 },

  // "Company" dropdown (header) / column (footer) — same four links in both.
  { label: "About Us", href: "/about", location: "both", group: "Company", order: 50 },
  { label: "Leadership & Team", href: "/team", location: "both", group: "Company", order: 60 },
  { label: "Careers", href: "/careers", location: "both", group: "Company", order: 70 },
  { label: "Partners", href: "/partners", location: "both", group: "Company", order: 80 },

  // Footer-only "Resources" column (both entries point at the same page).
  { label: "Documentation", href: "/resources", location: "footer", group: "Resources", order: 90 },
  { label: "FAQ", href: "/resources", location: "footer", group: "Resources", order: 100 },
];

export async function seedNavItems(db: PrismaClient) {
  const existing = await db.navItem.count();
  if (existing > 0) {
    console.log("NavItems already exist, skipping.");
    return;
  }

  await db.navItem.createMany({ data: NAV_ITEMS });
  console.log(`Seeded ${NAV_ITEMS.length} nav items.`);
}
