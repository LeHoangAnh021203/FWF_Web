import type { NextConfig } from "next";

const STATIC_ASSET_CACHE_CONTROL =
  "public, max-age=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source:
          "/:path*\\.(jpg|jpeg|png|webp|avif|gif|svg|ico|mp4|webm|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: STATIC_ASSET_CACHE_CONTROL,
          },
        ],
      },
      {
        source: "/cua-hang",
        headers: [
          {
            key: "Permissions-Policy",
            value: 'geolocation=(self "https://cuahang.facewashfox.com")',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "facewashfox.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
