import type { Metadata } from 'next'
import FindE0WebPage from './find-client'
import { absoluteImageUrl, seoImages, toImageObject } from '@/lib/seo-images'

const siteUrl = 'https://e0-finder.app'
const title = 'E0 Fuel Finder Near Me - XP100 Petrol Pump Map'
const description =
  'Find ethanol-free petrol pumps near you in India. Search XP100, poWer100 and non-E20 fuel reports by GPS, city or area on E0 Finder.'

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
      <FindE0WebPage initialQuery={initialQuery} />
    </>
  )
}
