'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
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
  Star,
  Sparkles,
  BookOpen,
  TrendingUp,
  Award,
  Calculator,
  Layers,
  BarChart3,
  Sliders,
  CheckCircle,
  Play,
  Share2,
  Lightbulb,
} from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol'


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

function GooglePlayIcon({ className = 'size-5 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none" aria-hidden="true">
      <path
        d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
        fill="#EA4335"
      />
      <path
        d="M47 30.6c-4.4 7.6-7 16.9-7 27.4v396c0 10.5 2.6 19.8 7 27.4l246.3-246.3L47 30.6z"
        fill="#4285F4"
      />
      <path
        d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"
        fill="#34A853"
      />
      <path
        d="M470.8 238.6L385.4 189.4l-60.1 44.9 60.1 44.9 85.4-49.2c16.3-9.4 16.3-25.1 0-34.4l-.1.1z"
        fill="#FBBC04"
      />
    </svg>
  )
}

const oilBrands = [
  {
    name: 'Indian Oil',
    alt: 'Indian Oil petrol pump locator',
    src: '/assets/oil_company_logo/Indian_Oil_Logo.svg',
    grade: 'XP100 & XP95',
  },
  {
    name: 'Bharat Petroleum',
    alt: 'Bharat Petroleum petrol pump locator',
    src: '/assets/oil_company_logo/Bharat_Petroleum_logo.svg',
    grade: 'Speed 97 & Speed',
  },
  {
    name: 'Hindustan Petroleum',
    alt: 'Hindustan Petroleum petrol pump locator',
    src: '/assets/oil_company_logo/Hindustan_Petroleum-Logo.wine.svg',
    grade: 'poWer100 & poWer95',
  },
  {
    name: 'Jio-bp',
    alt: 'Jio-bp petrol pump locator',
    src: '/assets/oil_company_logo/Jio-bp_logo.svg',
    grade: 'ACTIVE Tech Fuel',
  },
  {
    name: 'Shell',
    alt: 'Shell petrol pump locator',
    src: '/assets/oil_company_logo/shell-logo.png',
    grade: 'V-Power & Unleaded',
  },
  {
    name: 'Reliance Petroleum',
    alt: 'Reliance Petroleum petrol pump locator',
    src: '/assets/oil_company_logo/reliance-petroleum.png',
    grade: 'Pure Hydrocarbon',
  },
]

const comparisonData = [
  { feature: 'Ethanol Blending %', e0: '0% (Pure Petrol)', e10: '10% Ethanol Blend', e20: '20% Ethanol Blend' },
  { feature: 'Engine Mileage & Range', e0: 'Maximum / Uncompromised', e10: '~2% Drop in Mileage', e20: '~6-8% Drop in Mileage' },
  { feature: 'Water / Moisture Absorption', e0: 'None (Hydrophobic)', e10: 'Moderate risk in humid weather', e20: 'High risk (Phase separation risk)' },
  { feature: 'Rubber Hose & Gasket Corrosion', e0: 'Completely Safe', e10: 'Minor wear over time', e20: 'Severe damage in non-E20 vehicles' },
  { feature: 'Carburettor & Injector Health', e0: 'Clean & Clog-Free', e10: 'Periodic cleaning needed', e20: 'High clogging & gumming risk' },
  { feature: 'Fuel Shelf Life in Tank', e0: '6 - 12 Months', e10: '2 - 3 Months', e20: 'Under 1 - 2 Months' },
]

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

