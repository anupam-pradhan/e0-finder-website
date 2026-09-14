'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Fuel,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Bike,
  Car,
  Gauge,
  Flame,
} from 'lucide-react'
import { VEHICLES_DATA, VehicleFuelProfile } from '@/lib/vehicle-data'

const CATEGORIES = [
  { id: 'all', label: 'All Vehicles', icon: Sparkles },
  { id: 'motorcycle', label: 'Bikes & Touring', icon: Bike },
  { id: 'superbike', label: 'Superbikes', icon: Flame },
  { id: 'turbo-car', label: 'Turbo Petrol Cars', icon: Gauge },
  { id: 'luxury-car', label: 'Luxury & German Cars', icon: Car },
  { id: 'classic', label: 'Vintage / Carbureted', icon: AlertTriangle },
]

export function VehiclesClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredVehicles = VEHICLES_DATA.filter((vehicle) => {
    const matchesCategory =
      selectedCategory === 'all' || vehicle.category === selectedCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      vehicle.name.toLowerCase().includes(q) ||
      vehicle.make.toLowerCase().includes(q) ||
      vehicle.engine.toLowerCase().includes(q) ||
      vehicle.vulnerabilities.some((v) => v.toLowerCase().includes(q))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Bar & Category Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search your vehicle (e.g. Duke 390, Royal Enfield, Slavia, Ninja, Thar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredVehicles.length}</span> vehicle compatibility profiles
        </p>
      </div>

      {/* Grid of Vehicle Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredVehicles.map((vehicle) => {
          const isCritical = vehicle.riskLevel === 'critical'
          const isHigh = vehicle.riskLevel === 'high'

          return (
            <div
              key={vehicle.id}
              className={`flex flex-col rounded-2xl border p-6 shadow-xs transition-all hover:shadow-md ${
                isCritical
                  ? 'border-red-500/30 bg-card hover:border-red-500/60'
                  : isHigh
                  ? 'border-amber-500/30 bg-card hover:border-amber-500/60'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {vehicle.make}
                  </span>
                  <h2 className="text-lg font-bold text-foreground sm:text-xl">
                    {vehicle.name}
                  </h2>
                </div>

                {/* Risk Badge */}
                <div
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isCritical
                      ? 'bg-red-500/10 text-red-500 dark:text-red-400'
                      : isHigh
                      ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
                      : 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                  }`}
                >
                  {isCritical ? (
                    <>
                      <ShieldAlert size={13} />
                      <span>E0 Required</span>
                    </>
                  ) : isHigh ? (
                    <>
                      <AlertTriangle size={13} />
                      <span>High Risk</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={13} />
                      <span>E0 Recommended</span>
                    </>
                  )}
                </div>
              </div>

              {/* Specs pill row */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-muted-foreground">
                  Engine: <span className="font-medium text-foreground">{vehicle.engine}</span>
                </span>
                <span className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-muted-foreground">
                  Compression: <span className="font-medium text-foreground">{vehicle.compressionRatio}</span>
                </span>
                <span className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-muted-foreground">
                  Min Octane: <span className="font-medium text-foreground">{vehicle.recommendedOctane} RON</span>
                </span>
              </div>

              {/* Summary */}
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {vehicle.summary}
              </p>

              {/* Vulnerabilities */}
              <div className="mt-4 space-y-1.5 rounded-xl border border-border/60 bg-secondary/30 p-3.5">
                <p className="text-xs font-semibold text-foreground">
                  Observed E20 Fuel Issues:
                </p>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {vehicle.vulnerabilities.map((v, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400 select-none">•</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fuel Guidance & CTA */}
              <div className="mt-auto pt-5">
                <div className="mb-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-3">
                  <p className="text-xs font-semibold text-primary">
                    Recommended Fuel Grades:
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {vehicle.recommendedFuels.join(' • ')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/find"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                  >
                    <Fuel size={14} />
                    <span>Find Verified E0 Pumps</span>
                  </Link>
                  <Link
                    href="/city"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
                  >
                    <span>By City</span>
                    <ChevronRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <AlertTriangle className="mx-auto text-muted-foreground" size={32} />
          <h3 className="mt-3 text-base font-semibold text-foreground">
            No vehicle found matching &quot;{searchQuery}&quot;
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Don&apos;t worry! All modern high-compression (10.5:1+) engines and carbureted classics benefit from 0% ethanol fuel.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="mt-4 inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
