/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['maps.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./prisma/**/*'],
  },
  // Domain configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Add this block to ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Enable source maps in production for better error tracking
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
