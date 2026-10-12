import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, Clock, ExternalLink, MapPin, Navigation, Phone, ShieldCheck } from 'lucide-react'
import { PumpCard } from '@/components/pump-card'
import { PumpPageShell } from '@/components/pump-page-shell'
import { citiesData } from '@/lib/city-data'
import { siteConfig } from '@/lib/site-config'
import { directionsUrl, fetchFeaturedPumps, fetchPumpById, isFeaturedPump, pumpPath, type LiveStation } from '@/lib/supabase-stations'

// One page per pump that reports 0% ethanol or a premium grade. Refreshed daily.
export const revalidate = 86400
export const dynamicParams = true

export async function generateStaticParams() {
  const pumps = await fetchFeaturedPumps()
  return pumps.map((p) => ({ id: p.id }))
}

function cityLink(pump: LiveStation) {
  const needle = pump.city.toLowerCase()
  return citiesData.find((c) => needle.includes(c.name.toLowerCase()) || needle.includes(c.slug.replace(/-/g, ' ')))
}

function gradeLabel(pump: LiveStation): string {
  if (/low ethanol/i.test(pump.fuelGrade)) return 'low-ethanol premium petrol (up to 4.5%)'
  if (pump.isE0Confirmed) return '0% ethanol (E0) petrol'
  return pump.fuelGrade
}

