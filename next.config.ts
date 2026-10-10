import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // Old URLs are linked from the Chrome Web Store listing and search results
  async redirects() {
    return [
      { source: "/tabcraft", destination: "/products/tabcraft", permanent: true },
      { source: "/tabcraft/:doc(privacy|terms)", destination: "/products/tabcraft/:doc", permanent: true },
      { source: "/projects/:slug", destination: "/portfolio/:slug", permanent: true },
      { source: "/cv", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
