// The real named product catalog, replacing the earlier "Project
// One/Two/Three" placeholders. Shared by seed.ts (fresh installs) and
// republishProducts.ts (a one-time upsert for a database that was already
// seeded with the old placeholders). Copy here is a first draft — edit
// freely from /admin/products afterward.

export type SeedProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "in-progress" | "concept" | "archived";
  tags: string;
};

export const productCatalog: SeedProduct[] = [
  {
    slug: "yeneta",
    name: "Yeneta",
    tagline: "School management software built for Ethiopian institutions.",
    description:
      "Yeneta (የኔታ) helps schools manage admissions, attendance, grading, fees, and parent communication — all in one place, designed around how Ethiopian schools actually run.",
    status: "in-progress",
    tags: "Education,School Management",
  },
  {
    slug: "tena",
    name: "Tena",
    tagline: "Healthcare management built for clinics and hospitals.",
    description:
      "Tena (ጤና) — the Amharic word for health — streamlines patient records, appointments, billing, and staff scheduling for healthcare providers.",
    status: "in-progress",
    tags: "Healthcare,Clinic Management",
  },
  {
    slug: "mead",
    name: "Mead",
    tagline: "Restaurant management, from kitchen to counter.",
    description:
      "Mead (መዓድ) — the Amharic word for a feast — handles orders, tables, inventory, and staff for restaurants, from a single counter to a full chain.",
    status: "in-progress",
    tags: "Restaurant,POS",
  },
  {
    slug: "kinin",
    name: "Kinin",
    tagline: "Pharmacy management, from shelf to sale.",
    description:
      "Kinin (ኪኒን) — the Amharic word for pill — tracks inventory, expiry dates, prescriptions, and sales for pharmacies of any size.",
    status: "in-progress",
    tags: "Pharmacy,Healthcare",
  },
  {
    slug: "enegeda",
    name: "Enegeda",
    tagline: "Hotel management that puts guests first.",
    description:
      "Enegeda (እንግዳ) — the Amharic word for guest — manages bookings, rooms, housekeeping, and billing for hotels and guesthouses.",
    status: "in-progress",
    tags: "Hospitality,Hotel Management",
  },
];