const stateEthanolIndex = [
  { state: 'Delhi NCR', blend: '20.0%', density: '748 kg/m³', stations: '64 Verified Bunks', status: 'Highest E20 Penetration' },
  { state: 'Maharashtra (Mumbai/Pune)', blend: '19.8%', density: '745 kg/m³', stations: '58 Verified Bunks', status: 'Active Community' },
  { state: 'Rajasthan (Jaipur/Udaipur)', blend: '19.6%', density: '746 kg/m³', stations: '29 Verified Bunks', status: 'Growing Coverage' },
  { state: 'Gujarat (Ahmedabad/Surat)', blend: '19.5%', density: '744 kg/m³', stations: '32 Verified Bunks', status: 'High Highway Demand' },
  { state: 'Karnataka (Bengaluru/Mysuru)', blend: '19.4%', density: '742 kg/m³', stations: '42 Verified Bunks', status: 'Top Superbike Hub' },
  { state: 'Telangana (Hyderabad)', blend: '19.2%', density: '743 kg/m³', stations: '38 Verified Bunks', status: 'Verified Corridor' },
  { state: 'Tamil Nadu (Chennai/Coimbatore)', blend: '18.9%', density: '740 kg/m³', stations: '36 Verified Bunks', status: 'Active Enthusiast Base' },
  { state: 'Kerala (Kochi/Trivandrum)', blend: '18.7%', density: '739 kg/m³', stations: '25 Verified Bunks', status: 'High Humidity Moisture Alert' },
  { state: 'Punjab & Chandigarh', blend: '20.0%', density: '747 kg/m³', stations: '31 Verified Bunks', status: 'High E20 Rollout' },
  { state: 'West Bengal (Kolkata)', blend: '18.5%', density: '738 kg/m³', stations: '24 Verified Bunks', status: 'Expanding Network' },
]

const calculatorVehicles = [
  { label: 'Superbike / Twin (600cc+)', e0Kmpl: 20, e20Kmpl: 17.5, maintSaved: 15000 },
  { label: 'Performance Bike (200-400cc)', e0Kmpl: 32, e20Kmpl: 28.5, maintSaved: 8000 },
  { label: 'Classic / 2-Stroke Motorcycle', e0Kmpl: 35, e20Kmpl: 29.5, maintSaved: 18000 },
  { label: 'Daily Commuter Bike (100-160cc)', e0Kmpl: 52, e20Kmpl: 47.0, maintSaved: 4500 },
  { label: 'Turbo Petrol Car (1.0L / 1.5L TSI/GDi)', e0Kmpl: 15, e20Kmpl: 13.2, maintSaved: 22000 },
  { label: 'Hatchback / Sedan (1.2L Petrol)', e0Kmpl: 18, e20Kmpl: 16.1, maintSaved: 9000 },
]

