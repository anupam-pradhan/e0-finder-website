import type { Metadata } from 'next'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: {
    absolute: 'E0 Finder App - Official 0% Ethanol Petrol Station Locator India',
  },
  description:
    'E0 Finder (E Zero Finder) is the official app and website for finding verified 0% ethanol petrol stations across India. Search XP100, poWer100 and Speed 97 pumps with live availability and directions.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/',
    title: 'E0 Finder App - Official 0% Ethanol Petrol Station Locator India',
    description:
      'Official E0 Finder app and website for verified 0% ethanol petrol stations across India, with live pump availability and navigation.',
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'E0 Finder official app - 0% ethanol petrol station locator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 Finder App - Official 0% Ethanol Petrol Station Locator India',
    description:
      'Official E0 Finder app and website for verified 0% ethanol petrol stations across India.',
    images: ['/playstore_feature_graphic.png'],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://e0-finder.app/#website',
  url: 'https://e0-finder.app/',
  name: 'E0 Finder',
  alternateName: ['E Zero Finder', 'e0-finder.app'],
  publisher: { '@id': 'https://e0-finder.app/#organization' },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  )
}
