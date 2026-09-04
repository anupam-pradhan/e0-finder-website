'use client'

import { useState, useMemo } from 'react'
import { Lightbulb } from 'lucide-react'

const calculatorVehicles = [
  { label: 'Superbike / Twin (600cc+)', e0Kmpl: 20, e20Kmpl: 17.5, maintSaved: 15000 },
  { label: 'Performance Bike (200-400cc)', e0Kmpl: 32, e20Kmpl: 28.5, maintSaved: 8000 },
  { label: 'Classic / 2-Stroke Motorcycle', e0Kmpl: 35, e20Kmpl: 29.5, maintSaved: 18000 },
  { label: 'Daily Commuter Bike (100-160cc)', e0Kmpl: 52, e20Kmpl: 47.0, maintSaved: 4500 },
  { label: 'Turbo Petrol Car (1.0L / 1.5L TSI/GDi)', e0Kmpl: 15, e20Kmpl: 13.2, maintSaved: 22000 },
  { label: 'Hatchback / Sedan (1.2L Petrol)', e0Kmpl: 18, e20Kmpl: 16.1, maintSaved: 9000 },
]

export function FuelCalculator() {
  const [monthlyKm, setMonthlyKm] = useState<number>(1200)
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState<number>(0)
  const [fuelPrice, setFuelPrice] = useState<number>(102)

  const calcResults = useMemo(() => {
    const veh = calculatorVehicles[selectedVehicleIdx]
    const litersE0PerMonth = monthlyKm / veh.e0Kmpl
    const litersE20PerMonth = monthlyKm / veh.e20Kmpl
    const extraLitersYearly = (litersE20PerMonth - litersE0PerMonth) * 12
    const fuelSavingsYearly = extraLitersYearly * fuelPrice
    const totalYearlySavings = fuelSavingsYearly + veh.maintSaved

    return {
      litersE0PerMonth: litersE0PerMonth.toFixed(1),
      litersE20PerMonth: litersE20PerMonth.toFixed(1),
      extraLitersYearly: Math.round(extraLitersYearly),
      fuelSavingsYearly: Math.round(fuelSavingsYearly),
      maintSaved: veh.maintSaved,
      totalYearlySavings: Math.round(totalYearlySavings),
      e0Range: Math.round(veh.e0Kmpl * 12),
      e20Range: Math.round(veh.e20Kmpl * 12),
    }
  }, [monthlyKm, selectedVehicleIdx, fuelPrice])

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      {/* Controls Box */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-foreground">Select Your Vehicle &amp; Driving Profile</h3>

        {/* Vehicle Type */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Vehicle Type
          </label>
          <select
            value={selectedVehicleIdx}
            onChange={(e) => setSelectedVehicleIdx(Number(e.target.value))}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
          >
            {calculatorVehicles.map((v, i) => (
              <option key={v.label} value={i}>
                {v.label} (E0: {v.e0Kmpl} km/L vs E20: {v.e20Kmpl} km/L)
              </option>
            ))}
          </select>
        </div>

        {/* Monthly Distance Slider */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Monthly Driving Distance
            </label>
            <span className="text-sm font-black text-primary">{monthlyKm.toLocaleString()} KM / Month</span>
          </div>
          <input
            type="range"
            min={300}
            max={4000}
            step={100}
            value={monthlyKm}
            onChange={(e) => setMonthlyKm(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>300 km (Weekend)</span>
            <span>2,000 km (Regular)</span>
            <span>4,000 km (Highway)</span>
          </div>
        </div>

        {/* Fuel Price Input */}
        <div className="mt-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Current Petrol Price in Your City (₹ / Litre)
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="number"
              min={80}
              max={160}
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-32 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
            />
            <span className="text-xs text-muted-foreground">Standard benchmark across Indian metros: ~₹102/L</span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-primary/20 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Annual Estimated Value</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">Pure E0 ROI</span>
        </div>

        <div className="mt-6">
          <span className="block text-xs text-muted-foreground uppercase font-bold">Total Estimated Annual Benefit</span>
          <div className="mt-1 text-4xl sm:text-5xl font-black text-primary">
            ₹{calcResults.totalYearlySavings.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground"> / year</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/80 pt-5">
          <div className="rounded-xl border border-border/70 bg-card p-3.5">
            <span className="block text-xs text-muted-foreground font-semibold">Fuel Saved Annually</span>
            <strong className="text-base text-foreground font-black">{calcResults.extraLitersYearly} Litres</strong>
            <span className="block text-[11px] text-primary mt-0.5">(₹{calcResults.fuelSavingsYearly.toLocaleString()} saved)</span>
          </div>
          <div className="rounded-xl border border-border/70 bg-card p-3.5">
            <span className="block text-xs text-muted-foreground font-semibold">Maintenance Protection</span>
            <strong className="text-base text-foreground font-black">₹{calcResults.maintSaved.toLocaleString()}</strong>
            <span className="block text-[11px] text-muted-foreground mt-0.5">Jets, hoses, injector cleaning</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-primary/10 p-4 text-xs leading-5 text-foreground/90">
          <strong className="flex items-center gap-1.5 text-primary font-bold mb-1">
            <Lightbulb size={15} /> Engineering Insight:
          </strong>
          E0 petrol delivers 6%–8% higher energy density per cylinder stroke. On a 12-litre motorcycle tank, you gain approximately <strong>{(calcResults.e0Range - calcResults.e20Range)} extra KM</strong> of range per tank fill.
        </div>
      </div>
    </div>
  )
}
