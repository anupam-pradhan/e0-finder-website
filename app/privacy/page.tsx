import Link from 'next/link'
import { SitePage, PolicySection, BulletList } from '@/components/site-page'

export const metadata = {
  title: 'Privacy Policy — E0 Finder (App & Website)',
  description:
    'How the E0 Finder Android app (com.anupampradhan.ethanolfreepetrol) and e0-finder.app collect, use, store and share data, including location, reports, maps and third-party services.',
  alternates: {
    canonical: '/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <SitePage
      eyebrow="Google Play & Web Compliance"
      title="Privacy Policy — E0 Finder"
      intro="Last updated: October 12, 2026. This policy covers the E0 Finder Android app (package com.anupampradhan.ethanolfreepetrol), developed by Anupam Pradhan, and the website at https://e0-finder.app. It explains what data we collect, why, who processes it, how long we keep it, and how to delete it."
    >
      <div className="flex flex-col gap-8">
        <PolicySection title="1. Summary">
          <BulletList
            items={[
              'You can search, browse the map and get directions without creating an account.',
              'Location is used in the foreground to show pumps near you. We do not track you in the background or sell location data.',
              'Fuel reports you submit are public, shown with the display name you choose. The exact position used to check a report is not published.',
              'Pump data comes from our own catalogue, oil company locators, community reports, Google Maps and OpenStreetMap.',
              'You can delete your account and all your reports from inside the app or through our deletion page.',
            ]}
          />
        </PolicySection>

        <PolicySection title="2. Location (GPS)">
          <p>
            With your permission (ACCESS_FINE_LOCATION / ACCESS_COARSE_LOCATION, foreground only), the app reads your device location to:
          </p>
          <BulletList
            items={[
              'Show pumps near you and their distance in kilometres.',
              'Center the map on you and load pumps for the area you are viewing.',
              'Open directions in Google Maps when you tap Directions or Navigate.',
              'Confirm, when you submit a fuel report, that you are near that pump.',
              'Send nearby E0 alerts, if you turn alerts on.',
            ]}
          />
          <p className="mt-3">What leaves your device, and why:</p>
          <BulletList
            items={[
              'Map area: to load pumps, the app sends the coordinates of the area on screen (not your identity) to our pump catalogue (Supabase) and, for areas with no listed pumps, to our map service (Cloudflare Workers), which may query Google Maps Places.',
              'Fuel reports: your current position and its accuracy are sent to our server (Firebase Cloud Functions) to check you are at the pump. The coordinates are checked and discarded; only the accuracy value is stored with the report.',
              'Alerts: if you turn on price or E0 alerts while signed in, the approximate location you choose is saved to your account so we can notify you about pumps within about 100 km.',
            ]}
          />
          <p className="mt-3">
            <strong>No background tracking.</strong> The app does not collect location when it is closed or in the background. You can turn location off at any time in Android settings; search by city or area still works.
          </p>
        </PolicySection>

        <PolicySection title="3. Data stored on your device">
          <p>
            To make the map open instantly and work offline, the app stores pump listings within about 100 km of you on your phone, together with your app settings, recent searches, recently viewed pumps and unsent report drafts. This data stays on your device. It is removed when you clear the app&apos;s data or uninstall the app.
          </p>
        </PolicySection>

        <PolicySection title="4. Accounts and community reports">
          <BulletList
            items={[
              'Account (optional): if you sign in with Google or email, we store your name, email address, profile photo (if you add one), favorites, notification preferences and report history in Firebase.',
              'Guest reports: if you report without an account, we create an anonymous session and store the display name you enter with the report.',
              'Report content: fuel availability, the fuel type you checked (for example XP100), pump rating, an optional note and an optional photo (dispenser sticker, bill or density reading). Reports, with your display name, are shown publicly in the app and on the website after review.',
              'Photos are stored in Cloudflare R2. Camera and photo access are requested only when you choose to add a photo, and are never required.',
              'Abuse prevention: we keep per-user report limits and App Check results so we can block spam and fake reports.',
            ]}
          />
        </PolicySection>

        <PolicySection title="5. Notifications">
          <p>
            If you allow notifications, the app registers a Firebase Cloud Messaging token with your account so we can send report updates, nearby E0 alerts and app update notices. You can turn notifications off in the app or in Android settings at any time.
          </p>
        </PolicySection>

        <PolicySection title="6. Diagnostics and analytics">
          <BulletList
            items={[
              'Firebase Crashlytics collects crash reports (device model, OS version, app version and the error) so we can fix bugs.',
              'Firebase Analytics records how features are used (for example screens opened and searches made) with device and app information. We use it only in aggregate to improve the app.',
              'The website uses Vercel Analytics for anonymous, aggregated page performance data.',
            ]}
          />
        </PolicySection>

        <PolicySection title="7. Maps and pump data sources">
          <BulletList
            items={[
              'Google Maps SDK for Android displays the map in the app. Google receives map requests from your device under the Google Privacy Policy.',
              'Google Maps Places provides some pump listings and search results. Search text and map-area coordinates are sent to Google for these lookups.',
              'OpenStreetMap contributors (via Overpass and Photon) provide fallback pump data. The website and the web version of the app show map tiles from OpenStreetMap and CARTO, which receive your IP address when tiles load.',
              'Oil company outlet locators (for example HPCL) and community reports supply fuel-grade information.',
              'Directions open in the Google Maps app or website, which is governed by Google’s own privacy policy.',
            ]}
          />
        </PolicySection>

        <PolicySection title="8. Service providers we use">
          <p>We do not sell personal data. We share it only with providers that run the service for us:</p>
          <BulletList
            items={[
              'Google Firebase (Authentication, Firestore, Cloud Functions, Cloud Messaging, App Check, Analytics, Crashlytics): accounts, reports, notifications, security and diagnostics.',
              'Supabase: the public pump catalogue the app reads from.',
              'Cloudflare (Workers and R2): map gap-filling and report photo storage.',
              'Google Maps Platform: map display, place search and directions.',
              'OpenStreetMap, CARTO: fallback pump data and map tiles.',
              'Vercel: website hosting and analytics. Google AdSense: website advertising (see section 9).',
            ]}
          />
          <p className="mt-3">
            Some providers process data outside India. They are bound by their own privacy and security commitments.
          </p>
        </PolicySection>

        <PolicySection title="9. Website cookies and advertising">
          <p>
            The website uses Google AdSense, which uses cookies (including the DoubleClick cookie) to show ads based on your visits to this and other sites. The Android app does not show ads. You can opt out of personalized advertising at{' '}
            <a className="font-semibold text-primary hover:underline" href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
              google.com/settings/ads
            </a>{' '}
            or{' '}
            <a className="font-semibold text-primary hover:underline" href="https://www.aboutads.info" target="_blank" rel="noreferrer">
              aboutads.info
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection title="10. Retention and deletion">
          <BulletList
            items={[
              'Account data is kept while your account exists.',
              'Reports and photos are kept while they help other riders, and are deleted when you delete your account.',
              'Unfinished report drafts expire after one hour.',
              'Crash and analytics data are kept for the default retention periods of Firebase.',
            ]}
          />
          <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-foreground">Delete your account and data</p>
            <p className="mt-1 text-sm text-muted-foreground">
              In the app, open Settings, then Privacy &amp; Security, and choose Delete account. This removes your account, profile, favorites, notification tokens, reports and report photos. You can also use the{' '}
              <Link href="/delete-account" className="font-semibold text-primary hover:underline">
                account deletion page
              </Link>{' '}
              or email{' '}
              <a className="font-semibold text-primary hover:underline" href="mailto:support@e0-finder.app">
                support@e0-finder.app
              </a>
              . Requests by email are completed within 48 hours.
            </p>
          </div>
        </PolicySection>

        <PolicySection title="11. Security">
          <p>
            Data is sent over HTTPS. Firebase App Check and server-side rules restrict who can write reports, and report coordinates are validated on the server and not published. No method of storage or transfer is completely secure, but we work to protect your data.
          </p>
        </PolicySection>

        <PolicySection title="12. Children">
          <p>
            E0 Finder is meant for drivers and riders. It is not directed at children under 13, and we do not knowingly collect their personal data. If you believe a child has given us data, contact us and we will delete it.
          </p>
        </PolicySection>

        <PolicySection title="13. Changes to this policy">
          <p>
            We will update this page when the app or website changes how data is handled, and change the date at the top. Significant changes will also be announced in the app.
          </p>
        </PolicySection>

        <PolicySection title="14. Contact">
          <div className="text-sm">
            <p className="font-bold text-foreground">E0 Finder</p>
            <p className="text-muted-foreground">Developer: Anupam Pradhan</p>
            <p className="text-muted-foreground">
              Email:{' '}
              <a className="font-semibold text-primary hover:underline" href="mailto:support@e0-finder.app">
                support@e0-finder.app
              </a>
            </p>
            <p className="text-muted-foreground">
              Website:{' '}
              <a className="font-semibold text-primary hover:underline" href="https://e0-finder.app">
                https://e0-finder.app
              </a>
            </p>
          </div>
        </PolicySection>
      </div>
    </SitePage>
  )
}
