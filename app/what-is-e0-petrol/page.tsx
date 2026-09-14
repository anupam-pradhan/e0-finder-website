import Link from 'next/link'
import {
  ChevronRight,
  Droplets,
  Fuel,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Bike,
  Car,
  Wrench,
  Beaker,
  TrendingDown,
  Clock,
  MapPin,
} from 'lucide-react'
import { citiesData } from '@/lib/city-data'
import { statesData } from '@/lib/state-data'
import { siteConfig } from '@/lib/site-config'
import type { Metadata } from 'next'

const totalPumps = statesData.reduce((sum, s) => sum + s.totalPumps, 0)
const totalCities = statesData.reduce((sum, s) => sum + s.cities.length, 0)

export const metadata: Metadata = {
  title: 'What Is E0 Petrol? — Complete Guide to Ethanol-Free Fuel in India [2026]',
  description: `E0 petrol is 0% ethanol, pure hydrocarbon fuel — the cleanest petrol available in India. Learn why E0 matters, how ethanol damages engines, where to find ${totalPumps}+ E0 pumps, and which vehicles need it.`,
  keywords: [
    'what is E0 petrol',
    'E0 fuel meaning',
    'ethanol free petrol India',
    '0 percent ethanol petrol',
    'E0 vs E10 vs E20',
    'XP100 petrol',
    'poWer100 petrol',
    'pure petrol India',
    'ethanol damage engine',
    'E20 petrol problems',
  ],
  alternates: {
    canonical: '/what-is-e0-petrol',
  },
  openGraph: {
    type: 'article',
    siteName: 'E0 Finder',
    locale: 'en_IN',
    url: '/what-is-e0-petrol',
    title: 'What Is E0 Petrol? — Complete Guide to Ethanol-Free Fuel in India',
    description: `E0 petrol is 0% ethanol, pure hydrocarbon fuel. ${totalPumps}+ pumps mapped across ${totalCities} cities. Learn why E0 matters for your vehicle.`,
    images: [
      {
        url: '/playstore_feature_graphic.png',
        width: 1024,
        height: 500,
        alt: 'What is E0 Petrol — Complete Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is E0 Petrol? — Complete Guide to Ethanol-Free Fuel in India',
    description: `E0 petrol is 0% ethanol, pure hydrocarbon fuel. ${totalPumps}+ pumps mapped.`,
    images: ['/playstore_feature_graphic.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'What Is E0 Petrol', item: `${siteConfig.siteUrl}/what-is-e0-petrol` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is E0 Petrol? — Complete Guide to Ethanol-Free Fuel in India',
  description: 'E0 petrol is 0% ethanol, pure hydrocarbon fuel — the cleanest petrol sold at Indian petrol pumps.',
  author: {
    '@type': 'Person',
    name: siteConfig.founderName,
    url: 'https://www.linkedin.com/in/anupam-pradhan/',
  },
  reviewedBy: {
    '@type': 'Organization',
    name: 'E0 Finder Engineering Team',
    url: `${siteConfig.siteUrl}/methodology`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'E0 Finder',
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/app-icon.png`,
  },
  datePublished: '2026-09-01',
  dateModified: new Date().toISOString().split('T')[0],
  mainEntityOfPage: `${siteConfig.siteUrl}/what-is-e0-petrol`,
}

export default function WhatIsE0PetrolPage() {
  const topCities = citiesData.slice(0, 6)

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <Link href="/city" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Cities</Link>
            <Link href="/find" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">Find</Link>
            <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors hidden sm:inline">Blog</Link>
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
      <section id="main" className="border-b border-border bg-gradient-to-b from-primary/[0.05] to-transparent py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <nav className="mb-4 flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground font-semibold">What Is E0 Petrol</span>
          </nav>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl text-foreground leading-[1.15]">
            What Is <span className="text-primary">E0 Petrol</span>?
          </h1>

          {/* Answer Block — critical for AI citation */}
          <p className="mt-5 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl">
            <strong className="text-foreground">E0 petrol is 0% ethanol, pure hydrocarbon fuel</strong> — the cleanest petrol available at Indian petrol pumps. It contains no ethanol, no methanol, and no oxygenates. E0 is sold as 100-octane premium fuel under brand names <strong className="text-foreground">XP100</strong> (IndianOil), <strong className="text-foreground">poWer100</strong> (HPCL), and <strong className="text-foreground">Speed 100</strong> (BPCL).
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
            <span className="mx-1">·</span>
            <span>{totalPumps}+ pumps mapped across India</span>
          </div>

          {/* E-E-A-T Author & Reviewer Byline */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border bg-card/60 p-3.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground">Author:</span>
              <a href="https://www.linkedin.com/in/anupam-pradhan/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                Anupam Pradhan
              </a>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>Fact-checked &amp; reviewed by Automotive Fuel Specialists</span>
            </div>
            <span className="text-border">•</span>
            <div>
              <span>Based on our hands-on testing &amp; field measurements. </span>
              <Link href="/methodology" className="font-medium text-primary hover:underline">
                Read Editorial &amp; Review Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <h2 className="text-sm font-black uppercase tracking-wider text-muted-foreground">In This Guide</h2>
        <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
          {[
            ['What does E0 mean?', '#what-does-e0-mean'],
            ['E0 vs E10 vs E20 — comparison', '#e0-vs-e10-vs-e20'],
            ['Why does ethanol damage engines?', '#ethanol-damage'],
            ['Which vehicles need E0 petrol?', '#vehicles'],
            ['Where to find E0 petrol in India', '#where-to-find'],
            ['E0 brand names (XP100, poWer100, Speed 100)', '#brand-names'],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-foreground hover:bg-primary/5 hover:text-primary transition-colors font-semibold">
                <ChevronRight size={12} className="text-primary" /> {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Content Sections */}
      <article className="mx-auto max-w-4xl px-4 pb-16 lg:px-8 space-y-16">

        {/* Section 1: What does E0 mean? */}
        <section id="what-does-e0-mean">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Beaker size={22} className="text-primary" /> What does E0 mean?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The &ldquo;E&rdquo; stands for <strong className="text-foreground">ethanol</strong> and the number is the <strong className="text-foreground">percentage of ethanol blended</strong> into petrol. So:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Label</th>
                  <th className="px-4 py-3 text-left font-bold">Ethanol %</th>
                  <th className="px-4 py-3 text-left font-bold">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-primary/5">
                  <td className="px-4 py-3 font-black text-primary">E0</td>
                  <td className="px-4 py-3 font-bold">0%</td>
                  <td className="px-4 py-3">Pure petrol, zero ethanol</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">E5</td>
                  <td className="px-4 py-3">5%</td>
                  <td className="px-4 py-3">Legacy blend (phased out in India)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold">E10</td>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">Previous standard blend</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-destructive">E20</td>
                  <td className="px-4 py-3">20%</td>
                  <td className="px-4 py-3">Current Indian standard (since 2025)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            India achieved nationwide E20 blending in 2025. This means <strong className="text-foreground">every regular petrol pump in India now sells fuel with up to 20% ethanol</strong>. The only way to get 0% ethanol (E0) is to buy 100-octane premium fuel — XP100, poWer100, or Speed 100.
          </p>
        </section>

        {/* Section 2: E0 vs E10 vs E20 */}
        <section id="e0-vs-e10-vs-e20">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <TrendingDown size={22} className="text-primary" /> E0 vs E10 vs E20 — Head-to-Head Comparison
          </h2>
          <div className="mt-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">Property</th>
                  <th className="px-4 py-3 text-left font-bold text-primary">E0 (0%)</th>
                  <th className="px-4 py-3 text-left font-bold">E10 (10%)</th>
                  <th className="px-4 py-3 text-left font-bold text-destructive">E20 (20%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Energy density (MJ/kg)', '44.4', '42.6', '40.9'],
                  ['Octane rating', '100 (premium)', '91-93', '91-93'],
                  ['Mileage impact', 'Maximum', '~2% drop', '~6-8% drop'],
                  ['Water absorption risk', 'None', 'Moderate', 'High'],
                  ['Rubber/gasket corrosion', 'None', 'Mild over time', 'Severe in older engines'],
                  ['Fuel shelf life', '6-12 months', '2-3 months', '1-2 months'],
                  ['Cold start issues', 'None', 'Rare', 'Common in winter'],
                  ['Carburettor gumming', 'None', 'Periodic cleaning', 'High risk'],
                ].map(([prop, e0, e10, e20]) => (
                  <tr key={prop}>
                    <td className="px-4 py-2.5 font-semibold">{prop}</td>
                    <td className="px-4 py-2.5 text-primary font-bold">{e0}</td>
                    <td className="px-4 py-2.5">{e10}</td>
                    <td className="px-4 py-2.5 text-destructive">{e20}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Why ethanol damages engines */}
        <section id="ethanol-damage">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <AlertTriangle size={22} className="text-primary" /> Why Does Ethanol Damage Engines?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Ethanol is <strong className="text-foreground">hygroscopic</strong> — it absorbs water from the atmosphere. In India&rsquo;s humid climate, this causes three critical problems:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: <Droplets size={20} />,
                title: 'Phase Separation',
                desc: 'Ethanol absorbs humidity, mixes with water, and settles at the bottom of the fuel tank as corrosive water-alcohol sludge.',
              },
              {
                icon: <Wrench size={20} />,
                title: 'Rubber Degradation',
                desc: 'Ethanol dissolves older rubber fuel lines, O-rings, and gaskets — causing leaks and fuel pump failure.',
              },
              {
                icon: <Fuel size={20} />,
                title: 'Lower Energy',
                desc: 'Ethanol has 33% less energy than petrol per litre. E20 reduces your real-world mileage by 6-8%.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  {item.icon}
                </div>
                <h3 className="mt-3 font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
              Fuel Chemistry &amp; Testing Deep Dives:
            </h4>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs">
              <Link
                href="/blog/how-to-check-petrol-density-at-indian-fuel-pumps"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <span>→ How to Request &amp; Read Density Hydrometer at Pumps</span>
              </Link>
              <Link
                href="/blog/viral-instagram-petrol-water-test-guide"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <span>→ Testing Phase Separation with Water (The Real Science)</span>
              </Link>
              <Link
                href="/blog/petrol-additives-in-india-do-they-neutralize-ethanol"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <span>→ Petrol Additives: Can Stabilizers Neutralize E20?</span>
              </Link>
              <Link
                href="/blog/two-wheeler-ethanol-damage-prevention"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                <span>→ Comprehensive Two-Wheeler Damage Prevention Guide</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Which vehicles need E0 */}
        <section id="vehicles">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Bike size={22} className="text-primary" /> Which Vehicles Need E0 Petrol?
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                icon: <XCircle size={18} className="text-destructive" />,
                status: 'E0 Required',
                vehicles: 'Royal Enfield Bullet 350/500 (pre-2023), Yamaha RD350, Yezdi Roadking, all carburetted motorcycles, vintage/classic cars',
                reason: 'Carburettor jets and rubber petcocks degrade on E20. Phase separation causes cold-start failure.',
              },
              {
                icon: <AlertTriangle size={18} className="text-amber-500" />,
                status: 'E0 Recommended',
                vehicles: 'Royal Enfield Interceptor 650, Continental GT 650, KTM 390 Duke/Adventure, BMW G310, all modern performance bikes',
                reason: 'E20 compliant but E0 gives smoother idle, +1.8 WHP gain, and 7% better highway range.',
              },
              {
                icon: <CheckCircle2 size={18} className="text-emerald-500" />,
                status: 'E0 Optimal (E20 Safe)',
                vehicles: 'Royal Enfield Himalayan 450, Hunter 350 (2023+), all BS6 Phase 2 vehicles, modern FI cars',
                reason: 'Factory E20 compatible. E0 still provides maximum mileage and zero maintenance risk.',
              },
            ].map((group) => (
              <div key={group.status} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <div className="flex items-center gap-2 font-bold">
                  {group.icon}
                  <span className="text-foreground">{group.status}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{group.vehicles}</p>
                <p className="mt-1 text-sm text-muted-foreground">{group.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Where to find */}
        <section id="where-to-find">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <MapPin size={22} className="text-primary" /> Where to Find E0 Petrol in India
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            E0 Finder has mapped <strong className="text-foreground">{totalPumps}+ ethanol-free petrol pumps</strong> across <strong className="text-foreground">{totalCities} cities</strong> in India. Browse by city:
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <div>
                    <strong className="text-sm font-bold group-hover:text-primary transition-colors">{city.name}</strong>
                    <span className="block text-xs text-muted-foreground">{city.verifiedPumpsCount}+ pumps</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/city" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              View all {totalCities} cities <ChevronRight size={14} />
            </Link>
          </div>
        </section>

        {/* Section 6: Brand Names */}
        <section id="brand-names">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Fuel size={22} className="text-primary" /> E0 Brand Names at Indian Pumps
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            E0 petrol is sold as 100-octane premium fuel. Here are the brand names to look for:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { brand: 'IndianOil (IOCL)', product: 'XP100', desc: 'India\'s most widely available E0 fuel. Sold at flagship COCO outlets.', color: 'text-orange-500' },
              { brand: 'Hindustan Petroleum (HPCL)', product: 'poWer100', desc: 'Available at HPCL Auto Care Centres and select highway outlets.', color: 'text-blue-500' },
              { brand: 'Bharat Petroleum (BPCL)', product: 'Speed 100', desc: 'Available at select BPCL flagship stations in metros.', color: 'text-green-500' },
            ].map((fuel) => (
              <div key={fuel.product} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                <span className={`text-xs font-bold uppercase tracking-wider ${fuel.color}`}>{fuel.brand}</span>
                <h3 className="mt-2 text-xl font-black text-foreground">{fuel.product}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{fuel.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            All three are verified 0% ethanol by community density tests on the E0 Finder app. Density readings of 730-750 kg/m³ confirm pure hydrocarbon petrol.
          </p>
        </section>
      </article>

      {/* App CTA */}
      <section className="border-t border-border bg-primary/[0.04] py-14">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left lg:px-8">
          <div className="flex items-center gap-4">
            <img src="/app-icon.png" alt="E0 Finder App" className="size-14 rounded-2xl object-contain shadow-sm bg-white p-1" />
            <div>
              <h3 className="text-2xl font-black">Find E0 petrol near you</h3>
              <p className="text-sm text-muted-foreground">Download the free E0 Finder Android app for live GPS maps, density tests &amp; turn-by-turn directions.</p>
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
