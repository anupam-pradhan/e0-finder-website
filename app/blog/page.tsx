import type { Metadata } from 'next'
import BlogIndexPage from './blog-client'

export const metadata: Metadata = {
  title: 'E0 Finder Blog — Ethanol-Free Fuel Guides & Research',
  description:
    'In-depth guides and research on ethanol-free petrol in India: XP100 & poWer100, E20 engine damage, dyno tests, classic bike protection, density testing, and fuel storage.',
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
    url: '/blog',
    title: 'E0 Finder Blog — Ethanol-Free Fuel Guides & Research',
    description:
      'Research-backed guides on ethanol-free petrol, E20 engine damage, dyno tests, and fuel quality in India.',
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
    title: 'E0 Finder Blog — Ethanol-Free Fuel Guides & Research',
    description:
      'Research-backed guides on ethanol-free petrol, E20 engine damage, dyno tests, and fuel quality in India.',
    images: ['/playstore_feature_graphic.png'],
  },
}

export default function BlogPage() {
  return <BlogIndexPage />
}
