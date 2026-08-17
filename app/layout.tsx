import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = 'https://e0-finder.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'E0 Finder — Find 0% Ethanol Petrol Stations in India',
    template: '%s | E0 Finder',
  },
  description:
    'Find verified ethanol-free (0% ethanol / E0) petrol pumps near you across India. Real-time availability, live community reports, directions, and fuel guides for bikes and cars.',
  keywords: [
    'E0 petrol',
    '0% ethanol petrol stations',
    'ethanol free petrol India',
    'find pure petrol near me',
    'XP95 0 percent ethanol',
    'Speed 97 ethanol free',
    'E0 petrol pumps locator',
    'ethanol free petrol pump Delhi',
    'ethanol free petrol pump Bangalore',
    'ethanol free petrol pump Mumbai',
    'ethanol free petrol pump Pune',
    'ethanol free petrol pump Hyderabad',
    'ethanol free petrol pump Chennai',
    'E20 petrol disadvantages',
    'ethanol blending in petrol India',
    'E0 Finder app',
    'fuel pump finder India',
  ],
  authors: [{ name: 'E0 Finder Team', url: siteUrl }],
  creator: 'E0 Finder',
  publisher: 'E0 Finder',
  applicationName: 'E0 Finder',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'E0 Finder — Find 0% Ethanol Petrol Stations in India',
    description:
      'Locate verified ethanol-free petrol pumps in real-time. Community verified, live updates, and navigation to pure E0 fuel near you.',
    siteName: 'E0 Finder',
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'E0 Finder — 0% Ethanol Petrol Stations Locator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 Finder — Find 0% Ethanol Petrol Stations in India',
    description:
      'Find verified 0% ethanol petrol stations in real-time. Protect your engine with pure E0 fuel.',
    images: ['/playstore_feature_graphic.png'],
  },
  icons: {
    icon: [
      {
        url: '/icons/Icon-192.png',
      },
      {
        url: '/app-icon.png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/app-icon.png',
  },
  category: 'Navigation & Fuel',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'E0 Finder',
  operatingSystem: 'Android',
  applicationCategory: 'NavigationApplication',
  applicationSubCategory: 'Automotive & Fuel',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1240',
    bestRating: '5',
    worstRating: '1',
  },
  description:
    'E0 Finder helps motorists find verified ethanol-free (0% ethanol) petrol stations across India in real-time with community-driven updates and live navigation.',
  screenshot: 'https://e0-finder.app/playstore_feature_graphic.png',
  installUrl:
    'https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol',
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'E0 Finder',
  url: 'https://e0-finder.app',
  logo: 'https://e0-finder.app/app-icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@e0-finder.app',
    contactType: 'customer support',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
