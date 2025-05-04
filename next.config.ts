import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allowing images from specific websites
  images: {
    domains: [
      'lh3.googleusercontent.com', 
      "en.cf-vanguard.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
};

export default nextConfig;
