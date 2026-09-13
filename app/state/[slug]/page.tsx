import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  MapPin,
  ChevronRight,
  Fuel,
  Navigation,
  ExternalLink,
} from 'lucide-react'
import { statesData } from '@/lib/state-data'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return statesData.map((state) => ({
    slug: state.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const state = statesData.find((s) => s.slug === slug)
  if (!state) return {}

  const cityCount = state.cities.length
  const url = `${siteConfig.siteUrl}/state/${state.slug}`
  const title = `Find ethanol-free (E0) petrol in ${state.name}`
  const description = `${state.totalPumps}+ pumps selling ethanol-free premium (XP100 / poWer100 / Speed 100) across ${cityCount} ${cityCount === 1 ? 'city' : 'cities'} in ${state.name}, India. Unofficial — confirm at the pump.`

  return {
    title,
    description,
    keywords: [
      `E0 petrol ${state.name}`,
      `ethanol free petrol ${state.name}`,
      `XP100 petrol pump ${state.name}`,
      `poWer100 ${state.name}`,
      `pure petrol ${state.name}`,
      `0% ethanol petrol ${state.name}`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [
        {
          url: '/playstore_feature_graphic.png',
          width: 1024,
          height: 500,
          alt: `Find E0 Petrol Stations in ${state.name}`,
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
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const state = statesData.find((s) => s.slug === slug)

  if (!state) {
    notFound()
  }

  const url = `${siteConfig.siteUrl}/state/${state.slug}`
  const cityCount = state.cities.length
  const otherStates = statesData.filter((s) => s.slug !== state.slug).slice(0, 6)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Cities', item: `${siteConfig.siteUrl}/city` },
      { '@type': 'ListItem', position: 3, name: state.name, item: url },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#cities`,
    name: `E0 petrol pump cities in ${state.name}`,
    description: `Cities with ethanol-free (E0) petrol pumps in ${state.name}, India.`,
    numberOfItems: cityCount,
    itemListElement: state.cities.map((city, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: city.name,
      url: `${siteConfig.siteUrl}/city/${city.slug}`,
    })),
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg">
        Skip to content
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
            <Link href="/city" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Cities
            </Link>
            <Link href="/find" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Find
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
          {/* Breadcrumbs */}
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <Link href="/city" className="hover:text-primary">Cities</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-semibold">{state.name}</span>
          </nav>

          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            Find ethanol-free (E0) petrol in <span className="text-primary">{state.name}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {state.totalPumps}+ pumps selling ethanol-free premium across {cityCount} {cityCount === 1 ? 'city' : 'cities'} in {state.name}.
            Availability is never guaranteed — confirm at the pump.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Pumps</span>
              <strong className="block text-2xl font-black text-primary mt-1">{state.totalPumps}+</strong>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cities Covered</span>
              <strong className="block text-2xl font-black text-foreground mt-1">{cityCount}</strong>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fuel Grades</span>
              <strong className="block text-2xl font-black text-foreground mt-1">XP100 · poWer100</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Cities List */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <h2 className="text-2xl font-black text-foreground">
          Cities with E0 petrol in {state.name}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse by city to see verified station listings, fuel grades and directions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {state.cities.map((city) => (
            <Link
              key={city.slug}
              href={`/city/${city.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {city.name}
                  </strong>
                  <span className="text-xs text-muted-foreground">
                    {city.pumpsCount}+ {city.pumpsCount === 1 ? 'pump' : 'pumps'}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Other States */}
      {otherStates.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-xl font-bold text-foreground">Find E0 petrol in other states</h2>
            <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {otherStates.map((s) => (
                <Link
                  key={s.slug}
                  href={`/state/${s.slug}`}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 shadow-xs"
                >
                  <strong className="block text-sm font-bold group-hover:text-primary transition-colors">{s.name}</strong>
                  <span className="text-xs text-muted-foreground mt-0.5 block">{s.totalPumps}+ pumps</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/city" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                View all states and cities <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* App CTA */}
      <section className="border-t border-border bg-primary/[0.04] py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left lg:px-8">
          <div className="flex items-center gap-4">
            <img src="/app-icon.png" alt="E0 Finder App" className="size-14 rounded-2xl object-contain shadow-sm bg-white p-1" />
            <div>
              <h3 className="text-2xl font-black">Find E0 pumps in {state.name} on the go</h3>
              <p className="text-sm text-muted-foreground">Download the free E0 Finder Android app with real-time GPS map &amp; turn-by-turn directions.</p>
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
            <Link href="/city" className="hover:underline">Cities</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
