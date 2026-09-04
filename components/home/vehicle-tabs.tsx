'use client'

import { useState } from 'react'

const vehicleCategories = [
  {
    category: 'Royal Enfield Motorcycles',
    models: [
      { name: 'Bullet 350 / 500 (Cast Iron / AVL / UCE)', year: 'Pre-2023', risk: 'High Risk', fuel: 'E0 Required', note: 'Carburettor jets & rubber petcock degrade on E20.' },
      { name: 'Interceptor 650 / Continental GT 650', year: 'All Years', risk: 'Moderate Risk', fuel: 'E0 Recommended', note: 'Smoother idle, +1.8 WHP power gain, zero injector knock.' },
      { name: 'Himalayan 411 / Scram 411', year: '2016-2022', risk: 'High Risk', fuel: 'E0 Required', note: 'Prone to morning cold-start misfires with water absorption.' },
      { name: 'Himalayan 450 / Hunter 350', year: '2023+', risk: 'Safe (E20 Ready)', fuel: 'E0 Optimal', note: 'E20 compliant; E0 gives 7% better highway range.' },
    ],
  },
  {
    category: 'Yamaha, KTM & Sport Bikes',
    models: [
      { name: 'Yamaha RD350 & RX100 (2-Stroke)', year: 'Vintage', risk: 'Critical Danger', fuel: 'E0 Mandatory', note: '2T oil falls out of suspension on E20, causing engine seizure.' },
      { name: 'KTM Duke 390 / RC 390 (Gen 1 & 2)', year: '2013-2022', risk: 'High Risk', fuel: 'E0 Required', note: '12.6:1 compression engine suffers throttle lag on E20.' },
      { name: 'Yamaha R15 V3 / V4 & MT-15', year: 'All Years', risk: 'Moderate Risk', fuel: 'E0 Recommended', note: 'E0 delivers snappier VVA cam engagement.' },
      { name: 'Ducati, Kawasaki Ninja & BMW Superbikes', year: 'All Years', risk: 'Critical', fuel: 'E0 Mandatory (100 RON)', note: 'Strict fuel stability requirements; prevents O2 sensor tripping.' },
    ],
  },
  {
    category: 'Cars, SUVs & Turbo Petrols',
    models: [
      { name: 'VW / Skoda 1.0 TSI & 1.5 TSI', year: 'Pre-2023', risk: 'High Risk', fuel: 'E0 Recommended', note: 'Direct injection high-pressure pump sensitive to ethanol varnish.' },
      { name: 'Hyundai / Kia 1.0 & 1.4 Turbo GDi', year: 'Pre-2023', risk: 'High Risk', fuel: 'E0 Recommended', note: 'Fuel injector gumming reported on prolonged E20 usage.' },
      { name: 'Honda City / Civic i-VTEC', year: 'Pre-2022', risk: 'Moderate Risk', fuel: 'E0 Recommended', note: 'Rubber fuel lines & intake valves benefit from pure fuel.' },
      { name: 'Classic Cars (Premier Padmini, Ambassador, Maruti 800)', year: 'Vintage', risk: 'Critical Danger', fuel: 'E0 Mandatory', note: 'Mechanical fuel pumps & brass carburettors corrode rapidly.' },
    ],
  },
]

export function VehicleCompatibilityTabs() {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<number>(0)

  return (
    <>
      {/* Category Tabs */}
      <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {vehicleCategories.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCategoryTab(idx)}
            className={`cursor-pointer rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              selectedCategoryTab === idx
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'border border-border bg-card text-foreground hover:border-primary/40'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Table of Models */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-bold">Vehicle Model</th>
              <th className="px-6 py-4 font-bold">Manufacturing Era</th>
              <th className="px-6 py-4 font-bold">E20 Risk Profile</th>
              <th className="px-6 py-4 font-bold">Recommended Fuel</th>
              <th className="px-6 py-4 font-bold">Engineering Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vehicleCategories[selectedCategoryTab].models.map((model) => (
              <tr key={model.name} className="hover:bg-muted/30">
                <td className="px-6 py-4 font-bold text-foreground">{model.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{model.year}</td>
                <td className="px-6 py-4 font-semibold">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                      model.risk.includes('Critical')
                        ? 'bg-destructive/15 text-destructive'
                        : model.risk.includes('High')
                        ? 'bg-amber-500/15 text-amber-600'
                        : model.risk.includes('Moderate')
                        ? 'bg-blue-500/15 text-blue-600'
                        : 'bg-green-500/15 text-green-600'
                    }`}
                  >
                    {model.risk}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-primary">{model.fuel}</td>
                <td className="px-6 py-4 text-xs text-muted-foreground max-w-xs">{model.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
