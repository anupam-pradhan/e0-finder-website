import type { Metadata } from 'next'
import BlogIndexPage from './blog-client'
import { blogPosts, toBlogSummary } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: { absolute: 'E0 Finder Guides - Petrol Grades, E20 and Fuel Costs' },
  description:
    'Read E0 Finder guides on XP100, poWer100, Shell V-Power, ethanol blends, vehicle compatibility and fuel costs, with supplier references and practical checks.',
  keywords: [
    'ethanol free petrol blog',
    'E20 petrol disadvantages',
    'E0 vs E20 mileage',
    'XP95 Speed 97 ethanol',
    'petrol density test India',
    'ethanol damage bikes cars',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/blog',
    title: 'E0 Finder Guides - Petrol Grades, E20 and Fuel Costs',
    description:
      'Petrol-grade explainers, supplier references, compatibility checklists and fuel-cost calculations for Indian motorists.',
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'E0 Finder Blog — Ethanol-Free Fuel Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 Finder Guides - Petrol Grades, E20 and Fuel Costs',
    description:
      'Petrol-grade explainers, supplier references, compatibility checklists and fuel-cost calculations for Indian motorists.',
    images: ['/playstore_feature_graphic.png'],
  },
}

export default function BlogPage() {
  return <BlogIndexPage posts={blogPosts.map(toBlogSummary)} />
}
