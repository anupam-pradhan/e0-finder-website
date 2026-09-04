'use client'

import { ArrowRight } from 'lucide-react'

export function ScrollToCalculatorButton() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={() => scrollTo('calculator')}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors shadow-xs"
    >
      Calculate Fuel Savings <ArrowRight size={17} />
    </button>
  )
}
