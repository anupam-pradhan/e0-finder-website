import Link from 'next/link'
import {
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { statesData } from '@/lib/state-data'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

const totalPumps = statesData.reduce((sum, s) => sum + s.totalPumps, 0)
const totalCities = statesData.reduce((sum, s) => sum + s.cities.length, 0)
const totalStates = statesData.length

export const metadata: Metadata = {
  title: 'E0 petrol pumps by city — India',
  description: `Every Indian city and state we've mapped ethanol-free (E0) petrol pumps in — XP100, poWer100, Speed 100. Browse ${totalStates} states and ${totalCities} cities to find pumps near you.`,
  keywords: [
    'E0 petrol pumps India',
    'ethanol free petrol cities India',
    'XP100 petrol pump India',
    'poWer100 petrol pump India',
    'E0 fuel finder cities',
    'pure petrol pump India list',
  ],
  alternates: {
    canonical: '/city',
  },
  openGraph: {
    type: 'website',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/city',
    title: 'E0 petrol pumps by city — India',
    description: `${totalPumps}+ ethanol-free petrol pumps mapped across ${totalCities} cities in ${totalStates} states. Browse by state to find pumps near you.`,
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'E0 Finder — E0 petrol pumps by city across India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E0 petrol pumps by city — India',
    description: `${totalPumps}+ ethanol-free petrol pumps mapped across ${totalCities} cities in ${totalStates} states.`,
    images: ['/playstore_feature_graphic.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Cities', item: `${siteConfig.siteUrl}/city` },
  ],
}

export default function CitiesIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg">
        Skip to content
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="E0 Finder home">
            <img src="/app-icon.png" alt="E0 Finder Logo" className="size-9 rounded-xl object-contain shadow-xs shrink-0" />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-xl font-black tracking-tight text-foreground flex items-center gap-1">
                <span className="text-primary">E0</span>Finder
              </span>
              <span className="text-[10px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap hidden sm:block">
                0% Ethanol Petrol Locator
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/find" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Find
            </Link>
            <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:inline">
              About
            </Link>
            <a
              href={siteConfig.playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              Get Android App
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="main" className="border-b border-border bg-gradient-to-b from-primary/[0.05] to-transparent py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-semibold">Cities</span>
          </nav>

          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {totalPumps}+ E0 pumps mapped across {totalCities} cities in {totalStates} states and union territories. Availability is never guaranteed — confirm at the pump.
          </p>
        </div>
      </section>

      {/* States & Cities Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="space-y-10">
          {statesData.map((state) => (
            <div key={state.slug} className="rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <Link
                  href={`/state/${state.slug}`}
                  className="group flex items-center gap-3"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-black text-primary">
                    {state.totalPumps}
                  </span>
                  <h2 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                    {state.name}
                  </h2>
                </Link>
                <Link
                  href={`/state/${state.slug}`}
                  className="text-xs font-bold text-primary hover:underline hidden sm:inline-flex items-center gap-1"
                >
                  View all <ChevronRight size={12} />
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {state.cities.slice(0, 4).map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-colors shadow-xs"
                  >
                    <MapPin size={12} className="text-primary" />
                    {city.name}
                  </Link>
                ))}
                {state.cities.length > 4 && (
                  <Link
                    href={`/state/${state.slug}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                  >
                    +{state.cities.length - 4} more
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App CTA */}
      <section className="border-t border-border bg-primary/[0.04] py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left lg:px-8">
          <div className="flex items-center gap-4">
            <img src="/app-icon.png" alt="E0 Finder App" className="size-14 rounded-2xl object-contain shadow-sm bg-white p-1" />
            <div>
              <h3 className="text-2xl font-black">Find E0 petrol pumps across India</h3>
              <p className="text-sm text-muted-foreground">Download the free E0 Finder Android app for live GPS maps &amp; turn-by-turn directions.</p>
            </div>
          </div>
          <a
            href={siteConfig.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.02] shadow-sm shrink-0"
          >
            Download Free App
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 E0 Finder. Built for Indian Drivers &amp; Enthusiasts.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/find" className="hover:underline">Find</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
