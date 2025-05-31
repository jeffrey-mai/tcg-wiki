import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allowing images from specific websites
  images: {
    domains: [
      'lh3.googleusercontent.com', 
      "en.cf-vanguard.com",
      "cdn-icons-png.flaticon.com",
      "i.imgur.com",
      "i.pinimg.com",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
