import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PumpCard } from '@/components/pump-card'
import { PumpPageShell } from '@/components/pump-page-shell'
import { siteConfig } from '@/lib/site-config'
import { fetchFeaturedPumps, fuelGradePages, pumpPath, type FuelGradeKey } from '@/lib/supabase-stations'

// Nationwide list per fuel grade, grouped by state. Refreshed daily.
export const revalidate = 86400
export const dynamicParams = false

const grades = Object.keys(fuelGradePages) as FuelGradeKey[]

export function generateStaticParams() {
  return grades.map((grade) => ({ grade }))
}

export async function generateMetadata({ params }: { params: Promise<{ grade: string }> }): Promise<Metadata> {
  const { grade } = await params
  const page = fuelGradePages[grade as FuelGradeKey]
  if (!page) return {}
  const pumps = (await fetchFeaturedPumps()).filter(page.matches)
  const states = new Set(pumps.map((p) => p.state).filter(Boolean)).size
  const monthYear = new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  const url = `${siteConfig.siteUrl}/fuel/${grade}`
  const description = `${pumps.length} ${page.name} petrol pumps across ${states} states in India, with addresses, directions and last-verified dates. Updated ${monthYear}. Find the ${page.name} pump nearest you.`
  return {
    title: page.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'E0 Finder', locale: 'en_IN', url, title: page.title, description },
    twitter: { card: 'summary_large_image', title: page.title, description },
  }
}

export default async function FuelGradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade } = await params
  const page = fuelGradePages[grade as FuelGradeKey]
  if (!page) notFound()

  const pumps = (await fetchFeaturedPumps()).filter(page.matches)
  const byState = new Map<string, typeof pumps>()
  for (const p of pumps) {
    const key = p.state || 'Other'
    byState.set(key, [...(byState.get(key) ?? []), p])
  }
  const stateEntries = [...byState.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
  const url = `${siteConfig.siteUrl}/fuel/${grade}`
  const monthYear = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#list`,
    name: page.h1,
    numberOfItems: pumps.length,
    itemListElement: pumps.slice(0, 100).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteConfig.siteUrl}${pumpPath(p)}`,
      name: p.name,
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: page.h1, item: url },
    ],
  }

  return (
    <PumpPageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{page.brand} · updated {monthYear}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            <strong className="text-foreground">{pumps.length} {page.name} pumps</strong> across {stateEntries.length} states are in the E0 Finder catalogue right now. {page.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
            {stateEntries.map(([state, list]) => (
              <a key={state} href={`#${state.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="rounded-xl border border-border bg-card px-3 py-1.5 hover:border-primary/50">
                {state} <span className="text-muted-foreground">({list.length})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {stateEntries.map(([state, list]) => (
        <section key={state} id={state.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
          <h2 className="text-xl font-bold">
            {page.name} pumps in {state} <span className="text-sm font-semibold text-muted-foreground">({list.length})</span>
          </h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            {list.map((p) => (
              <PumpCard key={p.id} pump={p} />
            ))}
          </ol>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h2 className="text-xl font-bold">Not near any of these?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          The live finder searches all {siteConfig.catalogueSize} pumps in the catalogue, including regular outlets, and the Android app shows them on Google Maps around you. If you find a pump selling {page.name} that is missing here, report it and it will appear in this list after review.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/find" className="inline-flex items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">Open the live finder</Link>
          <Link href="/report-pump" className="inline-flex items-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-muted">Report a pump</Link>
          {grades.filter((g) => g !== grade).map((g) => (
            <Link key={g} href={`/fuel/${g}`} className="inline-flex items-center rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-muted">
              {fuelGradePages[g].name} pumps
            </Link>
          ))}
        </div>
      </section>
    </PumpPageShell>
  )
}
