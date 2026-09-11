import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Download, ImageIcon, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const phoneScreens = [
  {
    src: '/screenshots/e0_home.png',
    alt: 'E0 Finder app home screen with nearby petrol station reports',
    title: 'Nearby station list',
  },
  {
    src: '/screenshots/e0_home2.png',
    alt: 'E0 Finder app live map screen with petrol station pins',
    title: 'Live map view',
  },
  {
    src: '/screenshots/e0_details_final.png',
    alt: 'E0 Finder app station detail screen with fuel availability and directions',
    title: 'Station details',
  },
  {
    src: '/screenshots/e0_report_final.png',
    alt: 'E0 Finder app report form for E0 petrol availability updates',
    title: 'Report fuel availability',
  },
]

export function AppStoreProof({
  className = '',
  compact = false,
  showCta = true,
}: {
  className?: string
  compact?: boolean
  showCta?: boolean
}) {
  return (
    <section className={className} aria-labelledby="app-store-proof-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <ImageIcon size={14} /> Real App Screens
          </div>
          <h2 id="app-store-proof-heading" className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Clear Google Play screenshots users can trust.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Preview the same app UI screens used for promotion: live station search, map pins, filters, station details and community availability reports.
          </p>
        </div>
        {showCta && (
          <a
            href={siteConfig.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="e0-btn-gradient inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold shadow-sm"
          >
            <Download size={17} /> Install App <ArrowRight size={16} />
          </a>
        )}
      </div>

      <div className="mt-7 overflow-x-auto rounded-2xl border border-border bg-white p-3 shadow-sm">
        <div className="min-w-[900px] md:min-w-0">
          <Image
            src="/playstore_graphics.png"
            alt="E0 Finder Google Play screenshot strip showing search, live map, filters, station details and report screens"
            width={1100}
            height={538}
            sizes="(max-width: 768px) 900px, 1100px"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
      </div>

      {!compact && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phoneScreens.map((screen) => (
            <figure key={screen.src} className="rounded-2xl border border-border bg-card p-3 shadow-xs">
              <div className="overflow-hidden rounded-xl bg-muted/30">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={820}
                  height={1686}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 260px"
                  className="h-auto w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-2 px-1 text-xs font-bold text-foreground">
                <CheckCircle2 size={14} className="text-primary" /> {screen.title}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> App screens match the current brand</span>
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary" /> Full composite stays readable on mobile</span>
        <Link href="/methodology" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          See how reports are checked <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}