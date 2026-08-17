import Link from 'next/link'
import { SitePage, PolicySection, BulletList } from '@/components/site-page'

export const metadata = {
  title: 'Terms of Service — E0 Finder (App & Website)',
  description:
    'Terms of Service, community guidelines, and legal disclaimer for the E0 Finder mobile application and website.',
}

export default function TermsPage() {
  return (
    <SitePage
      eyebrow="Legal & Terms"
      title="Terms of Service — E0 Finder"
      intro="Last updated: August 17, 2026. Please read these Terms of Service carefully before using the E0 Finder Android application (Package: com.anupampradhan.ethanolfreepetrol) or the website at https://e0-finder.app."
    >
      <div className="flex flex-col gap-8">
        {/* Agreement to Terms */}
        <PolicySection title="1. Agreement to Terms">
          <p>
            By downloading, installing, accessing, or using <strong>E0 Finder</strong> (the &quot;App&quot; or &quot;Service&quot;), developed by Anupam Pradhan, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you must discontinue use immediately.
          </p>
        </PolicySection>

        {/* Nature of Service */}
        <PolicySection title="2. Description of the Service">
          <p>
            E0 Finder is a specialized crowd-sourced and verified information platform designed to assist Indian motorists, motorcyclists, and vehicle owners in identifying retail petrol pumps dispensing 0% ethanol petrol (E0), 100-octane premium fuels (such as IndianOil XP100 and HPCL poWer100), and unblended batches.
          </p>
          <p className="mt-2">
            The Service provides geographic pump mapping, distance calculations, crowd-verified fuel density registers, user reviews, and third-party turn-by-turn navigation links.
          </p>
        </PolicySection>

        {/* Accuracy of Fuel Data & Disclaimer */}
        <PolicySection title="3. Community Fuel Data & Density Disclaimer">
          <p>
            While E0 Finder utilizes automated checks and community moderation to ensure fuel listings and Form-8 density numbers are accurate and up-to-date:
          </p>
          <BulletList
            items={[
              'Fuel availability, real-time inventory, retail prices, and pump operating hours are subject to change without notice by individual Oil Marketing Companies (OMCs) and independent dealer franchises.',
              'Motorists are advised to inspect the morning Form-8 Density Register and dispenser labels at the forecourt prior to fueling.',
              'E0 Finder is an independent information utility and is not an authorized retailer or subsidiary of any state or private oil marketing company.',
            ]}
          />
        </PolicySection>

        {/* Acceptable Use & Conduct */}
        <PolicySection title="4. Acceptable Community Use & Guidelines">
          <p>When using the Service or submitting fuel station reports, you agree to:</p>
          <BulletList
            items={[
              'Provide authentic, accurate, and truthful station names, fuel grades, and observed density readings.',
              'Upload only genuine photos of fuel dispensers, pricing boards, or receipts that you personally captured.',
              'Never submit fraudulent, abusive, defamatory, or commercially deceptive listings.',
              'Never attempt to scrape, reverse engineer, overload, or disrupt the Service infrastructure.',
            ]}
          />
          <p className="mt-2">
            We reserve the right to remove any submission or suspend access for users violating community standards.
          </p>
        </PolicySection>

        {/* Intellectual Property & Trademark Notice */}
        <PolicySection title="5. Intellectual Property & Trademark Notice">
          <p>
            All application software, algorithms, user interface designs, custom map pins, logos, and original written research articles are the intellectual property of E0 Finder and Anupam Pradhan.
          </p>
          <p className="mt-2">
            <strong>Nominative Fair Use Notice:</strong> Trademarks and brand names, including <em>IndianOil, XP100, XP95, Bharat Petroleum, Speed 97, Hindustan Petroleum, poWer100, Shell, and Jio-bp</em>, are the registered trademarks of their respective corporate owners. Their use within E0 Finder is strictly for identification, consumer informational reference, and geographic navigation purposes under nominative fair use principles.
          </p>
        </PolicySection>

        {/* Third-Party Navigation & External Services */}
        <PolicySection title="6. Third-Party Maps & Navigation">
          <p>
            The Service contains links to external navigation providers (e.g. Google Maps, Apple Maps) and vector map tiles (OpenStreetMap, CartoDB). E0 Finder is not responsible for the accuracy of external road networks, GPS routing, or traffic conditions.
          </p>
        </PolicySection>

        {/* Limitation of Liability */}
        <PolicySection title="7. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable Indian law, E0 Finder, its developer, and contributors shall not be liable for any direct, indirect, incidental, consequential, or vehicular damages resulting from:
          </p>
          <BulletList
            items={[
              'Fuel selection decisions or mechanical issues arising from fuel purchased at any mapped pump.',
              'Inaccuracies in station operating hours, pricing, or temporary dispenser stock-outs.',
              'Navigation deviations, road conditions, or travel delays.',
              'Temporary service interruptions or maintenance downtime.',
            ]}
          />
          <p className="mt-2">
            Always consult your vehicle manufacturer&apos;s owner manual regarding recommended minimum octane ratings and ethanol compatibility.
          </p>
        </PolicySection>

        {/* Data Deletion & Privacy Policy Reference */}
        <PolicySection title="8. Privacy & User Data Rights">
          <p>
            Your privacy is of utmost importance to us. Please review our comprehensive{' '}
            <Link href="/privacy" className="font-semibold text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            to understand how location coordinates, photos, and analytics data are handled.
          </p>
          <p className="mt-2">
            To request permanent deletion of your account and submitted data, visit our{' '}
            <Link href="/delete-account" className="font-semibold text-primary hover:underline">
              Account Deletion Portal
            </Link>
            .
          </p>
        </PolicySection>

        {/* Governing Law */}
        <PolicySection title="9. Governing Law & Jurisdiction">
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with the Service shall be subject to the exclusive jurisdiction of the competent courts in India.
          </p>
        </PolicySection>

        {/* Contact Information */}
        <PolicySection title="10. Contact & Questions">
          <p>
            If you have any questions or require clarification regarding these Terms of Service, please contact our legal and support team:
          </p>
          <div className="mt-2 text-sm">
            <p className="font-bold text-foreground">E0 Finder Legal & Support</p>
            <p className="text-muted-foreground">
              Email:{' '}
              <a className="font-semibold text-primary hover:underline" href="mailto:support@e0-finder.app">
                support@e0-finder.app
              </a>
            </p>
            <p className="text-muted-foreground">
              Support Hub:{' '}
              <Link className="font-semibold text-primary hover:underline" href="/contact">
                https://e0-finder.app/contact
              </Link>
            </p>
          </div>
        </PolicySection>
      </div>
    </SitePage>
  )
}