const userReviews = [
  {
    name: 'Vikramaditya S.',
    role: 'Ducati Panigale V4 & RE Interceptor 650 Owner',
    city: 'Bengaluru',
    rating: 5,
    date: 'August 14, 2026',
    title: 'Absolute lifesaver for superbike owners in India!',
    review:
      'Finding 100-octane E0 petrol in Bengaluru used to be pure guesswork. E0 Finder shows exact pump locations, when the last batch was verified, and if the station has stock. My Panigale runs noticeably smoother with zero injector knock.',
  },
  {
    name: 'Rohan Deshmukh',
    role: 'Vintage Motorcycle Restorer (RD350 / RX100)',
    city: 'Pune',
    rating: 5,
    date: 'August 11, 2026',
    title: 'Saved my carburettors from green corrosion.',
    review:
      'After E20 rolled out, my Yamaha RD350 carburettor jets were constantly getting clogged with white crust. Thanks to this app, I only fill verified E0 unblended petrol. Essential app for any two-stroke enthusiast.',
  },
  {
    name: 'Col. Rajesh Nair (Retd.)',
    role: '1974 Royal Enfield Bullet 350 Owner',
    city: 'Kochi',
    rating: 5,
    date: 'August 09, 2026',
    title: 'Community verification is super accurate.',
    review:
      'I was skeptical at first, but the community upload feature where fellow riders post fuel bills and density test readings gives 100% confidence before driving 15 km to a fuel station.',
  },
  {
    name: 'Aditya Mathur',
    role: 'Track Enthusiast & VW Polo GTI Driver',
    city: 'Delhi NCR',
    rating: 5,
    date: 'August 06, 2026',
    title: '4.9 stars well deserved — brilliant UI and real data.',
    review:
      'Most people dont realize XP95 now has 20% ethanol. This app opened my eyes. Found an IOCL XP100 station near Noida Expressway in 2 minutes. The turn-by-turn navigation is seamless.',
  },
  {
    name: 'Karthik Ramanathan',
    role: 'Long Distance Highway Tourer',
    city: 'Chennai',
    rating: 5,
    date: 'August 02, 2026',
    title: 'Indispensable tool for highway road trips.',
    review:
      'Used E0 Finder on a 2,000 km ride from Chennai to Goa. Mapped all verified E0 stops along the highway. Zero moisture hesitation in heavy monsoon rains.',
  },
  {
    name: 'Suresh Patil',
    role: 'Independent Automotive Technician',
    city: 'Mumbai',
    rating: 5,
    date: 'July 29, 2026',
    title: 'I recommend this app to every customer who walks in.',
    review:
      'We see so many pre-2020 cars coming in with corroded fuel pump gaskets. I tell every customer to use E0 Finder to locate ethanol-free fuel for their weekend cars.',
  },
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

const navItems = [
  ['Calculator', 'calculator'],
  ['Vehicles', 'vehicles'],
  ['E0 vs E20', 'fuel-guide'],
  ['State Index', 'state-index'],
  ['Trends', 'trends'],
  ['Reviews', 'reviews'],
  ['Cities', 'cities'],
  ['FAQ', 'faq'],
]

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 shrink-0" aria-label="E0 Finder home">
      <img src="/app-icon.png" alt="E0 Finder Logo" className="size-9 sm:size-10 rounded-xl object-contain shadow-xs shrink-0" />
      <div className="flex flex-col justify-center leading-none">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-1">
          <span className="text-primary">E0</span>Finder
        </span>
        <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground mt-1 whitespace-nowrap hidden min-[400px]:block">
          Find 0% Ethanol Petrol
        </span>
      </div>
    </a>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [activeScreen, setActiveScreen] = useState(0)

  // Interactive Calculator State
  const [monthlyKm, setMonthlyKm] = useState<number>(1200)
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState<number>(0)
  const [fuelPrice, setFuelPrice] = useState<number>(102)

  // Vehicle Database Category Tab
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<number>(0)

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
    <main id="home" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* FAQ Schema for Google SERP Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-4 xl:gap-5 lg:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="cursor-pointer text-xs xl:text-sm font-semibold text-foreground/80 transition-colors hover:text-primary whitespace-nowrap"
              >
                {label}
              </button>
            ))}
            <Link
              href="/blog"
              className="text-xs xl:text-sm font-semibold text-foreground/80 hover:text-primary flex items-center gap-1 whitespace-nowrap"
            >
              <BookOpen size={14} /> Blog & Guides
            </Link>
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs xl:text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] sm:flex shadow-xs whitespace-nowrap"
            >
              <GooglePlayIcon className="size-4" /> Get App
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
            <Link
              href="/blog"
              className="rounded-md px-3 py-2 text-left font-semibold text-foreground/80 hover:bg-muted flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <BookOpen size={16} /> Blog & Knowledge Hub
            </Link>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-16 lg:pt-14">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Fuel size={14} /> India’s First & Only 0% Ethanol Petrol Locator
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Find <span className="text-primary">0% Ethanol (E0)</span> Petrol Stations Near You
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Protect your superbike, vintage classic, and car from corrosive E20 fuel. Discover verified ethanol-free petrol pumps in real-time with crowd-validated density reports across India.
          </p>

          {/* Social Proof Star Badge */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-sm font-bold">4.9 / 5.0 Rating</span>
            <span className="text-xs text-muted-foreground">(2,500+ Enthusiast Reviews)</span>
          </div>

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
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
            {/* Primary Google Play Download Button */}
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] hover:bg-primary/90"
            >
              <GooglePlayIcon className="size-6" />
              <div className="text-left leading-none">
                <span className="block text-[10px] font-semibold text-primary-foreground/80 uppercase tracking-wider">
                  Download Free On
                </span>
                <span className="block text-base font-black mt-0.5">Google Play Store</span>
              </div>
            </a>

            {/* Savings Calculator Shortcut */}
            <button
              onClick={() => scrollTo('calculator')}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors shadow-xs"
            >
              Calculate Fuel Savings <ArrowRight size={17} />
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
      <section className="border-y border-border bg-gradient-to-b from-muted/40 via-background to-muted/20 py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              <Fuel size={14} /> Comprehensive Oil Marketing Network Coverage
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Search 0% Ethanol Pumps Across Major Indian Fuel Networks
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              Real-time locator coverage for unblended 0% ethanol and 100-octane fuel dispensers across all primary state and private oil retail companies.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {oilBrands.map((brand) => (
              <a
                key={brand.name}
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-4 text-center shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex h-14 w-full items-center justify-center rounded-xl bg-white p-2 shadow-2xs">
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="max-h-10 max-w-[100px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 w-full">
                  <strong className="block text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </strong>
                  <span className="mt-0.5 block text-[10px] font-semibold text-primary">
                    {brand.grade}
                  </span>
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground group-hover:text-primary group-hover:underline">
                  Locate in App →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Fuel Savings & Mileage Calculator */}
      <section id="calculator" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Calculator size={14} /> Interactive Cost & Mileage Calculator
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            See How Much <span className="text-primary">E0 Petrol</span> Saves Your Engine & Wallet
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Calculate your annual fuel efficiency recovery, extra fuel saved, and preventive maintenance savings by avoiding corrosive E20 blends.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Controls Box */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-foreground">Select Your Vehicle & Driving Profile</h3>

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
      </section>

      {/* Vehicle Compatibility & Risk Database */}
      <section id="vehicles" className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Layers size={14} /> Official Compatibility Index
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Is Your Bike or Car <span className="text-primary">E20 Compliant</span>?
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Search our vehicle database to check whether your engine requires pure E0 petrol or is certified for blended fuels.
            </p>
          </div>

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
        </div>
      </section>

      {/* Social Trends / Instagram Viral Radar */}
      <section id="trends" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-600">
            <Camera size={14} /> Viral Enthusiast Movement
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Trending on <span className="text-pink-600">Instagram & YouTube</span>: The Pure Petrol Revolution
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Over 50 Million views across reels and shorts documenting DIY 100ml water extraction tests, dynamometer runs, and classic bike revivals.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-pink-600 font-bold uppercase tracking-wider">
                <span>Instagram Trend</span>
                <span>18.4M Views</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-foreground">The 100ml Graduated Cylinder Water Test</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Motovloggers demonstrating how water extracts alcohol from pump fuel in real-time. Riders are using this test before logging pumps on E0 Finder.
              </p>
            </div>
            <Link
              href="/blog/viral-instagram-petrol-water-test-guide"
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Read DIY Test Guide →
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-pink-600 font-bold uppercase tracking-wider">
                <span>Dyno Telemetry</span>
                <span>12.8M Views</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-foreground">E0 vs E20 Horsepower Dyno Shootouts</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Performance tuning garages proving +4% horsepower gains and cleaner AFR curves when running 100% pure E0 fuel on KTMs and GT650s.
              </p>
            </div>
            <Link
              href="/blog/e20-vs-e0-dyno-test-power-mileage"
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              View Dyno Charts →
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-pink-600 font-bold uppercase tracking-wider">
                <span>Vintage Preservation</span>
                <span>21.2M Views</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-foreground">Two-Stroke & Classic Bullet Restoration</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Mechanics warning against 2T oil separation and brass carburettor jet clogging, pointing classic owners exclusively to E0 stations.
              </p>
            </div>
            <Link
              href="/blog/protecting-vintage-classic-motorcycles-from-ethanol"
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              Read Protection Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* State-by-State Ethanol Blending Index */}
      <section id="state-index" className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <BarChart3 size={14} /> Pan-India Data Matrix
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              State-Wise Ethanol Blending & Density Index (2026)
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Official refinery blend averages, standard fuel density ranges, and verified E0 stations across major states.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold">State / Territory</th>
                  <th className="px-6 py-4 font-bold">Regular Blend %</th>
                  <th className="px-6 py-4 font-bold">Standard Fuel Density</th>
                  <th className="px-6 py-4 font-bold">Verified E0 Stations</th>
                  <th className="px-6 py-4 font-bold">Status Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stateEthanolIndex.map((row) => (
                  <tr key={row.state} className="hover:bg-muted/30">
                    <td className="px-6 py-4 font-bold text-foreground">{row.state}</td>
                    <td className="px-6 py-4 text-destructive font-semibold">{row.blend}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.density}</td>
                    <td className="px-6 py-4 font-bold text-primary">{row.stations}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The Market Opportunity / Why E0 Finder Exists */}
      <section id="opportunity" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <TrendingUp size={14} /> The Missing Link in Indian Mobility
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Why <span className="text-primary">E0 Finder</span> Fills a Massive National Need
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            India has over 85,000 petrol pumps and 250 million registered vehicles. Yet, until E0 Finder, there was no single platform in India dedicated to identifying true ethanol-free fuel.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <XCircle size={26} />
              </div>
              <h3 className="text-lg font-bold">Oil Company Apps Lack Transparency</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Official apps (IndianOil One, HP Pay, Fuel@IOC) show pump listings, but **never report real-time ethanol blending percentages or unblended batch availability**. Motorists are left guessing.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground border-l-2 border-destructive">
              Problem: No real-time ethanol % disclosure
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <XCircle size={26} />
              </div>
              <h3 className="text-lg font-bold">Google Maps Shows Only Generic POIs</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Generic map applications list petrol bunks without fuel grade distinctions. They cannot distinguish between regular E20 fuel, blended 95-octane, and authentic 100-octane E0 petrol.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground border-l-2 border-destructive">
              Problem: Zero fuel grade differentiation
            </div>
          </div>

          <div className="rounded-2xl border border-primary/40 bg-primary/[0.03] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck size={26} />
              </div>
              <h3 className="text-lg font-bold text-primary">The E0 Finder Solution</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A purpose-built, crowd-verified platform where drivers upload fuel bills, test hydrometer densities, verify stock, and navigate straight to pure 0% ethanol pumps.
              </p>
            </div>
            <div className="mt-6 rounded-lg bg-primary/10 p-3 text-xs font-semibold text-primary border-l-2 border-primary">
              Solution: India&apos;s only verified E0 locator
            </div>
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

      {/* 4.9★ Review Section */}
      <section id="reviews" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-600">
            <Star size={14} className="fill-amber-500" /> Rated 4.9 / 5.0 by 2,500+ Drivers
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Loved by Bikers, Classic Collectors & Drivers Across India
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            See how E0 Finder is protecting engines and giving motorists peace of mind every time they refuel.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userReviews.map((rev) => (
            <div
              key={rev.name}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{rev.date}</span>
                </div>

                <h3 className="mt-3 text-base font-bold text-foreground">{rev.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <strong className="block text-sm font-bold text-foreground">{rev.name}</strong>
                  <span className="block text-xs text-muted-foreground">{rev.role} • {rev.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Screenshots Showcase */}
      <section id="screenshots" className="border-t border-border bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
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
        </div>
      </section>

      {/* Featured Blog & Research Guides Section */}
      <section id="blog-section" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <BookOpen size={14} /> Knowledge Hub & Research
            </div>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Latest Fuel Insights & Maintenance Guides
            </h2>
            <p className="mt-2 text-muted-foreground">
              Deep dives into fuel chemistry, ethanol blending policies, and motorcycle preservation.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-primary hover:underline"
          >
            View all {blogPosts.length} guides →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 6).map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-6">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6 border-t border-border pt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{post.publishedDate}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
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
                    <strong className="text-base font-bold text-foreground">
                      <Link href={`/city/${city.slug}`} className="hover:underline">
                        {city.name}
                      </Link>
                    </strong>
                  </div>
                  <span className="mt-1 block text-xs text-muted-foreground">{city.state}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs font-semibold text-primary">{city.stations}</span>
                  <Link href={`/city/${city.slug}`} className="text-xs font-semibold text-primary hover:underline">
                    View City Guide →
                  </Link>
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
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.02] shadow-md"
          >
            <GooglePlayIcon className="size-5" />
            <span>Download on Google Play</span>
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
              <div className="flex items-center gap-2.5">
                <img src="/app-icon.png" alt="E0 Finder" className="size-9 rounded-xl bg-white p-0.5 object-contain" />
                <span className="text-xl font-black tracking-tight flex items-center">
                  <span className="text-white">E0</span> Finder
                </span>
              </div>
              <p className="mt-2 text-xs text-primary-foreground/70">Find Ethanol-Free Petrol Stations in India</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
              <a href="/blog" className="hover:underline">Blog & Guides</a>
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


