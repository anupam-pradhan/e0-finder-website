import { siteConfig } from '@/lib/site-config'

export type SeoImage = {
  path: string
  fallbackPath?: string
  width: number
  height: number
  alt: string
  title: string
  caption: string
}

export const seoImages = {
  appDownloadOg: {
    path: '/seo/e0-finder-app-download-screenshots-og.jpg',
    fallbackPath: '/seo/e0-finder-app-download-screenshots-og.webp',
    width: 1200,
    height: 630,
    title: 'E0 Finder Android app download preview',
    alt: 'E0 Finder Android app Google Play screenshots for finding E0 petrol stations in India',
    caption: 'Google Play Store screenshot preview showing E0 Finder search, map, filters, station details and report screens.',
  },
  playStoreFeature: {
    path: '/seo/e0-finder-android-app-google-play-feature-graphic.webp',
    fallbackPath: '/seo/e0-finder-android-app-google-play-feature-graphic.png',
    width: 1024,
    height: 500,
    title: 'E0 Finder Google Play feature graphic',
    alt: 'E0 Finder Google Play feature graphic showing Android app UI screenshots',
    caption: 'Official E0 Finder app feature graphic used for Google Play and website trust signals.',
  },
  playStoreScreens: {
    path: '/seo/e0-finder-android-app-google-play-screenshots.webp',
    fallbackPath: '/seo/e0-finder-android-app-google-play-screenshots.png',
    width: 1100,
    height: 538,
    title: 'E0 Finder Google Play screenshot strip',
    alt: 'E0 Finder Google Play screenshot strip showing search, live map, filters, station details and report screens',
    caption: 'Google Play Store screenshots showing the main E0 Finder user flows before install.',
  },
  screenNearby: {
    path: '/seo/e0-finder-app-nearby-station-list.webp',
    width: 820,
    height: 1686,
    title: 'Nearby station list screen',
    alt: 'E0 Finder app home screen with nearby E0 petrol and premium fuel station reports',
    caption: 'Home screen showing nearby station reports, fuel grade badges, distance and price context.',
  },
  screenLiveMap: {
    path: '/seo/e0-finder-app-live-map-petrol-stations.webp',
    width: 820,
    height: 1686,
    title: 'Live petrol station map screen',
    alt: 'E0 Finder app live map screen with reported E0 petrol station pins near the user',
    caption: 'Map screen showing nearby petrol station pins, distance markers and E0 availability indicators.',
  },
  screenDetails: {
    path: '/seo/e0-finder-app-station-details-fuel-availability.webp',
    width: 820,
    height: 1686,
    title: 'Station fuel availability details screen',
    alt: 'E0 Finder app station detail screen with E0 availability, fuel price and directions',
    caption: 'Station detail screen showing availability status, fuel details, directions and reporting actions.',
  },
  screenReport: {
    path: '/seo/e0-finder-app-report-e0-petrol-availability.webp',
    width: 820,
    height: 1686,
    title: 'Report E0 petrol availability screen',
    alt: 'E0 Finder app report form for submitting E0 petrol availability updates with proof',
    caption: 'Report screen where users can submit dated station availability observations and supporting notes.',
  },
  screenOnboarding: {
    path: '/seo/e0-finder-app-onboarding-find-e0-petrol.webp',
    width: 820,
    height: 1686,
    title: 'E0 Finder onboarding screen',
    alt: 'E0 Finder app onboarding screen for finding ethanol-free petrol stations',
    caption: 'Onboarding screen introducing the app purpose before users search for reported E0 petrol stations.',
  },
} as const satisfies Record<string, SeoImage>

export const appScreenshotImages = [
  seoImages.screenNearby,
  seoImages.screenLiveMap,
  seoImages.screenDetails,
  seoImages.screenReport,
  seoImages.screenOnboarding,
] as const

export const screenshotGalleryImages = [
  seoImages.appDownloadOg,
  seoImages.playStoreFeature,
  seoImages.playStoreScreens,
  ...appScreenshotImages,
] as const

export function absoluteImageUrl(path: string) {
  return `${siteConfig.siteUrl}${path}`
}

export function toImageObject(image: SeoImage) {
  return {
    '@type': 'ImageObject',
    '@id': `${absoluteImageUrl(image.path)}#image`,
    contentUrl: absoluteImageUrl(image.path),
    url: absoluteImageUrl(image.path),
    name: image.title,
    caption: image.caption,
    description: image.alt,
    width: image.width,
    height: image.height,
    creator: {
      '@type': 'Organization',
      name: siteConfig.appName,
      url: siteConfig.siteUrl,
    },
    creditText: siteConfig.appName,
    copyrightNotice: `Copyright 2026 ${siteConfig.appName}`,
  }
}

export const imageSitemapPages = [
  {
    loc: `${siteConfig.siteUrl}/`,
    images: [seoImages.appDownloadOg, seoImages.playStoreFeature, seoImages.playStoreScreens, seoImages.screenLiveMap],
  },
  {
    loc: `${siteConfig.siteUrl}/download`,
    images: screenshotGalleryImages,
  },
  {
    loc: `${siteConfig.siteUrl}/screenshots`,
    images: screenshotGalleryImages,
  },
  {
    loc: `${siteConfig.siteUrl}/find`,
    images: [seoImages.playStoreScreens, seoImages.screenLiveMap, seoImages.screenDetails],
  },
  {
    loc: `${siteConfig.siteUrl}/about`,
    images: [seoImages.playStoreFeature, seoImages.appDownloadOg],
  },
]