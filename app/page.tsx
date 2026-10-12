import type { Metadata } from 'next'
import HomeClient from './home-client'
import { blogPosts, toBlogSummary } from '@/lib/blog-data'
import { siteConfig } from '@/lib/site-config'
import { citiesData } from '@/lib/city-data'
import { fetchCityStats, fetchNetworkStats, fetchStateCoverage } from '@/lib/supabase-stations'
import { statesData } from '@/lib/state-data'
import { absoluteImageUrl, seoImages, toImageObject } from '@/lib/seo-images'

export const metadata: Metadata = {
  title: {
    absolute: 'E0 Finder — Official App for Ethanol-Free E0 Petrol in India (52,000+ Pumps)',
  },
  description:
    'E0 Finder is the official Android app on Google Play for ethanol-free petrol near me. 52,000+ pumps mapped on Google Maps with XP100, poWer100 and 0% ethanol reports, data source and last-verified date on every pump.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/',
    title: 'E0 Finder — Official App for Ethanol-Free E0 Petrol in India (52,000+ Pumps)',
    description:
      'The official E0 Finder app and website. 52,000+ petrol pumps mapped across India with XP100, poWer100 and 0% ethanol reports, directions and real last-verified dates.',
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
    title: 'E0 Finder — Find Ethanol-Free E0 Petrol Near You in India',
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
  name: 'E0 Finder — Find Ethanol-Free E0 Petrol Near You in India',
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

// Pump counts come from the live catalogue; refresh daily.
export const revalidate = 86400

const homeCitySlugs = ['bangalore', 'delhi', 'mumbai', 'pune', 'hyderabad', 'chennai', 'kolkata', 'chandigarh', 'jaipur', 'kochi', 'ahmedabad', 'goa']

async function loadCityCounts(): Promise<Record<string, number>> {
  const entries = await Promise.all(
    homeCitySlugs.map(async (slug) => {
      const name = citiesData.find((c) => c.slug === slug)?.name
      const stats = await fetchCityStats([name ?? slug, slug.replace(/-/g, ' ')])
      return [slug, stats?.total ?? 0] as const
    }),
  )
  return Object.fromEntries(entries.filter(([, n]) => n > 0))
}

export default async function Page() {
  const [networkStats, cityCounts, stateCoverage] = await Promise.all([fetchNetworkStats(), loadCityCounts(), fetchStateCoverage(statesData.slice(0, 12))])
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
      <HomeClient posts={blogPosts.slice(0, 6).map(toBlogSummary)} totalPosts={blogPosts.length} networkStats={networkStats} cityCounts={cityCounts} stateCoverage={stateCoverage} />
    </>
  )
}
