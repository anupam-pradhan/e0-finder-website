import Link from 'next/link'
import { SitePage, PolicySection, BulletList } from '@/components/site-page'

export const metadata = {
  title: 'Privacy Policy — E0 Finder (App & Website)',
  description:
    'Comprehensive Privacy Policy and Data Safety disclosures for the E0 Finder Android application (com.anupampradhan.ethanolfreepetrol) and website.',
}

export default function PrivacyPage() {
  return (
    <SitePage
      eyebrow="Google Play & Web Compliance"
      title="Privacy Policy — E0 Finder"
      intro="Last updated: August 17, 2026. This Privacy Policy governs the E0 Finder Android application (Package: com.anupampradhan.ethanolfreepetrol) developed by Anupam Pradhan and the official website at https://e0-finder.app."
    >
      <div className="flex flex-col gap-8">
        {/* Application Overview */}
        <PolicySection title="1. Scope & Application Identity">
          <p>
            This policy applies to all users of the <strong>E0 Finder mobile application</strong> on Android and visitors to our web platform. We are committed to safeguarding your privacy and ensuring complete transparency regarding how your data is collected, used, and protected.
          </p>
        </PolicySection>

        {/* Precise Location Data Disclosure for Google Play Data Safety */}
        <PolicySection title="2. Device Location Data (GPS)">
          <p>
            <strong>Foreground Location Access (ACCESS_FINE_LOCATION / ACCESS_COARSE_LOCATION):</strong> When you grant location permissions in the E0 Finder mobile app or web browser, we access your device&apos;s real-time geographic coordinates strictly for the following purposes:
          </p>
          <BulletList
            items={[
              'Calculating exact proximity distances (in kilometres) to verified 0% ethanol petrol bunks near your vehicle.',
              'Centering the interactive map radar on your immediate driving location.',
              'Facilitating one-click turn-by-turn navigation via Google Maps to fuel dispenser forecourts.',
            ]}
          />
          <p className="mt-3">
            <strong>No Background Tracking:</strong> E0 Finder does NOT track, record, or transmit your device location in the background when the application is closed. Location data is processed ephemerally on-device and is <strong>never sold, rented, or shared with third parties for advertising purposes</strong>. You may disable location permissions at any time via your Android device settings.
          </p>
        </PolicySection>

        {/* Camera and Media Permissions */}
        <PolicySection title="3. Camera & Storage Permissions (Community Submissions)">
          <p>
            When you choose to report a new fuel station or submit a Form-8 density verification, the app may request permission to access your camera or photo gallery. This is used solely to:
          </p>
          <BulletList
            items={[
              'Allow you to capture or upload photos of fuel dispenser meters and Form-8 density logs.',
              'Validate community fuel reports and prevent spam entries.',
            ]}
          />
          <p className="mt-2">
            Uploading photos is completely optional. You can use all search and navigation features without granting camera or photo storage access.
          </p>
        </PolicySection>

        {/* Cookies & Google AdSense */}
        <PolicySection title="4. Cookies & Google AdSense Advertising">
          <p>
            We use Google AdSense and third-party advertising partners to serve advertisements when you visit our website. Google uses cookies, including the DoubleClick DART cookie, to serve relevant ads based on prior visits to this website or other internet sites.
          </p>
          <p className="mt-2">
            You can opt out of personalized advertising by visiting Google Ads Settings at{' '}
            <a
              className="font-semibold text-primary hover:underline"
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noreferrer"
            >
              google.com/settings/ads
            </a>{' '}
            or by visiting{' '}
            <a
              className="font-semibold text-primary hover:underline"
              href="https://www.aboutads.info"
              target="_blank"
              rel="noreferrer"
            >
              aboutads.info
            </a>
            .
          </p>
        </PolicySection>

        {/* Third-Party Service Providers */}
        <PolicySection title="5. Third-Party SDKs & Service Providers">
          <p>We may utilize trusted third-party service providers to facilitate app functionality:</p>
          <BulletList
            items={[
              'Google Play Services: For core application runtime and standard platform APIs.',
              'OpenStreetMap / CartoDB: For vector map tile rendering.',
              'Vercel Analytics: For aggregated, anonymous performance and crash telemetry.',
            ]}
          />
        </PolicySection>

        {/* User Data Deletion & Rights */}
        <PolicySection title="6. User Data Deletion & Retention (Google Play Data Safety Compliance)">
          <p>
            We retain personal information only as long as necessary to provide service features and fulfill legitimate legal and security obligations.
          </p>
          <p className="mt-2">
            In compliance with Google Play Developer Policies, you have the right to request permanent deletion of your account and any submitted fuel data at any time:
          </p>
          <div className="mt-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-foreground">
              To request account or data deletion, visit our dedicated deletion portal:
            </p>
            <Link
              href="/delete-account"
              className="mt-2 inline-flex items-center gap-1.5 font-bold text-primary hover:underline text-sm"
            >
              👉 Visit Account & Data Deletion Portal (/delete-account)
            </Link>
            <p className="mt-2 text-xs text-muted-foreground">
              Or email our data protection team directly at{' '}
              <a className="font-semibold text-primary hover:underline" href="mailto:support@e0-finder.app">
                support@e0-finder.app
              </a>
              . Data is permanently purged within 24–48 hours.
            </p>
          </div>
        </PolicySection>

        {/* Children's Privacy */}
        <PolicySection title="7. Children’s Privacy (COPPA Compliance)">
          <p>
            E0 Finder is intended for licensed automotive drivers and motorists. The application and website are not directed to children under 13 years of age, and we do not knowingly collect personal information from children.
          </p>
        </PolicySection>

        {/* Contact Us */}
        <PolicySection title="8. Contact Information & Publisher Identity">
          <p>
            If you have any questions, concerns, or privacy inquiries regarding this Privacy Policy or the E0 Finder app, please contact:
          </p>
          <div className="mt-2 text-sm">
            <p className="font-bold text-foreground">E0 Finder Team</p>
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
