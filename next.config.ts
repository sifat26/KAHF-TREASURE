import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Modern formats for when real product photography is added.
    formats: ['image/avif', 'image/webp'],
    // Remote image hosts. Add the business CDN here when real 1:1 product
    // photography is available (BRAND_GUIDELINES.md » Product Images).
    remotePatterns: [],
  },
};

export default nextConfig;
