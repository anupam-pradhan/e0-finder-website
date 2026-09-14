import Link from 'next/link'
import {
  ChevronRight,
  Compass,
  Fuel,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { HIGHWAYS_DATA } from '@/lib/highway-data'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

const url = `${siteConfig.siteUrl}/highways`
const title = 'E0 Petrol Pumps on Indian Expressways & Highways — Verified Corridor Stops [2026]'
const description =
  'Locate verified 0% ethanol E0 petrol pumps (XP100 & poWer100) along Mumbai-Pune Expressway, Delhi-Jaipur NE4, Bangalore-Mysore, NH44, and Samruddhi Mahamarg.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'highway E0 petrol pump India',
    'Mumbai Pune expressway E0 petrol',
    'Delhi Jaipur expressway XP100',
    'Bangalore Mysore expressway petrol pumps',
    'NH44 ethanol free fuel',
    'Samruddhi Mahamarg XP100 pumps',
    'expressway petrol stops India',
    'XP100 highway locator',
  ],
  alternates: {
    canonical: '/highways',
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
        alt: 'Indian Highways E0 Petrol Pump Guide',
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
    { '@type': 'ListItem', position: 2, name: 'Highways', item: url },
  ],
}

export default function HighwaysPage() {
  const totalStops = HIGHWAYS_DATA.reduce((acc, h) => acc + h.stops.length, 0)

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
              href="/vehicles"
              className="rounded-xl border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              Vehicles
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
            <span className="text-foreground font-semibold">Highway Corridors</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Compass size={14} />
            <span>Road Trip & Expressway Planner</span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            E0 Petrol Pumps on <span className="text-primary">Indian Expressways</span>
          </h1>

          {/* Answer Block for AEO */}
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Long-distance highway touring demands reliable fuel that doesn&apos;t boil off or suffer phase separation. E0 Finder maps {totalStops}+ verified 0% ethanol petrol stations (XP100 & poWer100) across India&apos;s premier expressways — providing 8–10% higher highway tank range, cooler engine oil temperatures, and zero vapor lock at high sustained speeds.
          </p>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <p className="text-2xl font-bold text-primary">{HIGHWAYS_DATA.length}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Expressway Corridors</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <p className="text-2xl font-bold text-foreground">{totalStops}+</p>
              <p className="text-xs text-muted-foreground mt-0.5">Verified E0 Fuel Stops</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold text-emerald-500">100 RON</p>
              <p className="text-xs text-muted-foreground mt-0.5">Top Fuel Grade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corridors List */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {HIGHWAYS_DATA.map((corridor, idx) => (
          <div
            key={corridor.slug}
            id={corridor.slug}
            className="rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8"
          >
            {/* Corridor Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Navigation size={14} />
                  <span>{corridor.highwayNumber}</span>
                  <span>•</span>
                  <span>{corridor.lengthKm} KM</span>
                </div>
                <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                  {corridor.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Connecting: <span className="font-semibold text-foreground">{corridor.originCity}</span> ➔ <span className="font-semibold text-foreground">{corridor.destinationCity}</span>
                </p>
              </div>

              <Link
                href="/find"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
              >
                <Fuel size={14} />
                <span>View Route in App</span>
              </Link>
            </div>

            {/* Why E0 Matters on this Route */}
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.03] p-4 text-xs sm:text-sm">
              <span className="font-semibold text-primary">Route Fuel Advisory: </span>
              <span className="text-muted-foreground">{corridor.whyE0Matters}</span>
            </div>

            {/* Verified Stops Timeline */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Verified E0 Fuel Stops Along Corridor
              </h3>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {corridor.stops.map((stop, sIdx) => (
                  <div
                    key={sIdx}
                    className="relative flex flex-col justify-between rounded-2xl border border-border/80 bg-secondary/20 p-4 transition-all hover:border-primary/40 hover:bg-card"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                        <span className="rounded bg-secondary px-2 py-0.5 text-foreground font-mono">
                          {stop.kmMarker}
                        </span>
                        <span className="capitalize text-primary font-medium">
                          {stop.sideOfHighway === 'both' ? 'Both Sides' : stop.sideOfHighway.replace('-', ' ')}
                        </span>
                      </div>

                      <h4 className="mt-2.5 text-sm font-bold text-foreground">
                        {stop.stationName}
                      </h4>

                      <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 size={11} />
                        <span>{stop.fuelGrade}</span>
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {stop.landmark}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                      {stop.testedDensity && (
                        <span>Density: <strong className="text-foreground">{stop.testedDensity}</strong></span>
                      )}
                      <span className="text-[10px]">{stop.lastVerified}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} E0 Finder. Turn-by-turn E0 petrol guidance for highway road trips.</p>
          <div className="flex gap-4">
            <Link href="/what-is-e0-petrol" className="hover:text-primary">What is E0?</Link>
            <Link href="/vehicles" className="hover:text-primary">Vehicles</Link>
            <Link href="/city" className="hover:text-primary">Cities</Link>
            <Link href="/report-pump" className="hover:text-primary">Report Pump</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
