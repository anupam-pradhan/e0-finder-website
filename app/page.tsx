'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Fuel,
  Camera,
  Menu,
  Navigation,
  Search,
  ShieldCheck,
  Smartphone,
  Users,
  Video,
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  MapPin,
  Flame,
  Wrench,
  Gauge,
} from 'lucide-react'

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol'

const navItems = [
  ['Features', 'features'],
  ['Screenshots', 'screenshots'],
  ['E0 vs E20 Guide', 'fuel-guide'],
  ['City Locator', 'cities'],
  ['How It Works', 'how-it-works'],
  ['FAQ', 'faq'],
  ['About', 'about-us'],
  ['Contact', 'contact'],
]

const benefits = [
  { icon: Fuel, title: '0% Ethanol', text: 'Pure E0 Petrol Only' },
  { icon: ShieldCheck, title: 'Verified Stations', text: 'Team & community verified' },
  { icon: Zap, title: 'Live Availability', text: 'Real-time pump updates' },
  { icon: Users, title: 'Community Driven', text: '10,000+ active drivers' },
]

const steps = [
  { icon: Search, title: 'Search Location', text: 'Enter any city, highway, landmark, or let GPS locate nearest pumps.' },
  { icon: Fuel, title: 'Check E0 Status', text: 'Verify 0% ethanol availability, pump facilities, and user verification timestamps.' },
  { icon: Navigation, title: 'Navigate Directly', text: 'Open Google Maps or Apple Maps with one tap to reach the verified station.' },
  { icon: Users, title: 'Submit Live Reports', text: 'Help fellow motorists by submitting fuel bills, pump status, and price updates.' },
]

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

const oilBrands = [
  { name: 'Indian Oil', src: '/assets/oil_company_logo/Indian_Oil_Logo.svg' },
  { name: 'Bharat Petroleum', src: '/assets/oil_company_logo/Bharat_Petroleum_logo.svg' },
  { name: 'Hindustan Petroleum', src: '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg' },
  { name: 'Jio-bp', src: '/assets/oil_company_logo/Jio-bp_logo.svg' },
  { name: 'Shell', src: '/assets/oil_company_logo/shell-logo.png' },
  { name: 'Reliance Petroleum', src: '/assets/oil_company_logo/reliance-petroleum.png' },
]

const comparisonData = [
  { feature: 'Ethanol Blending %', e0: '0% (Pure Petrol)', e10: '10% Ethanol Blend', e20: '20% Ethanol Blend' },
  { feature: 'Engine Mileage & Range', e0: 'Maximum / Uncompromised', e10: '~2% Drop in Mileage', e20: '~6-8% Drop in Mileage' },
  { feature: 'Water / Moisture Absorption', e0: 'None (Hydrophobic)', e10: 'Moderate risk in humid weather', e20: 'High risk (Phase separation risk)' },
  { feature: 'Rubber Hose & Gasket Corrosion', e0: 'Completely Safe', e10: 'Minor wear over time', e20: 'Severe damage in non-E20 vehicles' },
  { feature: 'Carburettor & Injector Health', e0: 'Clean & Clog-Free', e10: 'Periodic cleaning needed', e20: 'High clogging & gumming risk' },
  { feature: 'Fuel Shelf Life in Tank', e0: '6 - 12 Months', e10: '2 - 3 Months', e20: 'Under 1 - 2 Months' },
]

const popularCities = [
  { name: 'Bengaluru', state: 'Karnataka', stations: '35+ Verified Pumps', slug: 'bangalore' },
  { name: 'Delhi NCR', state: 'Delhi & Haryana', stations: '48+ Verified Pumps', slug: 'delhi' },
  { name: 'Mumbai', state: 'Maharashtra', stations: '40+ Verified Pumps', slug: 'mumbai' },
  { name: 'Pune', state: 'Maharashtra', stations: '28+ Verified Pumps', slug: 'pune' },
  { name: 'Hyderabad', state: 'Telangana', stations: '32+ Verified Pumps', slug: 'hyderabad' },
  { name: 'Chennai', state: 'Tamil Nadu', stations: '26+ Verified Pumps', slug: 'chennai' },
  { name: 'Kolkata', state: 'West Bengal', stations: '20+ Verified Pumps', slug: 'kolkata' },
  { name: 'Chandigarh', state: 'Punjab / Haryana', stations: '18+ Verified Pumps', slug: 'chandigarh' },
  { name: 'Jaipur', state: 'Rajasthan', stations: '22+ Verified Pumps', slug: 'jaipur' },
  { name: 'Kochi', state: 'Kerala', stations: '19+ Verified Pumps', slug: 'kochi' },
  { name: 'Ahmedabad', state: 'Gujarat', stations: '24+ Verified Pumps', slug: 'ahmedabad' },
  { name: 'Goa', state: 'Goa', stations: '15+ Verified Pumps', slug: 'goa' },
]

