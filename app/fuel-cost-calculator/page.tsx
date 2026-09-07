import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin } from 'lucide-react'
import { FuelCostCalculator } from '@/components/fuel-cost-calculator'

const title = 'Petrol Fuel Cost Calculator - Compare Cost per Km | E0 Finder'
const description = 'Compare two petrol prices and mileage figures. Calculate litres, trip cost, cost per kilometre and the mileage needed to break even in Indian rupees.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/fuel-cost-calculator' },
  openGraph: {
    type: 'website', url: '/fuel-cost-calculator', title, description,
    siteName: 'E0 Finder', locale: 'en_IN',
    images: [{ url: '/playstore_feature_graphic.png', width: 1024, height: 500, alt: 'E0 Finder petrol station app' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/playstore_feature_graphic.png'] },
}

export default function FuelCostPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold"><Image src="/app-icon.png" alt="" width={36} height={36} />E0 Finder</Link>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft size={16} />Fuel guides</Link>
        </nav>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Petrol Fuel Cost Calculator</h1>
        <p className="mb-8 mt-4 max-w-3xl text-base leading-7 text-muted-foreground">Compare a trip, your monthly commute or two suitable petrol grades using current prices and your measured mileage.</p>
        <FuelCostCalculator />
        <article className="mt-10 max-w-3xl space-y-8 text-base leading-7">
          <section>
            <h2 className="mb-3 text-xl font-bold">How Fuel Cost Is Calculated</h2>
            <p>Litres required = distance / mileage. Trip cost = litres required x price per litre. Cost per kilometre = price per litre / mileage.</p>
            <p className="mt-3">For example, 1,000 km at 15 km/l uses about 66.67 litres. At an illustrative Rs. 105 per litre, that trip costs Rs. 7,000. This is a calculation example, not a current pump price.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold">When Does a More Expensive Fuel Break Even?</h2>
            <p>Fuel B's break-even mileage = Fuel A's mileage x (Fuel B's price / Fuel A's price). A 10% increase in price needs a 10% increase in km/l to keep fuel cost per kilometre unchanged.</p>
            <p className="mt-3">The calculator does not assume that E0, E20, XP100 or another grade will achieve any particular improvement. Use mileage you have measured. If the difference is unknown, enter equal mileage values first.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold">What Is Included?</h2>
            <p>The estimate covers fuel for the distance entered. Include any detour to reach your chosen outlet. Tolls, parking, repairs, insurance and vehicle depreciation are not included, and no maintenance saving is assumed.</p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-bold">Which Values Should I Use?</h2>
            <p>Use a recent outlet price and a mileage figure from similar traffic and road conditions. Keep the receipt date with your notes. For a monthly estimate, enter the month's expected distance; for a return journey, enter both legs.</p>
            <p className="mt-3"><Link className="text-primary underline underline-offset-4" href="/blog/petrol-mileage-full-tank-measurement">Measure your mileage with a fuel log</Link> before comparing grades. Confirm that each fuel meets your vehicle's requirements using the <Link className="text-primary underline underline-offset-4" href="/blog/e20-vehicle-compatibility-checklist">compatibility checklist</Link>.</p>
          </section>
          <Link href="/find" className="inline-flex items-center gap-2 font-semibold text-primary"><MapPin size={18} />Find petrol stations</Link>
        </article>
      </div>
    </main>
  )
}
