import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects-data";
import { getRootSiteUrl } from "@/lib/subdomain";

// Content is CMS-driven (products, pages), so this is generated per-request
// rather than baked in at build time.
export const dynamic = "force-dynamic";

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/team", priority: 0.5, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/legal/privacy", priority: 0.2, changeFrequency: "monthly" },
  { path: "/legal/terms", priority: 0.2, changeFrequency: "monthly" },
  { path: "/legal/cookies", priority: 0.2, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getRootSiteUrl(process.env.ROOT_DOMAIN || "localhost:3000");
  const projects = await getProjects();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const productEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/products/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...productEntries];
}
