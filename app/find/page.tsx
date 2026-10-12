import type { Metadata } from 'next'
import FindE0WebPage from './find-client'
import { fetchNetworkStats } from '@/lib/supabase-stations'
import { absoluteImageUrl, seoImages, toImageObject } from '@/lib/seo-images'

const siteUrl = 'https://e0-finder.app'
const title = 'XP100 Petrol Pump Near Me — Ethanol-Free E0 Fuel Finder Map, India'
const description =
  'Find XP100, poWer100 and ethanol-free (E0) petrol pumps near me. Live search over 52,000+ mapped pumps in India by GPS, city, area or pump name, with directions and last-verified dates.'

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    'e0 fuel finder',
    'e0 finder near me',
    'ethanol free petrol pump near me',
    'xp100 petrol near me',
    'xp100 petrol pump near me',
    'e0 petrol pump near me',
    '0 ethanol petrol near me',
    'without ethanol petrol pump near me',
    'without e20 petrol pump near me',
    'non e20 petrol pump near me',
    'poWer100 petrol pump near me',
    'pure petrol near me',
  ],
  alternates: {
    canonical: '/find',
  },
  openGraph: {
    type: 'website',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/find',
    title,
    description:
      'Use the live E0 fuel finder to search XP100, poWer100 and reported ethanol-free petrol pumps near you across India.',
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
    title,
    description:
      'Search XP100, poWer100 and ethanol-free petrol pumps near you with the official E0 Finder live map.',
    images: [seoImages.appDownloadOg.path],
  },
}

const findPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/find#webpage`,
  url: `${siteUrl}/find`,
  name: title,
  description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${siteUrl}/#website` },
  primaryImageOfPage: toImageObject(seoImages.screenLiveMap),
  image: absoluteImageUrl(seoImages.appDownloadOg.path),
  primaryEntity: {
    '@type': 'WebApplication',
    '@id': `${siteUrl}/find#webapp`,
    name: 'E0 Fuel Finder',
    alternateName: ['E0 Finder Map', 'XP100 Petrol Pump Locator', 'Ethanol-Free Petrol Finder'],
    applicationCategory: 'NavigationApplication',
    operatingSystem: 'Web, Android',
    url: `${siteUrl}/find`,
    isAccessibleForFree: true,
    screenshot: [toImageObject(seoImages.screenLiveMap), toImageObject(seoImages.screenDetails)],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Find ethanol-free petrol pumps near you',
      'Search IndianOil XP100 and HPCL poWer100 stations',
      'Filter non-E20 petrol reports by city, brand and fuel grade',
      'Open turn-by-turn directions to reported petrol pumps',
    ],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Live E0 Fuel Finder', item: `${siteUrl}/find` },
  ],
}

type SearchParams = {
  q?: string | string[]
  query?: string | string[]
}

type FindPageProps = {
  searchParams: Promise<SearchParams>
}

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] || ''
  return value || ''
}

export default async function FindPage({ searchParams }: FindPageProps) {
  const params = await searchParams
  const initialQuery = firstParam(params.q) || firstParam(params.query)
  const stats = await fetchNetworkStats()
  const pumps = stats ? stats.total.toLocaleString('en-IN') : '52,000+'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(findPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Direct answer block: server-rendered so search engines and AI answer engines can quote it. */}
      <section aria-label="How this finder works" className="mx-auto max-w-7xl px-4 pt-6 lg:px-8">
        <p className="rounded-2xl border border-border bg-muted/20 px-4 py-3 text-sm leading-6 text-muted-foreground">
          <strong className="text-foreground">Looking for an XP100 or ethanol-free petrol pump near you?</strong> E0 Finder searches {pumps} petrol pumps mapped across India. Pumps that report 0% ethanol (E0), IndianOil XP100 or HPCL poWer100 are listed first, with the data source and last-verified date on each one. Use your GPS, or type a city, area, pincode or pump name. Confirm the grade at the pump before filling.
        </p>
      </section>
      <FindE0WebPage initialQuery={initialQuery} />
    </>
  )
}
