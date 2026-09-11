import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Download, Images, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { appScreenshotImages, seoImages } from '@/lib/seo-images'

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
            <Images size={14} /> Google Play Store Screenshots
          </div>
          <h2 id="app-store-proof-heading" className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Real E0 Finder app screens, shown clearly before install.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            Preview the authentic app UI used for promotion: station search, map pins, filters, station details and community availability reports.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
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
          <Link href="/screenshots" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
            View full screenshot gallery <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <figure className="mt-7 overflow-x-auto rounded-2xl border border-border bg-white p-3 shadow-sm">
        <div className="min-w-[900px] md:min-w-0">
          <Image
            src={seoImages.playStoreScreens.path}
            alt={seoImages.playStoreScreens.alt}
            width={seoImages.playStoreScreens.width}
            height={seoImages.playStoreScreens.height}
            sizes="(max-width: 768px) 900px, 1100px"
            className="h-auto w-full rounded-xl object-contain"
          />
        </div>
        <figcaption className="sr-only">{seoImages.playStoreScreens.caption}</figcaption>
      </figure>

      {!compact && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {appScreenshotImages.map((screen) => (
            <figure key={screen.path} className="rounded-2xl border border-border bg-card p-3 shadow-xs">
              <div className="overflow-hidden rounded-xl bg-muted/30">
                <Image
                  src={screen.path}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 260px"
                  className="h-auto w-full object-contain"
                />
              </div>
              <figcaption className="mt-3 px-1 text-xs leading-5 text-muted-foreground">
                <span className="flex items-center gap-2 font-bold text-foreground">
                  <CheckCircle2 size={14} className="text-primary" /> {screen.title}
                </span>
                <span className="mt-1 block">{screen.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Uses authentic app UI assets</span>
        <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary" /> Descriptive screenshot URLs and alt text</span>
        <Link href="/methodology" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          See how reports are checked <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}