import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "@prisma/client-runtime-utils"],
  experimental: {
    serverActions: {
      // default is 1MB, too small for an uploaded logo image
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
