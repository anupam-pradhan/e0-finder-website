import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'E0 Finder - E0 Fuel Finder and Petrol Pump Map',
    short_name: 'E0 Finder',
    description: 'Find E0 fuel, XP100 pumps and ethanol-free petrol stations near you across India.',
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
