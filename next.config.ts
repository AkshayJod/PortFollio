import type { NextConfig } from "next";

// GitHub Pages serves this repo from /<repo-name>; the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH. Locally and on Vercel/Netlify it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
