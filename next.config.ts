import type { NextConfig } from "next";

// The CMS serves uploaded photos (rooms, gallery, etc.) from the same origin
// as the API, under a sibling `/backend/images` path — e.g.
// http://localhost/hotelparkland/backend/images/subpackage/room.jpg when the
// API is http://localhost/hotelparkland/api/v1. Derive that images path from
// the API URL so next/image can optimise it without hardcoding a hostname.
const CMS_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/hotelparkland/api/v1/";
const cmsBasePath = new URL(CMS_API_URL).pathname.replace(/\/api\/v1\/?$/, "");
const cmsImagesPattern = new URL(`${cmsBasePath}/backend/images/**`, CMS_API_URL);
// Next 16 blocks image optimization from private/loopback IPs by default (SSRF
// guard) — the local CMS resolves to one in dev, so opt back in only then.
// Once NEXT_PUBLIC_API_URL points at a real public host, this stays off.
const cmsHostIsLocal = ["localhost", "127.0.0.1", "::1"].includes(cmsImagesPattern.hostname);

// Baseline security headers applied to every route.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // output: 'export',
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    remotePatterns: [cmsImagesPattern],
    ...(cmsHostIsLocal ? { dangerouslyAllowLocalIP: true } : {}),
    //  unoptimized: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
