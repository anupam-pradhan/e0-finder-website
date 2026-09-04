'use client'

import { useState } from 'react'

const appScreens = [
  {
    title: 'Interactive Map & Pump List',
    description: 'Instantly view verified 0% ethanol petrol pumps near you with real-time distance, live ratings, and navigation shortcuts.',
    img: '/screenshots/e0_home.png',
  },
  {
    title: 'Detailed Station Insights',
    description: 'Check fuel availability, brand information, pump facilities, payment methods, and user verification scores.',
    img: '/screenshots/e0_details_final.png',
  },
  {
    title: 'Community Fuel Reports',
    description: 'Contribute and verify fuel updates with receipts and live reports to keep the community informed.',
    img: '/screenshots/e0_report_final.png',
  },
  {
    title: 'Clean & Easy Onboarding',
    description: 'Simple setup without tedious signups, built for quick access when you are on the road.',
    img: '/screenshots/e0_onboarding_clean.png',
  },
]

export function AppScreensShowcase() {
  const [activeScreen, setActiveScreen] = useState(0)

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
      <div className="flex flex-col gap-3">
        {appScreens.map((screen, idx) => (
          <button
            key={screen.title}
            onClick={() => setActiveScreen(idx)}
            className={`cursor-pointer rounded-xl border p-5 text-left transition-all ${
              activeScreen === idx
                ? 'border-primary bg-primary/[0.06] shadow-sm'
                : 'border-border hover:border-primary/40 hover:bg-card'
            }`}
          >
            <div className="flex items-center justify-between">
              <strong className={`text-base ${activeScreen === idx ? 'text-primary' : 'text-foreground'}`}>
                {idx + 1}. {screen.title}
              </strong>
              {activeScreen === idx && <span className="size-2 rounded-full bg-primary" />}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{screen.description}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-center rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="max-w-[340px] overflow-hidden rounded-xl border border-border/80 shadow-md">
          <img
            src={appScreens[activeScreen].img}
            alt={appScreens[activeScreen].title}
            className="w-full object-cover transition-opacity duration-300"
          />
        </div>
      </div>
    </div>
  )
}
