import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'Mediapartners-Google',
          'Googlebot',
          'Bingbot',
          'Applebot',
          'GPTBot',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: [`${siteConfig.siteUrl}/sitemap.xml`, `${siteConfig.siteUrl}/image-sitemap.xml`],
    host: siteConfig.siteUrl,
  }
}