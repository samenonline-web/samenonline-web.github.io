import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deployed to https://<username>.github.io/samenonline-web
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? "/samenonline-web" : ""),
};

export default nextConfig;
