import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',      // <== This creates the 'out' folder
  images: {
    unoptimized: true,   // <== Required for static sites
  },
};

export default nextConfig;
