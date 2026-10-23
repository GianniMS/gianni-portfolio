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
      { source: "/products/:path+", destination: "/:path+", permanent: true },
      { source: "/projects/:slug", destination: "/experience/:slug", permanent: true },
      { source: "/portfolio", destination: "/experience", permanent: true },
      { source: "/portfolio/:slug", destination: "/experience/:slug", permanent: true },
      { source: "/cv", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
