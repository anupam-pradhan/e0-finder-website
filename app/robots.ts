import { MetadataRoute } from 'next'

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
    sitemap: 'https://e0-finder.app/sitemap.xml',
    host: 'https://e0-finder.app',
  }
}

