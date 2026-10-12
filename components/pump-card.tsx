import Link from 'next/link'
import { MapPin, Navigation } from 'lucide-react'
import { directionsUrl, isFeaturedPump, pumpPath, verifiedPhrase, type LiveStation } from '@/lib/supabase-stations'

/** Compact card for a featured pump, used on fuel-grade lists, city pages and pump pages. */
export function PumpCard({ pump }: { pump: LiveStation }) {
  const lowEthanol = /low ethanol/i.test(pump.fuelGrade)
  return (
    <li className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/50">
      <div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              pump.isE0Confirmed && !lowEthanol ? 'bg-emerald-500/10 text-emerald-700' : 'bg-primary/10 text-primary'
            }`}
          >
            {pump.fuelGrade}
          </span>
          {pump.isCOCO && <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600">COCO</span>}
          {pump.isOpen24Hours && <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">24 hours</span>}
        </div>
        <h3 className="mt-3 text-base font-bold text-foreground">
          {isFeaturedPump(pump) ? (
            <Link href={pumpPath(pump)} className="hover:text-primary hover:underline">
              {pump.name}
            </Link>
          ) : (
            pump.name
          )}
        </h3>
        <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
          <MapPin size={13} className="mt-0.5 shrink-0 text-primary" />
          <span>
            {pump.address}
            {pump.city ? `, ${pump.city}` : ''}
          </span>
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
        <span>
          {pump.confidenceLabel} · {verifiedPhrase(pump)}
        </span>
        <a
          href={directionsUrl(pump)}
          target="_blank"
          rel="noreferrer nofollow"
          className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
        >
          Directions <Navigation size={12} />
        </a>
      </div>
    </li>
  )
}