async function loadPump(id: string): Promise<LiveStation | null> {
  const pump = await fetchPumpById(decodeURIComponent(id))
  return pump && isFeaturedPump(pump) ? pump : null
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const pump = await loadPump(id)
  if (!pump) return { robots: { index: false, follow: false } }
  const where = [pump.area, pump.city].filter(Boolean).join(', ')
  const title = `${pump.name} — ${pump.fuelGrade.replace(/\s*\(.*\)/, '')} petrol pump in ${where || pump.state}`
  const description = `${pump.name} at ${pump.address}${pump.city ? `, ${pump.city}` : ''} sells ${gradeLabel(pump)}. ${pump.confidenceLabel}, last verified ${pump.lastVerified}. Directions, hours and amenities on E0 Finder.`
  const url = `${siteConfig.siteUrl}${pumpPath(pump)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'E0 Finder', locale: 'en_IN', url, title, description },
    twitter: { card: 'summary', title, description },
  }
}

export default async function PumpPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pump = await loadPump(id)
  if (!pump) notFound()

  const all = await fetchFeaturedPumps()
  const nearby = all
    .filter((p) => p.id !== pump.id && (p.city === pump.city || p.state === pump.state))
    .slice(0, 6)
  const city = cityLink(pump)
  const url = `${siteConfig.siteUrl}${pumpPath(pump)}`
  const lowEthanol = /low ethanol/i.test(pump.fuelGrade)

  const gasStationSchema = {
    '@context': 'https://schema.org',
    '@type': 'GasStation',
    '@id': `${url}#station`,
    name: pump.name,
    url,
    brand: { '@type': 'Brand', name: pump.brand },
    address: {
      '@type': 'PostalAddress',
      streetAddress: pump.address,
      addressLocality: pump.city || undefined,
      addressRegion: pump.state || undefined,
      postalCode: pump.pincode || undefined,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: pump.latitude, longitude: pump.longitude },
    ...(pump.phone ? { telephone: pump.phone } : {}),
    ...(pump.isOpen24Hours ? { openingHours: 'Mo-Su 00:00-24:00' } : {}),
    ...(pump.rating > 0 && pump.reviewCount > 0
      ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: pump.rating, reviewCount: pump.reviewCount } }
      : {}),
    amenityFeature: pump.amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Reported fuel grade', value: pump.fuelGrade },
      { '@type': 'PropertyValue', name: 'Data confidence', value: pump.confidenceLabel },
      { '@type': 'PropertyValue', name: 'Last verification date', value: pump.lastVerified },
    ],
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
      ...(city ? [{ '@type': 'ListItem', position: 2, name: city.name, item: `${siteConfig.siteUrl}/city/${city.slug}` }] : []),
      { '@type': 'ListItem', position: city ? 3 : 2, name: pump.name, item: url },
    ],
  }

  return (
    <PumpPageShell backHref={city ? `/city/${city.slug}` : '/find'} backLabel={city ? `${city.name} pumps` : 'Live finder'}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gasStationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            {city ? (
              <>
                <Link href={`/city/${city.slug}`} className="hover:text-primary">{city.name}</Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-foreground">{pump.name}</span>
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-black ${pump.isE0Confirmed && !lowEthanol ? 'bg-emerald-500/10 text-emerald-700' : 'bg-primary/10 text-primary'}`}>
              <ShieldCheck size={13} className="mr-1 inline" />
              {pump.fuelGrade}
            </span>
            {pump.isCOCO && <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600">Company-owned (COCO)</span>}
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">{pump.confidenceLabel}</span>
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{pump.name}</h1>

          {/* Direct answer block */}
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {pump.name} is a {pump.brand} petrol pump at {pump.address}
            {pump.city ? `, ${pump.city}` : ''}
            {pump.state ? `, ${pump.state}` : ''} that sells <strong className="text-foreground">{gradeLabel(pump)}</strong>. This listing comes from {pump.confidenceLabel.toLowerCase()} and was last verified on {pump.lastVerified}. Stock changes daily, so confirm the grade at the pump before filling.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={directionsUrl(pump)} target="_blank" rel="noreferrer nofollow" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
              <Navigation size={16} /> Get directions
            </a>
            {pump.phone && (
              <a href={`tel:${pump.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-muted">
                <Phone size={16} /> Call {pump.phone}
              </a>
            )}
            <a href={siteConfig.playStoreUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-muted">
              Open in the app <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h2 className="text-xl font-bold">Pump details</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Address</dt>
            <dd className="mt-1 flex items-start gap-1.5 text-sm font-semibold"><MapPin size={14} className="mt-0.5 shrink-0 text-primary" />{pump.address}{pump.pincode ? ` · ${pump.pincode}` : ''}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Hours</dt>
            <dd className="mt-1 flex items-start gap-1.5 text-sm font-semibold"><Clock size={14} className="mt-0.5 shrink-0 text-primary" />{pump.timing || (pump.isOpen24Hours ? 'Open 24 hours' : 'Check at pump')}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Reported density</dt>
            <dd className="mt-1 text-sm font-semibold">{pump.density || 'Not reported yet'}</dd>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Rating</dt>
            <dd className="mt-1 text-sm font-semibold">{pump.rating > 0 ? `${pump.rating} / 5 (${pump.reviewCount} reviews)` : 'No rating yet'}</dd>
          </div>
        </dl>

        {pump.amenities.length > 0 && (
          <>
            <h2 className="mt-10 text-xl font-bold">Amenities</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pump.amenities.map((a) => (
                <li key={a} className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold">
                  <CheckCircle2 size={13} className="text-primary" /> {a}
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className="mt-10 text-xl font-bold">How to report a change</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Filled up here? Open the pump in the E0 Finder app and tap Report to update the grade, stock, price or density reading. Reports from the community keep the last-verified date fresh for the next rider. Learn more on the{' '}
          <Link href="/report-pump" className="font-semibold text-primary hover:underline">report a pump</Link> page.
        </p>
      </section>

      {nearby.length > 0 && (
        <section className="border-t border-border bg-muted/20 py-10">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <h2 className="text-xl font-bold">Other E0 and premium pumps in {pump.city || pump.state}</h2>
            <ol className="mt-4 grid gap-4 md:grid-cols-3">
              {nearby.map((p) => (
                <PumpCard key={p.id} pump={p} />
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href="/fuel/xp100" className="text-primary hover:underline">All XP100 pumps</Link>
              <Link href="/fuel/power100" className="text-primary hover:underline">All poWer100 pumps</Link>
              <Link href="/fuel/ethanol-free" className="text-primary hover:underline">All E0 pumps</Link>
              {city && <Link href={`/city/${city.slug}`} className="text-primary hover:underline">{city.name} city guide</Link>}
            </div>
          </div>
        </section>
      )}
    </PumpPageShell>
  )
}
