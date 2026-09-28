import type { MetadataRoute } from "next";
import { getRootSiteUrl } from "@/lib/subdomain";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getRootSiteUrl(process.env.ROOT_DOMAIN || "localhost:3000");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
