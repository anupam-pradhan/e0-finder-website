import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { citiesData } from '@/lib/city-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://e0-finder.app'

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/find`,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  staticPages.push({
    url: `${baseUrl}/fuel-cost-calculator`,
    lastModified: new Date('2026-09-07'),
    changeFrequency: 'monthly',
    priority: 0.8,
  })

  const cityPages: MetadataRoute.Sitemap = citiesData.map((city) => ({
    url: `${baseUrl}/city/${city.slug}`,
    changeFrequency: 'daily',
    priority: 0.95,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.publishedDate),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  return [...staticPages, ...cityPages, ...blogPages]
}


