import Link from 'next/link'
import { ChevronRight, ShieldCheck, Fuel, AlertOctagon, HelpCircle } from 'lucide-react'
import { VehiclesClient } from './vehicles-client'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

const url = `${siteConfig.siteUrl}/vehicles`
const title = 'E20 Fuel Vehicle Compatibility Checker — Bikes & Cars Guide [2026]'
const description =
  'Check if your motorcycle or car is safe for E20 petrol in India. Compatibility guide for KTM Duke, Royal Enfield, Yamaha, Kawasaki, Skoda/VW TSI, Mahindra, and classic engines.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'E20 fuel compatibility India',
    'can I use E20 petrol in KTM Duke 390',
    'Royal Enfield E20 petrol problems',
    'Skoda TSI ethanol damage',
    'superbike ethanol free petrol India',
    'which cars need E0 petrol',
    'E20 bike compatibility list',
    'XP100 recommended bikes',
    'pure petrol for cars India',
  ],
  alternates: {
    canonical: '/vehicles',
  },
  openGraph: {
    type: 'article',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url,
    title,
    description,
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'Vehicle E20 Compatibility & Fuel Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/playstore_feature_graphic.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Vehicles', item: url },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'E20 Fuel Vehicle Compatibility & Ethanol-Free Guide for Indian Motorists',
  description,
  url,
  inLanguage: 'en-IN',
  author: {
    '@type': 'Person',
    name: siteConfig.founderName,
    url: 'https://www.linkedin.com/in/anupam-pradhan/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'E0 Finder',
    url: siteConfig.siteUrl,
  },
}

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 text-xs font-semibold text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
              E0
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              E0 Finder
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/find"
              className="rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              Live Map
            </Link>
            <Link
              href="/city"
              className="rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              Cities
            </Link>
            <Link
              href={siteConfig.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="main" className="border-b border-border bg-gradient-to-b from-primary/[0.05] to-transparent py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-semibold">Vehicle Compatibility</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck size={14} />
            <span>2026 Ethanol Blending Guide</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            E20 Fuel Compatibility & <span className="text-primary">E0 Advice</span> for Indian Vehicles
          </h1>

          {/* Answer Block for AEO / AI search extractability */}
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            India&apos;s national E20 rollout impacts vehicles differently based on compression ratios, fuel delivery (port vs direct injection), and metallurgy. Carbureted pre-2010 classics and European superbikes require <strong>0% ethanol (E0) petrol</strong> (IOCL XP100 or HPCL poWer100) to avoid phase separation, rubber degradation, and high-RPM engine knock. Modern E20-compliant bikes and turbo-petrol cars remain safe but gain 6–10% better fuel economy, cooler operating temperatures, and cleaner injectors on E0.
          </p>
        </div>
      </section>

      {/* Interactive Vehicles Directory */}
      <VehiclesClient />

      {/* Educational FAQ Section */}
      <section className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions About Vehicle Compatibility
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold text-foreground">
                How do I know if my motorcycle is strictly meant for E0 petrol?
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Check your owner&apos;s manual for minimum octane rating (RON) and ethanol tolerance. If your bike specifies &quot;E10 max&quot; or &quot;95+ RON&quot; (common on KTM, Kawasaki, Ducati, BMW, Triumph), running Indian standard 91 RON E20 fuel will trigger knock sensor retarding, elevated cylinder head temperatures, and long-term fuel injector clogging.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold text-foreground">
                Can I switch back and forth between E20 and E0 petrol?
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Yes! Modern electronic fuel injection (ECU) automatically adapts ignition timing and air-fuel ratio through O2 sensor feedback. Alternating with E0 petrol helps purge gummy residues left behind by degraded ethanol blends.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="text-sm font-bold text-foreground">
                Why does my mileage drop so much on E20 fuel?
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Pure ethanol has roughly 33% less volumetric energy density than pure gasoline. A 20% ethanol blend translates mathematically to an approximate 6% to 9% decrease in fuel energy per liter, meaning your engine must inject more fuel for the identical power output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} E0 Finder. Independent community platform for ethanol-free fuel discoverability.</p>
          <div className="flex gap-4">
            <Link href="/what-is-e0-petrol" className="hover:text-primary">What is E0?</Link>
            <Link href="/city" className="hover:text-primary">Cities</Link>
            <Link href="/highways" className="hover:text-primary">Highways</Link>
            <Link href="/report-pump" className="hover:text-primary">Report Pump</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
