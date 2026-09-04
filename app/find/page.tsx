import type { Metadata } from 'next'
import FindE0WebPage from './find-client'
import { getStationsServer } from '@/lib/stations-server'

export const revalidate = 60 // ISR: Revalidate server-rendered station listings every 60 seconds

export const metadata: Metadata = {
  title: {
    absolute: 'E0 Fuel Finder — 0% Ethanol & XP100 Petrol Pumps Near You',
  },
  description:
    'Find verified 0% ethanol (E0) petrol pumps near you — IndianOil XP100, HPCL poWer100, BPCL Speed 97 & XP95. Live map, real-time availability, density checks & directions.',
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
    url: '/find',
    title: 'E0 Fuel Finder — 0% Ethanol & XP100 Petrol Pumps Near You',
    description:
      'Locate verified ethanol-free (E0) petrol pumps near you across India — XP100, poWer100, Speed 97 & XP95 — with a live map and directions.',
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'E0 Fuel Finder — Live 0% Ethanol Petrol Station Map',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 Fuel Finder — 0% Ethanol & XP100 Petrol Pumps Near You',
    description:
      'Locate verified ethanol-free (E0) petrol pumps near you across India — XP100, poWer100, Speed 97 & XP95 — with a live map and directions.',
    images: ['/playstore_feature_graphic.png'],
  },
}

export default async function FindPage() {
  const serverStations = await getStationsServer()
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  return <FindE0WebPage initialStations={serverStations} googleMapsApiKey={googleMapsApiKey} />
}
