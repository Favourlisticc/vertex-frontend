/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lekkilab.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*'],
      },
    ],
  },
}