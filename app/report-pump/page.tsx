import Link from 'next/link'
import { ChevronRight, PlusCircle, CheckCircle2, ShieldAlert } from 'lucide-react'
import { ReportPumpClient } from './report-pump-client'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

const url = `${siteConfig.siteUrl}/report-pump`
const title = 'Report an E0 Petrol Pump — Crowdsourced Ethanol-Free Petrol Registry'
const description =
  'Found an authentic 0% ethanol petrol pump, XP100, or poWer100 station? Submit station details to help Indian motorists find clean fuel.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'report E0 petrol pump',
    'submit XP100 station',
    'add petrol pump location',
    'ethanol free petrol pump locator submission',
    'crowdsourced petrol pumps India',
    'E0 Finder report pump',
  ],
  alternates: {
    canonical: '/report-pump',
  },
  openGraph: {
    type: 'website',
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
        alt: 'Submit an E0 Petrol Pump',
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
    { '@type': 'ListItem', position: 2, name: 'Report Pump', item: url },
  ],
}

export default function ReportPumpPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 text-xs font-semibold text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-4 inline-flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-semibold">Report a Pump</span>
          </nav>

          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <PlusCircle size={14} />
            <span>Community Driven Verification</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Report an <span className="text-primary">E0 Petrol Station</span>
          </h1>

          <p className="mt-3 max-w-xl mx-auto text-sm leading-6 text-muted-foreground">
            Found an authentic XP100, poWer100, or verified unblended petrol pump? Submit the location to be verified and added to the community map.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <ReportPumpClient />
      </section>

      {/* Verification guidelines */}
      <section className="border-t border-border bg-card/40 py-10 text-xs text-muted-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold text-foreground">
            How E0 Finder Verifies Submissions:
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground">1. OMC Product Matching:</span>
              <p className="mt-1">We cross-reference oil company distribution schedules for XP100 / poWer100 supplies.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground">2. Hydrometer Density:</span>
              <p className="mt-1">Pure petrol measures 740–755 kg/m³. Ethanol blends typically measure higher (755–765+ kg/m³).</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="font-semibold text-foreground">3. Community Multi-Checks:</span>
              <p className="mt-1">Stations are flagged for re-check if motorists report stock-outs or dispenser meter resets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} E0 Finder. Built for enthusiasts who care about engine longevity.</p>
          <div className="flex gap-4">
            <Link href="/what-is-e0-petrol" className="hover:text-primary">What is E0?</Link>
            <Link href="/vehicles" className="hover:text-primary">Vehicles</Link>
            <Link href="/highways" className="hover:text-primary">Highways</Link>
            <Link href="/city" className="hover:text-primary">Cities</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
