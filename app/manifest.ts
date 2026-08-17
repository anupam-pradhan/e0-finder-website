import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'E0 Finder — Ethanol-Free Petrol Stations Locator',
    short_name: 'E0 Finder',
    description: 'Find verified 0% ethanol petrol stations near you in real-time across India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#15803d',
    icons: [
      {
        src: '/icons/Icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/Icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/app-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
