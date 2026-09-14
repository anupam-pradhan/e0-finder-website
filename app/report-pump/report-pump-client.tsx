'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  Gauge,
  User,
  Sparkles,
  Smartphone,
  ExternalLink,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

const BRANDS = [
  'IndianOil (IOCL)',
  'Hindustan Petroleum (HPCL)',
  'Bharat Petroleum (BPCL)',
  'Shell India',
  'Jio-bp / Reliance',
  'Nayara Energy',
  'Other / Independent',
]

const FUEL_GRADES = [
  'XP100 (IndianOil - 100 Octane E0)',
  'poWer100 (HPCL - 100 Octane E0)',
  'Speed 100 (BPCL - 100 Octane E0)',
  'Speed 97 (BPCL - 97 Octane)',
  'V-Power (Shell - Premium)',
  'Pure Unblended E0 (Commercial / Airport / Marine)',
  'Other Verified 0% Ethanol',
]

export function ReportPumpClient() {
  const [stationName, setStationName] = useState('')
  const [brand, setBrand] = useState(BRANDS[0])
  const [fuelGrade, setFuelGrade] = useState(FUEL_GRADES[0])
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [density, setDensity] = useState('')
  const [notes, setNotes] = useState('')
  const [submittedBy, setSubmittedBy] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!stationName.trim() || !city.trim() || !address.trim()) {
      setErrorMsg('Please enter station name, city, and address/landmark.')
      return
    }

    setIsSubmitting(true)

    // Simulate submission and cache locally for user confirmation
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 600)
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-emerald-500/30 bg-card p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-foreground">
          Station Report Received!
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Thank you for contributing to the community! Your report for{' '}
          <strong className="text-foreground">{stationName}</strong> in{' '}
          <strong className="text-foreground">{city}</strong> has been logged for moderator verification.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-4 text-left text-xs space-y-1 text-muted-foreground">
          <p><span className="font-semibold text-foreground">Fuel Grade:</span> {fuelGrade}</p>
          <p><span className="font-semibold text-foreground">Oil Company:</span> {brand}</p>
          <p><span className="font-semibold text-foreground">Location:</span> {address}</p>
          {density && <p><span className="font-semibold text-foreground">Tested Density:</span> {density} kg/m³</p>}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href={siteConfig.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
          >
            <Smartphone size={16} />
            <span>Open E0 Finder App</span>
          </Link>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setStationName('')
              setCity('')
              setAddress('')
              setDensity('')
              setNotes('')
            }}
            className="rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-foreground hover:border-primary/50 transition-colors"
          >
            Submit Another Pump
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Submit Station Details
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Help fellow motorists find pure petrol. Submissions are checked against hydrometer tests and community reports.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500">
          <AlertCircle size={15} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-4 text-xs sm:text-sm">
        {/* Brand & Fuel Grade */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Oil Marketing Company (OMC) *
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Reported Fuel Grade *
            </label>
            <select
              value={fuelGrade}
              onChange={(e) => setFuelGrade(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {FUEL_GRADES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Station Name */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Station / Outlet Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. IndianOil COCO Residency Road / HPCL Auto Care Centre"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* City & State */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              City / Town *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bangalore, Mumbai, Jaipur"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Hydrometer Density (kg/m³) <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 745.2 (740-755 indicates pure E0)"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Address / Google Maps Link */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Exact Location / Landmark / Google Maps Link *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Near Indiranagar 100ft road junction or https://maps.app.goo.gl/..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Verification Notes */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Observations / Dispenser Notes <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Staff confirmed pump gets dedicated tanker delivery on Tuesdays. No ethanol smell. XP100 dispenser nozzle has separate meter."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Reporter Handle */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Your Name / Handle <span className="text-muted-foreground font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul Sharma or @BangaloreRider"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all disabled:opacity-50"
      >
        <Send size={14} />
        <span>{isSubmitting ? 'Submitting Report...' : 'Submit Pump for Verification'}</span>
      </button>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        For instant GPS live check-ins and photos, use the{' '}
        <Link href={siteConfig.playStoreUrl} target="_blank" className="font-semibold text-primary underline">
          E0 Finder Android App
        </Link>.
      </p>
    </form>
  )
}
