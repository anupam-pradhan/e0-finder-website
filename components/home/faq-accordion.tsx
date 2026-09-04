'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is E0 petrol and why is it important?',
    a: 'E0 petrol is 100% pure petrol with 0% ethanol blending. Unlike E10 or E20 blended fuel, pure E0 does not absorb moisture, prevents corrosion in fuel lines and carburettors, and delivers maximum engine output and fuel economy.',
  },
  {
    q: 'Why did you build E0 Finder when other mapping apps exist?',
    a: 'Google Maps and oil company apps treat petrol pumps as generic points of interest without disclosing ethanol blending percentages. E0 Finder fills this national gap as the first and only platform dedicated to crowd-verifying and tracking 0% ethanol petrol stations.',
  },
  {
    q: 'How does the E0 Finder app find 0% ethanol petrol stations in India?',
    a: 'E0 Finder uses a hybrid verification system combining field team inspections and crowd-sourced community reports. Motorists upload fuel bills, pump photos, and density tests to confirm whether a petrol pump dispenses authentic 0% ethanol fuel.',
  },
  {
    q: 'Will E20 petrol damage my older bike or car?',
    a: 'Vehicles manufactured prior to April 2023 were not designed for E20 blended fuel. Ethanol is corrosive to non-treated rubber seals, fuel lines, plastic fuel tanks, and metallic carburettor jets, leading to degradation, moisture-induced misfires, and reduced engine lifespan.',
  },
  {
    q: 'Are premium fuels like IndianOil XP95, BPCL Speed 97, or HPCL Power 99 ethanol-free?',
    a: 'Official RTI disclosures and technical bulletins confirm that XP95, Power 95, and Speed 97 are blended with up to 20% ethanol (E20). The only commercially available 0% ethanol fuels in India are 100-octane fuels (like XP100 and poWer100) or select unblended batches.',
  },
  {
    q: 'Is the E0 Finder app completely free to use?',
    a: 'Yes, E0 Finder is 100% free with no subscription or paywall. Our mission is to build a reliable, open driver community protecting vehicle engines across India.',
  },
  {
    q: 'How do I contribute or report a new E0 petrol station?',
    a: 'Open the E0 Finder app, tap "Add Report" or select any pump on the map, choose the fuel type (E0 / Pure Petrol), and optionally upload a photo or fuel receipt. Once verified by our moderation system, it updates live for all nearby drivers.',
  },
]

export function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="mt-8 flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div key={faq.q} className="rounded-xl border border-border bg-card">
          <button
            className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-bold"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            aria-expanded={openFaq === i}
          >
            {faq.q}
            <ChevronDown className={openFaq === i ? 'rotate-180 text-primary transition-transform' : 'transition-transform'} />
          </button>
          {openFaq === i && <p className="px-5 pb-5 leading-7 text-muted-foreground">{faq.a}</p>}
        </div>
      ))}
    </div>
  )
}
