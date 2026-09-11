import type { Metadata } from 'next'
import HomeClient from './home-client'
import { blogPosts, toBlogSummary } from '@/lib/blog-data'
import { siteConfig } from '@/lib/site-config'
import { absoluteImageUrl, seoImages, toImageObject } from '@/lib/seo-images'

export const metadata: Metadata = {
  title: {
    absolute: 'E0 Finder App - E0 Fuel Finder and Petrol Map India',
  },
  description:
    'Official E0 Finder app for ethanol-free petrol in India. Find E0 fuel, XP100 pumps and non-E20 petrol near you with live map reports.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/',
    title: 'E0 Finder App - E0 Fuel Finder and Petrol Map India',
    description:
      'Official E0 Finder app and website for ethanol-free petrol stations across India, with live pump reports, XP100 locations and navigation.',
    images: [
      {
        url: seoImages.appDownloadOg.path,
        width: seoImages.appDownloadOg.width,
        height: seoImages.appDownloadOg.height,
        alt: seoImages.appDownloadOg.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 Finder App - E0 Fuel Finder and Petrol Map India',
    description:
      'Find E0 fuel, XP100 pumps and ethanol-free petrol stations near you across India.',
    images: [seoImages.appDownloadOg.path],
  },
}

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteConfig.siteUrl}/#webpage`,
  url: `${siteConfig.siteUrl}/`,
  name: 'E0 Finder App - E0 Fuel Finder and Petrol Map India',
  description: 'Official E0 Finder app for ethanol-free petrol in India, XP100 pump discovery and non-E20 petrol station reports.',
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
  about: { '@id': `${siteConfig.siteUrl}/#software` },
  primaryImageOfPage: toImageObject(seoImages.appDownloadOg),
  image: absoluteImageUrl(seoImages.appDownloadOg.path),
  hasPart: { '@id': `${siteConfig.siteUrl}/screenshots#gallery` },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.siteUrl}/#website`,
  url: `${siteConfig.siteUrl}/`,
  name: 'E0 Finder',
  alternateName: ['EO Finder', 'E Zero Finder', 'E0 Fuel Finder', 'eofinder', 'e0-finder.app'],
  description:
    'E0 Finder helps Indian motorists find ethanol-free petrol, XP100 pumps, poWer100 pumps and non-E20 fuel reports.',
  inLanguage: 'en-IN',
  publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
  relatedLink: [`${siteConfig.siteUrl}/download`, `${siteConfig.siteUrl}/about`, `${siteConfig.siteUrl}/methodology`],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.siteUrl}/find?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient posts={blogPosts.slice(0, 6).map(toBlogSummary)} totalPosts={blogPosts.length} />
    </>
  )
}
