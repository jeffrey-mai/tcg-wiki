import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allowing images from specific websites
  images: {
    domains: ['lh3.googleusercontent.com', "en.cf-vanguard.com"], // used in NavBar.tsx
  },
};

export default nextConfig;
