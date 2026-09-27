import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      // default is 1MB, too small for an uploaded logo image
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
