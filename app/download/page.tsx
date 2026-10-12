import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Fuel,
  MapPin,
  Search,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { siteConfig, sourceLinks } from '@/lib/site-config'
import { absoluteImageUrl, screenshotGalleryImages, seoImages, toImageObject } from '@/lib/seo-images'
import { AppStoreProof } from '@/components/app-store-proof'

const title = 'Download E0 Finder App - Ethanol-Free Petrol Map India'
const description =
  'Download the E0 Finder Android app to search reported E0 petrol, XP100 and poWer100 stations in India with maps, directions, verification notes and privacy controls.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/download' },
  keywords: [
    'download E0 Finder app',
    'E0 Finder Google Play',
    'E0 fuel finder app',
    'ethanol free petrol app India',
    'XP100 petrol near me app',
    'poWer100 petrol pump app',
  ],
  openGraph: {
    type: 'website',
    url: '/download',
    siteName: siteConfig.appName,
    locale: 'en_IN',
    title,
    description,
    images: [
      {
        url: seoImages.appDownloadOg.path,
        width: seoImages.appDownloadOg.width,
        height: seoImages.appDownloadOg.height,
        alt: seoImages.appDownloadOg.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [seoImages.appDownloadOg.path],
  },
}

const appFeatures = [
  {
    icon: Search,
    title: 'Search high-intent fuel queries fast',
    text: 'Open the app when you search for E0 petrol near me, XP100 petrol near me, poWer100, or non-E20 petrol stations.',
  },
  {
    icon: MapPin,
    title: 'Google Maps with 52,000+ pumps',
    text: 'Pumps load instantly as you pan or zoom, cluster at city level, and open directions with one tap. Search by name, area or address.',
  },
  {
    icon: ShieldCheck,
    title: 'Read verification context',
    text: 'Station pages separate product name, source signal, report date and confidence level so you can decide before travelling.',
  },
  {
    icon: Fuel,
    title: 'Track the India fuel shift',
    text: 'India has reached 20 percent ethanol blending nationally, so premium-fuel and E0 searches need fresher station-level context.',
  },
]

const whatsNew = [
  'Google Maps is now built in: pumps load instantly as you move the map, with clusters at city level.',
  'Search by pump name, area or address, merging Google Maps results with the 52,000+ pump E0 Finder catalogue.',
  'Quick Find: one tap for 0% ethanol, XP100, poWer100 or company-owned (COCO) outlets near you.',
  'Every pump shows its data source, a confidence label and the real last-verified time.',
  'Amenities with icons, fuel grade, density, price and 24-hour status on each station page.',
  'Report a pump straight from the map preview or the station page.',
]

const trustChecks = [
  'Free Android app with a direct Google Play listing link.',
  'Clear privacy, delete-account and support pages linked from the site.',
  'Station availability is presented as current reports, not a permanent guarantee.',
  'Official fuel and policy sources are linked so users can verify important claims.',
]

const downloadPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteConfig.siteUrl}/download#webpage`,
  url: `${siteConfig.siteUrl}/download`,
  name: 'Download E0 Finder App',
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
  about: { '@id': `${siteConfig.siteUrl}/#software` },
  mainEntity: { '@id': `${siteConfig.siteUrl}/#software` },
  dateModified: siteConfig.lastUpdated,
}

const downloadBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Download', item: `${siteConfig.siteUrl}/download` },
  ],
}

export default function DownloadPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadBreadcrumb) }} />
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/70 bg-background/95">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5 font-black" aria-label="E0 Finder home">
              <img src="/app-icon.png" alt="E0 Finder app icon" className="size-10 rounded-xl object-contain" />
              <span><span className="text-primary">E0</span> Finder</span>
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
              <Link href="/find" className="hover:text-primary">Live map</Link>
              <Link href="/methodology" className="hover:text-primary">Methodology</Link>
              <Link href="/screenshots" className="hover:text-primary">Screenshots</Link>
              <Link href="/about" className="hover:text-primary">About</Link>
            </div>
          </nav>
        </header>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Smartphone size={14} /> Android App
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Download E0 Finder for petrol station reports in India.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Search reported E0 petrol, IndianOil XP100, HPCL poWer100 and non-E20 station signals with a faster map, station notes and one-tap directions.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="e0-btn-gradient e0-glow inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-bold"
              >
                <Download size={19} /> Get it on Google Play <ExternalLink size={16} />
              </a>
              <Link
                href="/find"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-bold text-foreground shadow-xs hover:border-primary hover:text-primary"
              >
                Try the web map <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> Free app</span>
              <span className="inline-flex items-center gap-2"><Clock size={16} className="text-primary" /> Updated for 2026 fuel searches</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Privacy and support pages linked</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[420px]">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-lg">
              <Image
                src={seoImages.playStoreFeature.path}
                alt={seoImages.playStoreFeature.alt}
                width={seoImages.playStoreFeature.width}
                height={seoImages.playStoreFeature.height}
                sizes="(max-width: 1024px) 92vw, 420px"
                className="h-auto w-full rounded-2xl object-contain"
                priority
              />
            </div>
          </div>
        </section>

        <AppStoreProof className="mx-auto max-w-6xl px-5 pb-14 lg:px-8" />

        <section className="border-y border-border bg-muted/20 py-12">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {appFeatures.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={20} /></div>
                <h2 className="mt-4 text-base font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8" aria-labelledby="whats-new-heading">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Version {siteConfig.appVersion} · {new Date(siteConfig.lastUpdated).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          <h2 id="whats-new-heading" className="mt-2 text-3xl font-black tracking-tight">What&apos;s new in E0 Finder {siteConfig.appVersion}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {whatsNew.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-6 text-muted-foreground shadow-xs">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Trust Before Install</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">What users should know first</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              E0 Finder is built for quick decisions, but fuel-grade availability can change. The app is strongest when users read the report date, source signal and station notes before making a detour.
            </p>
            <ul className="mt-6 space-y-3">
              {trustChecks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 shrink-0 text-amber-600" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Fuel availability is not permanent</h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  A product label, receipt or user report does not guarantee the current tank batch at a station. Confirm the grade at the outlet, especially before a long ride, track day, classic-vehicle run or high-performance refill.
                </p>
                <Link href="/methodology" className="mt-5 inline-flex items-center gap-2 font-bold text-primary hover:underline">
                  Read the verification method <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-background py-14">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Current India Context</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Why E0 searches are rising now</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Government releases show India has reached 20 percent ethanol blending, while official fuel pages continue to position XP100 and poWer100 as 100-octane premium petrol products. That creates a practical search gap: users need station-level context, not generic petrol pump listings.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[sourceLinks.pibE20Status, sourceLinks.pibEthanolFactsheet, sourceLinks.ioclXp100, sourceLinks.hpclPower100].map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 rounded-2xl border border-border bg-card p-4 text-sm font-semibold text-foreground shadow-xs hover:border-primary hover:text-primary">
                  <ExternalLink size={16} className="mt-0.5 shrink-0" /> {source.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>© 2026 E0 Finder. Free Android fuel finder for Indian motorists.</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/methodology" className="hover:underline">Methodology</Link>
              <Link href="/screenshots" className="hover:underline">Screenshots</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