const faqs = [
  {
    q: 'What is E0 petrol and why is it important?',
    a: 'E0 petrol is 100% pure petrol with 0% ethanol blending. Unlike E10 or E20 blended fuel, pure E0 does not absorb moisture, prevents corrosion in fuel lines and carburettors, and delivers maximum engine output and fuel economy.',
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
    a: 'While some premium high-octane fuels are unblended or maintain lower ethanol percentages at specific depot batches, many brands blend ethanol into 95-octane fuels too. E0 Finder verifies each individual pump so you know exactly which outlet sells genuine E0 petrol.',
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

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="E0 Finder home">
      <img src="/app-icon.png" alt="E0 Finder Logo" className="size-10 rounded-xl object-contain shadow-sm" />
      <span>
        <strong className="block text-2xl leading-none tracking-tight">Finder</strong>
        <small className="text-xs text-muted-foreground">Find Ethanol-Free Petrol</small>
      </span>
    </a>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeScreen, setActiveScreen] = useState(0)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <main id="home" className="min-h-screen bg-background text-foreground">
      {/* FAQ Schema for Google SERP Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="cursor-pointer text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] sm:flex"
            >
              Get App on Google Play <ExternalLink size={16} />
            </a>
            <button
              className="rounded-lg p-2 lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden">
            {[['Home', 'home'], ...navItems].map(([label, id]) => (
              <button
                key={id}
                className="rounded-md px-3 py-2 text-left font-semibold hover:bg-muted"
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-16 lg:pt-14">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Fuel size={14} /> India’s #1 0% Ethanol Petrol Locator
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Find <span className="text-primary">0% Ethanol (E0)</span> Petrol Stations Near You
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Protect your bike, car, and classic engine from corrosive blended fuel. Discover verified ethanol-free petrol pumps in real-time with live community reports across India.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col gap-1.5 rounded-xl border border-border/80 bg-card p-3 shadow-xs">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <strong className="text-xs sm:text-sm">{title}</strong>
                <span className="text-[11px] leading-4 text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
            >
              Download on Google Play <ExternalLink size={17} />
            </a>
            <button
              onClick={() => scrollTo('fuel-guide')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-6 py-3.5 font-semibold hover:border-primary hover:text-primary"
            >
              Why Pure E0 Matters <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-primary/5 to-primary/10 p-4 lg:p-6">
          <img
            src="/playstore_feature_graphic.png"
            alt="E0 Finder Mobile Application Feature Graphic"
            className="max-h-[440px] w-full rounded-xl object-contain shadow-lg"
          />
        </div>
      </section>

      {/* Supported Fuel Networks Banner */}
      <section className="border-y border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Search 0% Ethanol Pumps Across Major Indian Fuel Networks
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {oilBrands.map((brand) => (
              <div key={brand.name} className="flex items-center gap-2.5 grayscale transition-all duration-300 hover:grayscale-0">
                <img src={brand.src} alt={`${brand.name} petrol pump locator`} className="h-8 max-w-[100px] object-contain" />
                <span className="text-xs font-semibold text-foreground/80">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section id="features" className="border-b border-border bg-primary/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:grid-cols-3 lg:px-8">
          {[
            ['100% E0 Verified', 'Dedicated to authentic zero-percent ethanol petrol pumps'],
            ['10,000+ Active Drivers', 'Trusted by superbike riders, classic car owners & enthusiasts'],
            ['Real-Time Live Updates', 'Community validated fuel availability & instant turn-by-turn navigation'],
          ].map(([title, text], i) => (
            <div key={title} className="flex items-center gap-4 border-border sm:border-r sm:px-6 first:sm:pl-0 last:sm:border-0">
              <span className="text-primary">{i === 0 ? <ShieldCheck size={32} /> : i === 1 ? <Users size={32} /> : <Zap size={32} />}</span>
              <div>
                <strong className="block text-foreground">{title}</strong>
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deep-Dive SEO Section: Why E0 Fuel is Critical */}
      <section id="fuel-guide" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Engine Health & Performance Guide</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Why Switching to <span className="text-primary">0% Ethanol (E0)</span> Saves Your Engine
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            With the rapid rollout of E10 and E20 blended petrol across Indian fuel stations, understanding fuel chemistry is essential for vehicle longevity. Here is how pure E0 petrol safeguards your machine.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
              <AlertCircle size={26} />
            </div>
            <h3 className="text-lg font-bold">Zero Moisture Absorption</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ethanol is hygroscopic—it pulls water directly from ambient air into your fuel tank, causing phase separation, rusting tanks, and engine misfires during cold starts. E0 petrol is 100% hydrophobic.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Wrench size={26} />
            </div>
            <h3 className="text-lg font-bold">Protects Fuel Lines & Seals</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Blended ethanol degrades standard rubber hoses, O-rings, and plastic floats. Pure E0 petrol eliminates rubber swelling and dry rot, preventing dangerous fuel leaks and expensive repairs.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Gauge size={26} />
            </div>
            <h3 className="text-lg font-bold">Maximum Mileage & Power</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Ethanol contains ~33% less thermal energy per gallon than pure petrol. Running pure E0 fuel delivers up to 6–8% higher mileage, snappier throttle response, and smoother idle RPMs.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Flame size={26} />
            </div>
            <h3 className="text-lg font-bold">Ideal for Classic & Superbikes</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Carburetted engines (Royal Enfield Cast Iron/UCE, Yamaha RD350, RX100) and high-compression superbikes (Ducati, KTM, Kawasaki) suffer severe jet clogging with E20 fuel. E0 keeps jets pristine.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={26} />
            </div>
            <h3 className="text-lg font-bold">Long Storage Shelf Life</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              E20 fuel starts degrading within 30 to 60 days, forming thick varnish and gum. Pure E0 stays stable in fuel tanks and storage jerry cans for 6 to 12 months without chemical breakdown.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <Zap size={26} />
            </div>
            <h3 className="text-lg font-bold">Prevents Valve & Injector Gumming</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Combustion of pure hydrocarbon fuel burns cleaner with less carbon residue and sticky deposits on intake valves and fuel injectors compared to blended alcohol fuels.
            </p>
          </div>
        </div>
      </section>

      {/* Fuel Comparison Table */}
      <section className="border-y border-border bg-muted/25 py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Fuel Comparison Matrix</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">E0 vs E10 vs E20 Petrol</h2>
            <p className="mt-3 text-muted-foreground">Understand the key differences between pure petrol and blended fuels.</p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold">Key Parameter</th>
                  <th className="bg-primary/10 px-6 py-4 font-bold text-primary">E0 (Pure Petrol)</th>
                  <th className="px-6 py-4 font-bold">E10 Blend</th>
                  <th className="px-6 py-4 font-bold">E20 Blend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="hover:bg-muted/30">
                    <td className="px-6 py-4 font-semibold text-foreground">{row.feature}</td>
                    <td className="bg-primary/[0.04] px-6 py-4 font-bold text-primary">{row.e0}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.e10}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.e20}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* App Screenshots Showcase */}
      <section id="screenshots" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">In-App Experience</p>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">Explore the <span className="text-primary">E0 Finder</span> App</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A fast, modern mobile app built for Android to guide you to ethanol-free fuel whenever and wherever you drive.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="flex flex-col gap-3">
            {appScreens.map((screen, idx) => (
              <button
                key={screen.title}
                onClick={() => setActiveScreen(idx)}
                className={`cursor-pointer rounded-xl border p-5 text-left transition-all ${
                  activeScreen === idx
                    ? 'border-primary bg-primary/[0.06] shadow-sm'
                    : 'border-border hover:border-primary/40 hover:bg-muted/50'
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
      </section>

      {/* Popular Cities Coverage */}
      <section id="cities" className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Pan-India Availability</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Find E0 Petrol in Your City</h2>
            <p className="mt-3 text-muted-foreground">
              Crowd-verified and live-updated stations across top metropolitan areas and highway corridors.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularCities.map((city) => (
              <div key={city.name} className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-transform hover:-translate-y-0.5">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin size={18} />
                    <strong className="text-base font-bold text-foreground">{city.name}</strong>
                  </div>
                  <span className="mt-1 block text-xs text-muted-foreground">{city.state}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs font-semibold text-primary">{city.stations}</span>
                  <a href={playStoreUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-muted-foreground hover:text-primary">
                    View in App →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="border-t border-border bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Simple by design</p>
            <h2 className="text-3xl font-black sm:text-4xl">How <span className="text-primary">E0 Finder</span> Works?</h2>
            <p className="mt-4 text-muted-foreground">Finding high-grade ethanol-free fuel takes just seconds with our 4-step workflow.</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <div key={title} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon />
                  </span>
                  <div>
                    <strong className="block text-foreground">{i + 1}. {title}</strong>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
            <img src="/playstore_graphics.png" alt="E0 Finder Steps Graphic" className="max-h-[440px] w-full rounded-xl object-contain" />
          </div>
        </div>
      </section>

      {/* Why E0 Banner */}
      <section id="why-eo" className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-foreground/75">Why choose E0?</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Better fuel starts with better information.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-primary-foreground/80">
            Find fuel that protects delicate fuel lines, prevents moisture accumulation, maximizes fuel economy, and is kinder to classic, high-performance, and standard engines alike.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold">
            {['Verified listings', 'Live updates', 'Community reports', 'Easy navigation'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check size={17} /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary">Questions answered</p>
        <h2 className="mt-2 text-center text-3xl font-black">Frequently Asked Questions</h2>
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
      </section>

      {/* About Us */}
      <section id="about-us" className="mx-auto max-w-7xl border-t border-border px-5 py-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">About E0 Finder</p>
          <h2 className="mt-2 text-3xl font-black">Built for drivers who care about their engines.</h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            E0 Finder was created to give motorists clear, crowdsourced, and verified insights into where ethanol-free petrol can be found. Our mission is to keep every ride smoother, more efficient, and engine-friendly.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="mx-auto mb-16 flex max-w-7xl flex-col items-center justify-between gap-6 rounded-xl border border-primary/15 bg-primary/[0.04] px-6 py-8 text-center sm:flex-row sm:text-left lg:px-10">
        <div className="flex items-center gap-4">
          <img src="/app-icon.png" alt="E0 Finder App" className="size-14 rounded-xl object-contain shadow-sm" />
          <div>
            <h2 className="text-2xl font-black">Start Using <span className="text-primary">E0 Finder</span> Today!</h2>
            <p className="text-muted-foreground">Download the app and find ethanol-free petrol stations near you.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={playStoreUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
            Download App
          </a>
          <a href="mailto:support@e0-finder.app" className="rounded-lg border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
            Contact Support
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-8 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <img src="/app-icon.png" alt="E0 Finder" className="size-9 rounded-lg bg-white p-0.5 object-contain" />
                <strong className="text-xl">Finder</strong>
              </div>
              <p className="mt-2 text-xs text-primary-foreground/70">Find Ethanol-Free Petrol Stations in India</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/terms" className="hover:underline">Terms of Use</a>
              <a href="/disclaimer" className="hover:underline">Disclaimer</a>
              <a href="/contact" className="hover:underline">Contact Us</a>
              <a href="/delete-account" className="hover:underline">Delete Account</a>
            </div>
            <div className="flex gap-3" aria-label="Social links">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:opacity-80"><Camera /></a>
              <a href="https://youtube.com" aria-label="YouTube" className="hover:opacity-80"><Video /></a>
              <a href={playStoreUrl} aria-label="Google Play" className="hover:opacity-80"><ExternalLink /></a>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-5 text-center text-xs text-primary-foreground/65">
            © 2026 E0 Finder. All rights reserved. <span id="privacy">Privacy policy available on request.</span> <span id="terms">Terms apply.</span> <span id="disclaimer">Information may change based on community updates.</span>
          </div>
        </div>
      </footer>
    </main>
  )
}


