import type { Metadata } from 'next'
import FindE0WebPage from './find-client'

export const metadata: Metadata = {
  title: {
    absolute: 'E0 Finder App - Live E0 Fuel Finder & 0% Ethanol Petrol Map',
  },
  description:
    'Search the E0 Finder petrol map by city, area or postcode. Review reported fuel grades, outlet details and directions, then confirm current stock and ethanol content.',
  keywords: [
    'e0 fuel finder',
    'ethanol free petrol pump near me',
    'xp100 petrol near me',
    'xp95 petrol near me',
    'e0 petrol pump near me',
    '0 ethanol petrol near me',
    'without ethanol petrol pump near me',
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
    title: 'E0 Finder App - Live E0 Fuel Finder & 0% Ethanol Petrol Map',
    description:
      'Find petrol station reports across India. Check the exact grade, supplier information and current availability before travelling.',
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'E0 Finder app - Live 0% Ethanol Petrol Station Map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 Finder App - Live E0 Fuel Finder & 0% Ethanol Petrol Map',
    description:
      'Use the official E0 Finder live map to locate verified ethanol-free (E0) petrol pumps near you across India.',
    images: ['/playstore_feature_graphic.png'],
  },
}

export default function FindPage() {
  return <FindE0WebPage />
}
