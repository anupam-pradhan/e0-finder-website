'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

const initial = { distance: '1000', priceA: '105', mileageA: '15', priceB: '150', mileageB: '15.75' }
const money = (value: number) => 'Rs. ' + value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function FuelCostCalculator() {
  const [values, setValues] = useState(initial)
  const distance = Number(values.distance)
  const priceA = Number(values.priceA)
  const mileageA = Number(values.mileageA)
  const priceB = Number(values.priceB)
  const mileageB = Number(values.mileageB)
  const valid = Object.values(values).every(value => value.trim() !== '' && Number.isFinite(Number(value)) && Number(value) > 0)
  const costA = distance / mileageA * priceA
  const costB = distance / mileageB * priceB
  const breakEvenB = mileageA * priceB / priceA
  const resultsValid = valid && [costA, costB, breakEvenB].every(Number.isFinite)
  const fields = [
    { key: 'distance', label: 'Trip distance (km)', step: '1' },
    { key: 'priceA', label: 'Fuel A price (Rs. / litre)', step: '0.01' },
    { key: 'mileageA', label: 'Fuel A mileage (km / litre)', step: '0.1' },
    { key: 'priceB', label: 'Fuel B price (Rs. / litre)', step: '0.01' },
    { key: 'mileageB', label: 'Fuel B mileage (km / litre)', step: '0.1' },
  ] as const

  return (
    <section aria-labelledby="comparison-heading" className="border-y border-border py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id="comparison-heading" className="text-xl font-bold">Compare Two Fuels</h2>
        <button type="button" onClick={() => setValues(initial)} aria-label="Reset example values" title="Reset example values" className="grid size-10 shrink-0 place-items-center rounded-lg border border-border hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">
          <RotateCcw size={18} />
        </button>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid content-start gap-5 sm:grid-cols-2">
          {fields.map(({ key, label, step }) => {
            const invalid = values[key].trim() === '' || !Number.isFinite(Number(values[key])) || Number(values[key]) <= 0
            return (
              <label key={key} className={key === 'distance' ? 'block sm:col-span-2' : 'block'}>
                <span className="mb-2 block text-sm font-medium">{label}</span>
                <input type="number" inputMode="decimal" min={step} step="any" value={values[key]}
                  onChange={event => setValues(previous => ({ ...previous, [key]: event.target.value }))}
                  aria-invalid={invalid} aria-describedby={invalid ? 'calculator-error' : undefined}
                  className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-base focus-visible:outline-2 focus-visible:outline-primary"
                />
              </label>
            )
          })}
          <p className="text-sm text-muted-foreground sm:col-span-2">Initial values are examples, not live prices or vehicle test results.</p>
        </div>
        <div className="min-w-0 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {resultsValid ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Fuel cost comparison for the entered distance</caption>
                  <thead><tr className="border-b border-border"><th className="py-3">Estimate</th><th className="px-3 py-3 text-right">Fuel A</th><th className="py-3 text-right">Fuel B</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><th scope="row" className="py-4 font-medium">Litres</th><td className="px-3 py-4 text-right">{(distance / mileageA).toFixed(2)}</td><td className="py-4 text-right">{(distance / mileageB).toFixed(2)}</td></tr>
                    <tr className="border-b border-border"><th scope="row" className="py-4 font-medium">Cost / km</th><td className="px-3 py-4 text-right">{money(priceA / mileageA)}</td><td className="py-4 text-right">{money(priceB / mileageB)}</td></tr>
                    <tr className="border-b border-border"><th scope="row" className="py-4 font-medium">Trip cost</th><td data-testid="cost-a" className="px-3 py-4 text-right font-bold">{money(costA)}</td><td data-testid="cost-b" className="py-4 text-right font-bold">{money(costB)}</td></tr>
                  </tbody>
                </table>
              </div>
              <p aria-live="polite" className="mt-5 text-base font-bold text-primary" data-testid="cost-difference">
                {Math.abs(costA - costB) < 0.005 ? 'Both fuels have the same estimated trip cost.' : (costA < costB ? 'Fuel A' : 'Fuel B') + ' costs ' + money(Math.abs(costA - costB)) + ' less for this trip.'}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground" data-testid="break-even">At the entered prices, Fuel B needs {breakEvenB.toFixed(2)} km/l to match Fuel A's cost per kilometre.</p>
            </>
          ) : <p id="calculator-error" role="alert" className="text-sm leading-6 text-red-700">Enter a positive distance, price and mileage for both fuels within a calculable range.</p>}
        </div>
      </div>
    </section>
  )
}
