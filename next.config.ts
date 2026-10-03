import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "@prisma/client-runtime-utils"],
  // This host's CageFS sandbox has repeatedly failed to run native/compiled
  // binaries reliably (same class of issue as the Prisma engine problems
  // fixed earlier) — sharp (needed for next/image's on-the-fly optimization)
  // is another one, causing broken-image icons for every <Image> component.
  // Serving images unoptimized avoids depending on it at all.
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // default is 1MB, too small for an uploaded logo image
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
