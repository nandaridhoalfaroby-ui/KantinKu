// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan ini biar build /menu/[id] gak error
  cacheComponents: false,
};

export default nextConfig;