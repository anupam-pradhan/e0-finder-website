import { SitePage, PolicySection } from '@/components/site-page'

export const metadata = { title: 'Disclaimer — E0 Finder', description: 'Important disclaimer regarding E0 Finder petrol station listings and fuel availability reports.', alternates: { canonical: '/disclaimer' } }

export default function DisclaimerPage() {
  return <SitePage eyebrow="Important information" title="Disclaimer" intro="Please read this information before using station listings, fuel details, reports, prices, or directions provided by E0 Finder.">
    <div className="flex flex-col gap-8"><PolicySection title="Not a guarantee of availability"><p>E0 Finder listings and reports are informational. Fuel availability, ethanol content, prices, hours, station access, and route conditions can change without notice. Always verify details with the station before fueling.</p></PolicySection><PolicySection title="Community contributions"><p>Some information may be submitted by users or other sources. Reports are not professional inspections and may contain errors, omissions, or outdated information.</p></PolicySection><PolicySection title="Use your judgment"><p>E0 Finder does not provide mechanical, safety, legal, or financial advice. You are responsible for your vehicle, fuel choices, navigation decisions, and compliance with local laws.</p></PolicySection><PolicySection title="Contact"><p>To report incorrect information, contact <a className="font-semibold text-primary hover:underline" href="mailto:support@e0-finder.app">support@e0-finder.app</a>.</p></PolicySection></div>
  </SitePage>
}
