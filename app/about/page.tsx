import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { siteConfig, sourceLinks } from '@/lib/site-config'
import { absoluteImageUrl, seoImages, toImageObject } from '@/lib/seo-images'

const title = 'About E0 Finder - Founder, Data Sources and Trust'
const description =
  'Learn who built E0 Finder, how the app helps Indian motorists find reported E0 petrol and high-octane fuel stations, and how station data is verified.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    url: '/about',
    siteName: siteConfig.appName,
    locale: 'en_IN',
    title,
    description,
    images: [{ url: seoImages.appDownloadOg.path, width: seoImages.appDownloadOg.width, height: seoImages.appDownloadOg.height, alt: seoImages.appDownloadOg.alt }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [seoImages.appDownloadOg.path] },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteConfig.siteUrl}/about#webpage`,
  url: `${siteConfig.siteUrl}/about`,
  name: title,
  description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
  about: { '@id': `${siteConfig.siteUrl}/#software` },
  publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
  primaryImageOfPage: toImageObject(seoImages.playStoreFeature),
  image: absoluteImageUrl(seoImages.playStoreFeature.path),
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.appName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/app-icon.png`,
    founder: { '@type': 'Person', name: siteConfig.founderName },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.supportEmail,
      contactType: 'customer support',
      areaServed: 'IN',
    },
  },
}

const trustItems = [
  {
    icon: UserRound,
    title: 'Clear publisher identity',
    text: `E0 Finder is presented as an app and website by ${siteConfig.founderName}, with support available at ${siteConfig.supportEmail}.`,
  },
  {
    icon: FileCheck2,
    title: 'Documented data method',
    text: 'Station pages should show what was reported, when it was reported and what evidence level supports the listing.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust over hype',
    text: 'The site avoids unsupported rating, download and first-only claims unless they are visible from a reliable source.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/70 bg-background/95">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5 font-black" aria-label="E0 Finder home">
              <img src="/app-icon.png" alt="E0 Finder app icon" className="size-10 rounded-xl object-contain" />
              <span><span className="text-primary">E0</span> Finder</span>
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
              <Link href="/download" className="hover:text-primary">Download</Link>
              <Link href="/methodology" className="hover:text-primary">Methodology</Link>
              <Link href="/screenshots" className="hover:text-primary">Screenshots</Link>
              <Link href="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </nav>
        </header>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <ShieldCheck size={14} /> About and Trust
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              E0 Finder helps Indian motorists make better fuel-stop decisions.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              Generic petrol pump listings rarely explain fuel grade, ethanol context, report date or station confidence. E0 Finder turns those details into a searchable map for drivers, riders, classic-vehicle owners and high-performance petrol users.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/download" className="e0-btn-gradient e0-glow inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-bold">
                Download the app <ArrowRight size={18} />
              </Link>
              <Link href="/methodology" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-bold text-foreground shadow-xs hover:border-primary hover:text-primary">
                See verification method
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-5 shadow-lg">
<Image
              src={seoImages.playStoreFeature.path}
              alt={seoImages.playStoreFeature.alt}
              width={seoImages.playStoreFeature.width}
              height={seoImages.playStoreFeature.height}
              sizes="(max-width: 1024px) 92vw, 480px"
              className="h-auto w-full rounded-2xl object-contain"
              priority
            />
          </div>
        </section>

        <section className="border-y border-border bg-muted/20 py-12">
          <div className="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3 lg:px-8">
            {trustItems.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={20} /></div>
                <h2 className="mt-4 text-base font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">What E0 Finder Is</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">A focused fuel discovery tool, not an oil company.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              E0 Finder is independent from oil marketing companies and government agencies. It can help users discover reported fuel availability, but it cannot certify the current contents of a station tank. Official product pages and outlet staff remain important for final confirmation.
            </p>
            <a href={`mailto:${siteConfig.supportEmail}`} className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline">
              <Mail size={17} /> {siteConfig.supportEmail}
            </a>
          </div>
          <div className="space-y-4">
            {[
              'Find reported E0, XP100, poWer100 and high-octane petrol station signals.',
              'Check city pages, map listings and station notes before a refill detour.',
              'Submit corrections when stock, grade, outlet name or location information changes.',
              'Use official source links to understand national E20 blending and premium-fuel context.',
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
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Primary Sources</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Official references used for fuel context</h2>
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
            <span>© 2026 E0 Finder. Built for Indian drivers and riders.</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/download" className="hover:underline">Download</Link>
              <Link href="/screenshots" className="hover:underline">Screenshots</Link>
              <Link href="/find" className="inline-flex items-center gap-1 hover:underline"><MapPin size={14} /> Map</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}