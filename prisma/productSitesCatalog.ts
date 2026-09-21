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
    themeColor: "#1E40AF", // Primary
    themeColorSecondary: "#10B981", // Accent
  },
  {
    name: "Tena",
    subdomain: "tena",
    themeColor: "#0D9488", // Primary
    themeColorSecondary: "#06B6D4", // Accent
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
    themeColor: "#7C3AED", // Primary
    themeColorSecondary: "#F472B6", // Accent
  },
];
