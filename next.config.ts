import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Old URLs are linked from the Chrome Web Store listing and search results
  async redirects() {
    return [
      { source: "/projects/:slug", destination: "/work/:slug", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:slug", destination: "/work/:slug", permanent: true },
      { source: "/experience", destination: "/work", permanent: true },
      { source: "/experience/:slug", destination: "/work/:slug", permanent: true },
      { source: "/about", destination: "/cv", permanent: true },
      // Removed in the 2026 rework: contact lives in the command bar, products (TabCraft) on the Work page
      { source: "/contact", destination: "/", permanent: true },
      { source: "/products", destination: "/work", permanent: true },
      { source: "/products/:path*", destination: "/work/tabcraft", permanent: true },
      { source: "/tabcraft", destination: "/work/tabcraft", permanent: true },
      { source: "/tabcraft/:path*", destination: "/work/tabcraft", permanent: true },
    ];
  },
};

export default nextConfig;
