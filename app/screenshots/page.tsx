import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Download, ExternalLink, Images, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { absoluteImageUrl, appScreenshotImages, screenshotGalleryImages, seoImages, toImageObject } from '@/lib/seo-images'

const title = 'E0 Finder App Screenshots - Google Play UI Gallery'
const description =
  'View authentic E0 Finder Android app screenshots from Google Play, including nearby station search, live map, filters, station details and E0 petrol availability reports.'

const visibleImages = [seoImages.playStoreFeature, seoImages.playStoreScreens, ...appScreenshotImages]

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/screenshots' },
  keywords: [
    'E0 Finder screenshots',
    'E0 Finder app UI',
    'E0 Finder Google Play screenshots',
    'ethanol free petrol app screenshots',
    'XP100 petrol app screenshots',
    'E0 petrol map app India',
  ],
  openGraph: {
    type: 'website',
    url: '/screenshots',
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

const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  '@id': `${siteConfig.siteUrl}/screenshots#gallery`,
  url: `${siteConfig.siteUrl}/screenshots`,
  name: title,
  description,
  inLanguage: 'en-IN',
  isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
  about: { '@id': `${siteConfig.siteUrl}/#software` },
  primaryImageOfPage: toImageObject(seoImages.appDownloadOg),
  image: screenshotGalleryImages.map(toImageObject),
  associatedMedia: screenshotGalleryImages.map(toImageObject),
  publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'App Screenshots', item: `${siteConfig.siteUrl}/screenshots` },
  ],
}

export default function ScreenshotsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border/70 bg-background/95">
          <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5 font-black" aria-label="E0 Finder home">
              <Image src="/app-icon.png" alt="E0 Finder app icon" width={40} height={40} className="size-10 rounded-xl object-contain" priority />
              <span><span className="text-primary">E0</span> Finder</span>
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
              <Link href="/download" className="hover:text-primary">Download</Link>
              <Link href="/find" className="hover:text-primary">Live map</Link>
              <Link href="/methodology" className="hover:text-primary">Methodology</Link>
            </div>
          </nav>
        </header>

        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Images size={14} /> App UI Proof
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              E0 Finder screenshots from the Android app.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              These visuals show the real app surfaces users see before install: nearby stations, map pins, report filters, station details and the E0 availability submission flow.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="e0-btn-gradient e0-glow inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-bold"
              >
                <Download size={19} /> Install on Google Play <ExternalLink size={16} />
              </a>
              <Link
                href="/download"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-bold text-foreground shadow-xs hover:border-primary hover:text-primary"
              >
                Download page <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Authentic product UI</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-primary" /> SEO-named image files</span>
            </div>
          </div>

          <figure className="overflow-hidden rounded-3xl border border-border bg-white p-3 shadow-lg">
            <Image
              src={seoImages.playStoreScreens.path}
              alt={seoImages.playStoreScreens.alt}
              width={seoImages.playStoreScreens.width}
              height={seoImages.playStoreScreens.height}
              sizes="(max-width: 1024px) 92vw, 560px"
              className="h-auto w-full rounded-2xl object-contain"
              priority
            />
            <figcaption className="mt-3 px-2 text-sm leading-6 text-muted-foreground">{seoImages.playStoreScreens.caption}</figcaption>
          </figure>
        </section>

        <section className="border-y border-border bg-muted/20 py-12">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Image SEO Context</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Screenshots that prove what the app actually does</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Each image is embedded as crawlable content with descriptive alt text, dimensions, captions and structured ImageObject data. The same assets are also referenced from app schema and the image sitemap.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {visibleImages.map((image) => (
              <figure key={image.path} className="rounded-2xl border border-border bg-card p-4 shadow-xs">
                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={image.path}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 1024px) 92vw, 520px"
                    className="h-auto w-full object-contain"
                  />
                </div>
                <figcaption className="mt-4">
                  <h2 className="text-lg font-bold text-foreground">{image.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{image.caption}</p>
                  <p className="mt-2 text-xs font-semibold text-muted-foreground">Image URL: {absoluteImageUrl(image.path)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-background py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Install Confidence</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">See the app, then open the map.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={siteConfig.playStoreUrl} target="_blank" rel="noreferrer" className="e0-btn-gradient inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-bold">
                <Download size={18} /> Google Play
              </a>
              <Link href="/find" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 font-bold text-foreground hover:border-primary hover:text-primary">
                Try web map <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-primary py-8 text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>Copyright 2026 E0 Finder. App screenshots and interface assets belong to E0 Finder.</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/download" className="hover:underline">Download</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}