import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mars.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "marsphoto.gsfc.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "photojournal.jpl.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
      },
      {
        protocol: "http",
        hostname: "mars.jpl.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "*.nasa.gov",
      },
    ],
  },
};

export default nextConfig;
