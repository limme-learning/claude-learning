import path from "node:path"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  // Pin the workspace root explicitly — the claude-partices root package-lock.json
  // (unrelated, holds puppeteer for Impeccable's detector) otherwise makes Turbopack
  // guess the wrong root among multiple lockfiles.
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
}

export default nextConfig
