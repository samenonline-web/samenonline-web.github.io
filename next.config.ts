import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Root domain deployment for https://samenonline-web.github.io/
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
