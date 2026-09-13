import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all standard crawlers
      {
        userAgent: '*',
        allow: '/',
      },
      // Google Ads crawler
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      // --- AI crawler policy: allow citation/answer bots, block training bots ---
      // Citation / answer-engine crawlers (drive AI-answer traffic)
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
      },
      // Training-data crawlers (no citation benefit, opt out)
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'Applebot-Extended',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: [`${siteConfig.siteUrl}/sitemap.xml`, `${siteConfig.siteUrl}/image-sitemap.xml`],
    host: siteConfig.siteUrl,
  }
}