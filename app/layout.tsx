import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { AppInstallBar } from '@/components/app-install-bar'
import { siteConfig } from '@/lib/site-config'
import { absoluteImageUrl, screenshotGalleryImages, seoImages, toImageObject } from '@/lib/seo-images'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

const siteUrl = siteConfig.siteUrl
const playStoreUrl = siteConfig.playStoreUrl

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'E0 Finder — Official Ethanol-Free E0 Petrol Pump Finder App, India',
    template: '%s | E0 Finder',
  },
  description:
    'Official E0 Finder app: ethanol-free petrol near me across India. 52,000+ pumps on Google Maps with XP100, poWer100 and 0% ethanol reports, directions and last-verified dates.',
  keywords: [
    'E0 Finder',
    'EO Finder',
    'E0 fuel finder',
    'E0 petrol',
    '0% ethanol petrol stations',
    'ethanol free petrol India',
    'find pure petrol near me',
    'XP100 petrol near me',
    'without ethanol petrol pump near me',
    'non E20 petrol pump near me',
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
    title: 'E0 Finder — Ethanol-Free E0 Petrol Pump Finder India',
    description:
      'Search E0 fuel, XP100 pumps and reported ethanol-free petrol stations near you with live map updates and navigation.',
    siteName: 'E0 Finder',
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
    title: 'E0 Finder — Ethanol-Free E0 Petrol Pump Finder India',
    description:
      'Find E0 fuel, XP100 pumps and ethanol-free petrol stations near you in India.',
    images: [seoImages.appDownloadOg.path],
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
  '@id': `${siteUrl}/#software`,
  name: 'E0 Finder',
  alternateName: ['E0 Finder App', 'EO Finder', 'E Zero Finder', 'E0 Fuel Finder', 'E0 Petrol Pump Locator', 'XP100 Petrol Pump Locator', 'e0-finder.app'],
  url: siteUrl,
  operatingSystem: 'Android',
  applicationCategory: 'NavigationApplication',
  applicationSubCategory: 'Automotive & Fuel',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  featureList: [
    'E0 fuel finder for ethanol-free petrol pumps',
    'XP100 and poWer100 station reports',
    'City and GPS-based petrol pump search',
    'Fuel-grade and non-E20 station filtering',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: playStoreUrl,
  },
  softwareVersion: siteConfig.appVersion,
  dateModified: siteConfig.lastUpdated,
  publisher: { '@id': `${siteUrl}/#organization` },
  author: { '@id': `${siteUrl}/#organization` },
  description:
    'E0 Finder maps 52,000+ petrol pumps across India on Google Maps and flags XP100, poWer100 and reported 0% ethanol (E0) outlets, with the data source and last-verified date on every pump.',
  image: [absoluteImageUrl(seoImages.appDownloadOg.path), absoluteImageUrl(seoImages.playStoreFeature.path), absoluteImageUrl(seoImages.playStoreScreens.path)],
  screenshot: screenshotGalleryImages.map(toImageObject),
  subjectOf: {
    '@type': 'ImageGallery',
    '@id': `${siteUrl}/screenshots#gallery`,
    url: `${siteUrl}/screenshots`,
    name: 'E0 Finder app screenshots',
  },
  downloadUrl: playStoreUrl,
  installUrl: playStoreUrl,
  sameAs: [playStoreUrl],
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'E0 Finder',
  disambiguatingDescription:
    'E0 Finder (e0-finder.app) is the Android app and website by Anupam Pradhan that maps 52,000+ Indian petrol pumps. It is not affiliated with e0fuel.in, e0-finder.com or any other product using a similar name.',
  alternateName: ['E0 Finder App', 'EO Finder', 'E Zero Finder', 'E0 Fuel Finder', 'E0 Petrol Pump Locator'],
  url: siteUrl,
  logo: `${siteUrl}/app-icon.png`,
  sameAs: [
    playStoreUrl,
    'https://www.linkedin.com/in/anupam-pradhan/',
  ],
  founder: {
    '@type': 'Person',
    name: siteConfig.founderName,
    url: 'https://www.linkedin.com/in/anupam-pradhan/',
    sameAs: ['https://www.linkedin.com/in/anupam-pradhan/'],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.supportEmail,
    contactType: 'customer support',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
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
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702804360140517"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <AppInstallBar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
