import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright drives the app over 127.0.0.1 while `next dev` binds localhost.
  // Without this, Next blocks the dev-resource requests as cross-origin, the
  // page server-renders but never hydrates, and every interaction is inert.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
