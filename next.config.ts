import type { NextConfig } from "next";

const STATIC_ASSET_CACHE_CONTROL =
  "public, max-age=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/wp-content/uploads/Cham-soc-da-FWF.pdf",
          destination: "/cham-soc-da-fwf",
        },
        {
          source: "/wp-content/uploads/2024/09/Cham-soc-sau-MESO.pdf",
          destination: "/cham-soc-sau-meso",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/wp-content/uploads/Cham-soc-da-FWF.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "text/html; charset=utf-8",
          },
        ],
      },
      {
        source: "/wp-content/uploads/2024/09/Cham-soc-sau-MESO.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "text/html; charset=utf-8",
          },
        ],
      },
      {
        source:
          "/:path*\\.(jpg|jpeg|png|webp|avif|gif|svg|ico|mp4|webm|woff|woff2|ttf|otf|pdf)",
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
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
