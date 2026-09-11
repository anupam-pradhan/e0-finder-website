import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  Fuel,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { siteConfig, sourceLinks } from '@/lib/site-config'

const title = 'E0 Finder Methodology - How Petrol Station Reports Are Verified'
const description =
  'See how E0 Finder evaluates petrol station reports, evidence levels, correction requests and official fuel sources for E0, XP100, poWer100 and non-E20 searches in India.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/methodology' },
  keywords: [
    'E0 Finder methodology',
    'how to verify E0 petrol station',
    'petrol density report India',
    'XP100 station verification',
    'ethanol-free petrol station report',
  ],
  openGraph: {
    type: 'article',
    url: '/methodology',
    siteName: siteConfig.appName,
    locale: 'en_IN',
    title,
    description,
    images: [{ url: '/playstore_feature_graphic.png', width: 1024, height: 500, alt: 'E0 Finder methodology' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/playstore_feature_graphic.png'] },
}

const evidenceLevels = [
  {
    level: 'Level 1',
    icon: FileCheck2,
    title: 'Official or outlet source signal',
    text: 'Product pages, outlet locator references, visible dispenser labels, staff confirmation or oil-company material can support the fuel-grade identity.',
  },
  {
    level: 'Level 2',
    icon: Fuel,
    title: 'Recent on-site fuel report',
    text: 'A user report can include the date, outlet name, brand, reported grade, receipt details, dispenser photo or Form-8 density log where available.',
  },
  {
    level: 'Level 3',
    icon: Users,
    title: 'Community consistency check',
    text: 'Repeated reports from different users raise confidence, especially when the grade, outlet and timestamp agree across submissions.',
  },
  {
    level: 'Level 4',
    icon: Clock,
    title: 'Freshness and correction review',
    text: 'Older or disputed listings should be treated as lower confidence until refreshed. Users can request corrections when stock or station details change.',
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${siteConfig.siteUrl}/methodology#article`,
  headline: title,
  description,
  image: `${siteConfig.siteUrl}/playstore_feature_graphic.png`,
  datePublished: '2026-09-11',
  dateModified: siteConfig.lastUpdated,
  author: { '@type': 'Organization', name: siteConfig.appName, url: siteConfig.siteUrl },
  publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
  mainEntityOfPage: `${siteConfig.siteUrl}/methodology`,
  inLanguage: 'en-IN',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Methodology', item: `${siteConfig.siteUrl}/methodology` },
  ],
}

export default function MethodologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/70 bg-background/95">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5 font-black" aria-label="E0 Finder home">
              <img src="/app-icon.png" alt="E0 Finder app icon" className="size-10 rounded-xl object-contain" />
              <span><span className="text-primary">E0</span> Finder</span>
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
              <Link href="/download" className="hover:text-primary">Download</Link>
              <Link href="/find" className="hover:text-primary">Live map</Link>
              <Link href="/about" className="hover:text-primary">About</Link>
            </div>
          </nav>
        </header>

        <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <ShieldCheck size={14} /> Verification Method
            </div>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              How E0 Finder evaluates petrol station reports.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Good SEO trust starts with showing how the data is made. This page explains how E0 Finder separates product names, user submissions, official fuel context and current availability warnings.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/download" className="e0-btn-gradient e0-glow inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-bold">
                Install the app <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-bold text-foreground shadow-xs hover:border-primary hover:text-primary">
                Send a correction
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/20 py-12">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-2 lg:px-8">
            {evidenceLevels.map(({ level, icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                <div className="flex items-center justify-between gap-4">
                  <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} /></div>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">{level}</span>
                </div>
                <h2 className="mt-4 text-xl font-bold">{title}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">What A Listing Means</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">A report is evidence, not a permanent certificate.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Petrol station tanks are refilled, product availability changes and staff guidance can vary. E0 Finder should help users ask better questions: what grade is sold, when was it last reported, what evidence exists and whether the outlet can confirm current stock.
            </p>
            <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 shrink-0 text-amber-600" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Always confirm fuel compatibility with your vehicle manual or manufacturer. A station listing cannot diagnose engine issues or replace official vehicle guidance.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {[
              'Station names and coordinates are checked for obvious duplicates or map errors.',
              'Fuel-grade labels are kept separate from ethanol-content claims wherever possible.',
              'Reports should carry a freshness signal so old listings do not look current forever.',
              'Corrections are encouraged when a station no longer sells the reported grade.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-background py-14">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">External References</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Sources used for current fuel context</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              These references help explain the national E20 context and the official positioning of 100-octane products. They do not prove the live stock condition at any individual station.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[sourceLinks.pibE20Status, sourceLinks.pibEthanolFactsheet, sourceLinks.ioclXp100, sourceLinks.hpclPower100, sourceLinks.googleHelpfulContent].map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 rounded-2xl border border-border bg-card p-4 text-sm font-semibold text-foreground shadow-xs hover:border-primary hover:text-primary">
                  <ExternalLink size={16} className="mt-0.5 shrink-0" /> {source.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>© 2026 E0 Finder. Verification improves when users report changes.</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/download" className="hover:underline">Download</Link>
              <Link href="/find" className="inline-flex items-center gap-1 hover:underline"><MapPin size={14} /> Map</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}