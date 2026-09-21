// Product Sites created from brand style boards — Primary hex maps to
// themeColor (overrides --color-ember/--color-teal), Accent hex maps to
// themeColorSecondary (overrides --color-amber). Logo isn't set here —
// upload the real logo file per site from /admin/product-sites/[id].

export type SeedProductSite = {
  name: string;
  subdomain: string;
  themeColor: string;
  themeColorSecondary: string;
};

export const productSitesCatalog: SeedProductSite[] = [
  {
    name: "Yeneta",
    subdomain: "yeneta",
    themeColor: "#1455D9", // Primary — Deep Blue
    themeColorSecondary: "#F9B51A", // Accent — Golden Yellow
  },
  {
    name: "Tena",
    subdomain: "tena",
    themeColor: "#079A88", // Primary — Healthcare Teal
    themeColorSecondary: "#4DD9D0", // Accent — Bright Cyan
  },
  {
    name: "Mead",
    subdomain: "mead",
    themeColor: "#EA580C", // Primary
    themeColorSecondary: "#FBBF24", // Accent
  },
  {
    name: "Kinin",
    subdomain: "kinin",
    themeColor: "#6438D8", // Primary — Kinin Purple
    themeColorSecondary: "#08A7A0", // Secondary — Medical Teal (used over the pink accent to land on the intended Purple/Teal pairing)
  },
];
