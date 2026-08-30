import type { Metadata } from 'next'
import ContactPage from './contact-client'

export const metadata: Metadata = {
  title: 'Contact E0 Finder — Support & Partnerships',
  description:
    'Get in touch with the E0 Finder team for app support, account and data deletion, business partnerships, or to report incorrect petrol station information.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    type: 'website',
    url: '/contact',
    title: 'Contact E0 Finder — Support & Partnerships',
    description:
      'Reach the E0 Finder team for support, data deletion, partnerships, or to report station information.',
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'Contact E0 Finder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact E0 Finder — Support & Partnerships',
    description:
      'Reach the E0 Finder team for support, data deletion, partnerships, or to report station information.',
    images: ['/playstore_feature_graphic.png'],
  },
}

export default function ContactRoute() {
  return <ContactPage />
}
