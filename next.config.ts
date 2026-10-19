import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const pagesBase = "/NPDL";

const nextConfig: NextConfig = {
  ...(githubPages
    ? {
        output: "export" as const,
        basePath: pagesBase,
        assetPrefix: pagesBase,
        trailingSlash: true,
      }
    : {}),
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
