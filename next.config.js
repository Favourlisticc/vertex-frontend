/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
       {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'venuswomenshospital.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.modernghana.com',
      },
      {
        protocol: 'https',
        hostname: 'eqas.alquds.edu',
      },
      {
        protocol: 'https',
        hostname: 'blog.healthtracka.com',
      },
      {
        protocol: 'https',
        hostname: 'stmarysphysicianassociates.com',
      },
      {
        protocol: 'https',
        hostname: 'www.avensonline.org',
      },
      {
        protocol: 'https',
        hostname: 'www.the-rheumatologist.org',
      },
      {
        protocol: 'https',
        hostname: 'd2csxpduxe849s.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.news-medical.net',
      },
      {
        protocol: 'https',
        hostname: 'nationalprivateinvestigators.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thomsonmedical.com',
      },
      {
        protocol: 'https',
        hostname: 'docsmedicalgroup.com',
      },
      {
        protocol: 'https',
        hostname: 'subangjayamedicalcentre.com',
      }
    ],
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