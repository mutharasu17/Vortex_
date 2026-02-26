import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/Vortex_' : '',
  assetPrefix: isProd ? '/Vortex_/' : '',
  trailingSlash: true, // Required for static hosting sub-paths
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'svgl.app',
      },
    ],
  },
};

export default nextConfig;
