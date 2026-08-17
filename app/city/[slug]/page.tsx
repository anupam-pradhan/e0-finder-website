import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  MapPin,
  Fuel,
  ShieldCheck,
  Zap,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ChevronDown,
  Navigation,
  Clock,
  Compass,
  CheckCircle2,
  Share2,
} from 'lucide-react'
import { citiesData } from '@/lib/city-data'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return citiesData.map((city) => ({
    slug: city.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const city = citiesData.find((c) => c.slug === slug)
  if (!city) return {}

  const url = `https://e0-finder.app/city/${city.slug}`

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: [
      `0% ethanol petrol in ${city.name}`,
      `E0 petrol pump ${city.name}`,
      `XP100 petrol pump near me ${city.name}`,
      `ethanol free petrol ${city.name}`,
      `pure petrol pump locator ${city.name}`,
      `poWer100 petrol pump ${city.name}`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: city.metaTitle,
      description: city.metaDescription,
      images: [
        {
          url: '/playstore_feature_graphic.png',
          width: 1024,
          height: 500,
          alt: `Find E0 Petrol Stations in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: city.metaTitle,
      description: city.metaDescription,
      images: ['/playstore_feature_graphic.png'],
    },
  }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const city = citiesData.find((c) => c.slug === slug)

  if (!city) {
    notFound()
  }

  const otherCities = citiesData.filter((c) => c.slug !== city.slug).slice(0, 4)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft size={16} /> Home
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              Get Android App
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/[0.05] to-transparent py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <span>Cities</span>
            <ChevronRight size={12} />
            <span className="text-foreground font-semibold">{city.name}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <MapPin size={14} /> {city.name}, {city.state}
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            0% Ethanol (E0) Petrol Stations in <span className="text-primary">{city.name}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Real-time verified locations, crowd-sourced density tests, and turn-by-turn navigation to authentic 0% ethanol petrol pumps (XP100 & poWer100) across {city.name}.
          </p>

          {/* City Stats Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verified Stations</span>
              <strong className="block text-2xl font-black text-primary mt-1">{city.verifiedPumpsCount}+ Bunks</strong>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Regular Blend %</span>
              <strong className="block text-2xl font-black text-destructive mt-1">{city.avgEthanolBlend}</strong>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Average Density</span>
              <strong className="block text-2xl font-black text-foreground mt-1">{city.avgDensity}</strong>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Community Rating</span>
              <strong className="block text-2xl font-black text-amber-500 mt-1">4.9★ (Live)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas in City */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <h2 className="text-xl font-bold text-foreground">Top Covered Neighborhoods in {city.name}</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {city.popularAreas.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-xs"
            >
              <MapPin size={13} className="text-primary" /> {area}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Stations & Live Reports */}
      <section className="border-t border-border bg-muted/20 py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Live Pump Verification</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-foreground">
                Featured 0% Ethanol Pumps in {city.name}
              </h2>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              View all {city.verifiedPumpsCount}+ stations in app →
            </a>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {city.featuredStations.map((stn, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {stn.fuelGrade}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{stn.verifiedDate}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">{stn.brand}</h3>
                  <p className="mt-1 text-xs font-medium text-primary">{stn.area}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-5">{stn.location}</p>
                </div>
                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                    <ShieldCheck size={14} /> Verified Stock
                  </span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Navigate <Navigation size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highway Corridors */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <h2 className="text-xl font-bold text-foreground">Highway Corridors Connecting {city.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Verified 0% ethanol fuel stops along key expressway and highway routes for weekend road trips and touring.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {city.highwayCorridors.map((hwy) => (
            <div key={hwy} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-xs">
              <Compass size={18} className="text-primary shrink-0" />
              <span className="text-sm font-bold text-foreground">{hwy}</span>
            </div>
          ))}
        </div>
      </section>

      {/* City Guide Section */}
      <section className="border-t border-border bg-muted/20 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-2xl font-black text-foreground">Driving & Riding in {city.name}: Fuel Quality Guide</h2>
          <div className="mt-4 rounded-2xl border border-border bg-card p-6 leading-7 text-sm text-muted-foreground whitespace-pre-line shadow-xs">
            {city.cityGuide}
          </div>

          {/* Local FAQs */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions for {city.name}</h3>
            <div className="space-y-3">
              {city.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-xs">
                  <strong className="block text-sm font-bold text-foreground">{faq.q}</strong>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <h2 className="text-xl font-bold text-foreground">Find E0 Petrol in Other Cities</h2>
        <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-4">
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/city/${c.slug}`}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 shadow-xs"
            >
              <strong className="block text-sm font-bold group-hover:text-primary transition-colors">{c.name}</strong>
              <span className="text-xs text-muted-foreground mt-0.5 block">{c.verifiedPumpsCount}+ Verified Stations</span>
            </Link>
          ))}
        </div>
      </section>

      {/* App Marketing CTA Banner */}
      <section className="border-t border-border bg-primary/[0.04] py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left lg:px-8">
          <div className="flex items-center gap-4">
            <img src="/app-icon.png" alt="E0 Finder App" className="size-14 rounded-2xl object-contain shadow-sm bg-white p-1" />
            <div>
              <h3 className="text-2xl font-black">Locate {city.name} 0% Ethanol Pumps Live</h3>
              <p className="text-sm text-muted-foreground">Download the free E0 Finder Android app with real-time GPS map & turn-by-turn directions.</p>
            </div>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
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
          <span>© 2026 E0 Finder. Built for Indian Drivers & Enthusiasts.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
