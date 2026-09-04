'use client'

import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Search,
  MapPin,
  Fuel,
  ShieldCheck,
  Zap,
  Navigation,
  Phone,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  AlertCircle,
  Share2,
  Download,
  ArrowLeft,
  X,
  Layers,
  Sparkles,
  Info,
  Map as MapIcon,
  List,
  Filter,
  Check,
  Send,
  Plus,
  Loader2,
  ChevronDown,
} from 'lucide-react'
import { initialStations, WebStation } from '@/lib/stations-data'
import { citiesData } from '@/lib/city-data'

import { GooglePlayIcon } from '@/components/google-play-icon'

const findFaqs = [
  {
    q: 'How do I find ethanol-free (E0) petrol pumps near me?',
    a: 'Open the live map above, tap “Find Nearest (GPS)” or search your city, area or pincode. You will instantly see verified 0% ethanol petrol pumps near you with real-time availability, fuel density and one-tap directions.',
  },
  {
    q: 'Which fuels are actually 0% ethanol in India?',
    a: 'The widely available 0% ethanol (E0) fuels are 100-octane grades — IndianOil XP100 and HPCL poWer100 — plus select unblended BPCL Speed 97 batches. Regular petrol and XP95 are usually blended with up to 20% ethanol (E20).',
  },
  {
    q: 'Is IndianOil XP95 or BPCL Speed 97 ethanol-free?',
    a: 'Most premium 95-octane fuels like XP95 now contain up to 20% ethanol. For guaranteed 0% ethanol, look for XP100 or poWer100. E0 Finder tags every pump with its verified fuel grade so you know exactly what you are getting.',
  },
  {
    q: 'How can I avoid E20 petrol and find non-E20 pumps near me?',
    a: 'Use the fuel-grade filter (XP100, poWer100, Speed 97) to show only verified ethanol-free stations, so you can skip E20 and E10 blends that can damage older bikes, classic vehicles and cars.',
  },
  {
    q: 'Is the IndianOil / IOCL XP100 pump locator free to use?',
    a: 'Yes. Browsing verified XP100, poWer100 and Speed 97 locations on E0 Finder is completely free — both on the web and in the free Android app.',
  },
]

const findFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: findFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// Dynamically import Leaflet map component with ssr disabled
const DynamicLeafletMap = dynamic(() => import('@/components/leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[380px] lg:min-h-[460px] w-full items-center justify-center rounded-3xl border border-border bg-muted/30">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="animate-spin text-primary" />
        <span className="text-xs font-bold text-muted-foreground">Loading Live Petrol Pump Map...</span>
      </div>
    </div>
  ),
})

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c).toFixed(1)
}

export default function FindE0WebPage({
  initialStations: serverInitialStations,
}: {
  initialStations?: WebStation[]
} = {}) {
  const [stations, setStations] = useState<WebStation[]>(
    serverInitialStations && serverInitialStations.length > 0
      ? serverInitialStations
      : initialStations
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [selectedFuelGrade, setSelectedFuelGrade] = useState('All Grades')
  const [cocoOnly, setCocoOnly] = useState(false)
  const [open24Only, setOpen24Only] = useState(false)
  const [activeStationId, setActiveStationId] = useState<string>(
    serverInitialStations?.[0]?.id || initialStations[0]?.id || ''
  )
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locating, setLocating] = useState(false)
  const [locError, setLocError] = useState('')
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split')
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [reportSuccess, setReportSuccess] = useState(false)
  const [shareToast, setShareToast] = useState(false)

  // Report Form State
  const [reportStationName, setReportStationName] = useState('')
  const [reportDensity, setReportDensity] = useState('')
  const [reportFuelGrade, setReportFuelGrade] = useState('XP100 (0% Ethanol)')
  const [reportCity, setReportCity] = useState('Bengaluru')
  const [reportNotes, setReportNotes] = useState('')
  const [reportError, setReportError] = useState('')
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<string>('06:00 AM IST Today')
  const [isSyncing, setIsSyncing] = useState<boolean>(false)

  // Fetch live daily updated stations on mount
  const fetchLiveStations = async () => {
    try {
      setIsSyncing(true)
      const res = await fetch('/api/stations')
      if (res.ok) {
        const data = await res.json()
        if (data.stations && data.stations.length > 0) {
          // Load any local community submissions
          let localReports: WebStation[] = []
          try {
            const saved = localStorage.getItem('e0_community_reports')
            if (saved) localReports = JSON.parse(saved)
          } catch (e) {}

          setStations([...localReports, ...data.stations])
          if (data.omcRevisionDate) {
            setLastSyncTime(`${data.omcRevisionDate} • ${data.omcRevisionTime}`)
          }
        }
      }
    } catch (err) {
      console.error('Failed to sync live stations', err)
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    fetchLiveStations()
  }, [])

  // Geolocation trigger
  const handleLocateMe = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.')
      return
    }
    setLocating(true)
    setLocError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setLocating(false)
      },
      (err) => {
        setLocError('Could not retrieve your GPS location. Please check browser permissions.')
        setLocating(false)
      },
      { timeout: 10000 }
    )
  }

  // Filtered & Sorted stations
  const filteredStations = useMemo(() => {
    return stations
      .filter((stn) => {
        const matchesQuery =
          stn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stn.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stn.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stn.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stn.pincode.includes(searchQuery)

        const matchesCity = selectedCity === 'All Cities' || stn.city === selectedCity
        const matchesBrand = selectedBrand === 'All Brands' || stn.brand === selectedBrand
        const matchesGrade = selectedFuelGrade === 'All Grades' || stn.fuelGrade === selectedFuelGrade
        const matchesCOCO = !cocoOnly || stn.isCOCO
        const matches24 = !open24Only || stn.isOpen24Hours

        return matchesQuery && matchesCity && matchesBrand && matchesGrade && matchesCOCO && matches24
      })
      .map((stn) => {
        let distance = '0'
        if (userLocation) {
          distance = calculateDistance(userLocation.lat, userLocation.lng, stn.latitude, stn.longitude)
        }
        return { ...stn, computedDistance: parseFloat(distance) }
      })
      .sort((a, b) => {
        if (userLocation) {
          return a.computedDistance - b.computedDistance
        }
        return b.rating - a.rating
      })
  }, [
    stations,
    searchQuery,
    selectedCity,
    selectedBrand,
    selectedFuelGrade,
    cocoOnly,
    open24Only,
    userLocation,
  ])

  const activeStation = useMemo(() => {
    return stations.find((s) => s.id === activeStationId) || filteredStations[0] || initialStations[0]
  }, [stations, activeStationId, filteredStations])

  const citiesList = useMemo(() => {
    return ['All Cities', ...Array.from(new Set(stations.map((s) => s.city)))]
  }, [stations])

  const handleShare = (stn: WebStation) => {
    if (navigator.share) {
      navigator.share({
        title: `${stn.name} — 0% Ethanol Petrol Station`,
        text: `Found verified 0% ethanol petrol (${stn.fuelGrade}) at ${stn.name}, ${stn.city} on E0 Finder!`,
        url: `https://e0-finder.app/find?station=${stn.id}`,
      })
    } else {
      navigator.clipboard?.writeText(`https://e0-finder.app/find?station=${stn.id}`)
      setShareToast(true)
      setTimeout(() => setShareToast(false), 2500)
    }
  }

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reportStationName) return
    setReportError('')
    setIsSubmittingReport(true)

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stationName: reportStationName,
          city: reportCity,
          fuelGrade: reportFuelGrade,
          density: reportDensity,
          notes: reportNotes,
          latitude: activeStation ? activeStation.latitude + 0.005 : 12.9716,
          longitude: activeStation ? activeStation.longitude + 0.005 : 77.5946,
        }),
      })

      const data = await res.json()

      if (!res.ok || data.status === 'error') {
        setReportError(data.message || 'Failed to submit report. Please try again.')
        setIsSubmittingReport(false)
        return
      }

      const optimisticStation: WebStation = {
        id: `community-${Date.now()}`,
        name: reportStationName,
        brand: 'IndianOil',
        brandLogo: '/assets/oil_company_logo/indian-oil-logo.svg',
        fuelGrade: reportFuelGrade as any,
        isE0Confirmed: true,
        isCOCO: false,
        address: `${reportStationName}, ${reportCity}`,
        area: reportCity,
        city: reportCity,
        state: 'India',
        pincode: '000000',
        latitude: activeStation ? activeStation.latitude + 0.005 : 12.9716,
        longitude: activeStation ? activeStation.longitude + 0.005 : 77.5946,
        price: 145.0,
        density: reportDensity ? `${reportDensity} kg/m³ @ 15°C` : '735.0 kg/m³ @ 15°C',
        lastVerified: 'Just now (Pending Verification)',
        verifiedBy: 'Community Web Submission',
        rating: 5.0,
        reviewCount: 1,
        isOpen24Hours: true,
        timing: 'Open 24 Hours',
        phone: '',
        amenities: ['0% Ethanol Dispenser', 'UPI / Card'],
      }

      setStations((prev) => [optimisticStation, ...prev])
      setActiveStationId(optimisticStation.id)
      setReportSuccess(true)

      setTimeout(() => {
        setReportSuccess(false)
        setReportModalOpen(false)
        setReportStationName('')
        setReportDensity('')
        setReportNotes('')
        setReportError('')
      }, 2500)
    } catch (err) {
      setReportError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmittingReport(false)
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="E0 Finder home">
            <img
              src="/app-icon.png"
              alt="E0 Finder Logo"
              className="size-9 rounded-xl object-contain shadow-xs shrink-0"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-xl font-black tracking-tight text-foreground flex items-center gap-1">
                <span className="text-primary">E0</span>Finder
                <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary ml-1 uppercase">
                  Live Map
                </span>
              </span>
              <span className="text-[10px] font-medium text-muted-foreground mt-0.5 whitespace-nowrap hidden min-[400px]:block">
                Find 0% Ethanol Petrol Pumps Near You
              </span>
            </div>
          </Link>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setReportModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus size={15} /> Add Petrol Pump
            </button>
            <Link
              href="/blog"
              className="hidden md:inline-flex text-xs font-semibold text-foreground/80 hover:text-primary"
            >
              Fuel Guides
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.anupampradhan.ethanolfreepetrol"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              <GooglePlayIcon className="size-3.5" /> Get App
            </a>
          </div>
        </div>
      </header>

      {/* SEO Hero — headline + crawlable intro */}
      <section className="border-b border-border bg-gradient-to-b from-primary/[0.06] to-transparent px-4 pt-6 pb-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="e0-fade-up text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            <span className="e0-text-gradient">Ethanol-Free (E0)</span> Petrol Pumps Near You
          </h1>
          <p className="e0-fade-up e0-delay-1 mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Use the live <strong>E0 fuel finder</strong> to locate verified 0% ethanol petrol pumps near you
            across India — including IndianOil <strong>XP100</strong>, HPCL <strong>poWer100</strong>,
            BPCL <strong>Speed 97</strong> and <strong>XP95</strong>. Check real-time availability, fuel
            density and prices, then get directions to the nearest ethanol-free petrol station.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="border-b border-border bg-card/60 backdrop-blur px-4 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Live Daily Status Badge */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Daily Updates
              </span>
              <span className="text-muted-foreground text-[11px]">
                Daily Verified Prices & Petrol Purity: <strong className="text-foreground">{lastSyncTime}</strong>
              </span>
            </div>
            <button
              onClick={fetchLiveStations}
              disabled={isSyncing}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
            >
              {isSyncing ? 'Syncing Feeds...' : '↻ Refresh Feeds'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Location & Keyword Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, area, pincode, or highway (e.g. Koramangala, BKC, Chanakyapuri, 560095)..."
                className="w-full rounded-2xl border border-border bg-background py-3 pl-11 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* GPS Locate Me Button */}
            <button
              onClick={handleLocateMe}
              disabled={locating}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all shadow-xs shrink-0 ${
                userLocation
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {locating ? <Loader2 size={16} className="animate-spin text-primary" /> : <Navigation size={16} />}
              {locating ? 'Locating GPS...' : userLocation ? 'GPS Active (Nearest First)' : 'Find Nearest (GPS)'}
            </button>
          </div>

          {locError && (
            <p className="mt-2 text-xs text-destructive flex items-center gap-1 font-medium">
              <AlertCircle size={14} /> {locError}
            </p>
          )}

          {/* Filter Row */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {/* City Dropdown */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
            >
              {citiesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Fuel Grade Dropdown */}
            <select
              value={selectedFuelGrade}
              onChange={(e) => setSelectedFuelGrade(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
            >
              <option value="All Grades">All E0 Fuel Grades</option>
              <option value="XP100 (0% Ethanol)">IndianOil XP100 (100 Octane)</option>
              <option value="poWer100 (0% Ethanol)">HPCL poWer100 (100 Octane)</option>
              <option value="Speed 97 (0% Ethanol)">BPCL Speed 97 (Unblended)</option>
            </select>

            {/* Brand Dropdown */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-xs"
            >
              <option value="All Brands">All Fuel Brands</option>
              <option value="IndianOil">IndianOil (IOCL)</option>
              <option value="HPCL">Hindustan Petroleum (HPCL)</option>
              <option value="BPCL">Bharat Petroleum (BPCL)</option>
            </select>

            {/* COCO Toggle */}
            <button
              onClick={() => setCocoOnly(!cocoOnly)}
              className={`rounded-xl px-3.5 py-2 font-bold transition-colors whitespace-nowrap shadow-xs ${
                cocoOnly
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              COCO Flagship Only
            </button>

            {/* 24/7 Toggle */}
            <button
              onClick={() => setOpen24Only(!open24Only)}
              className={`rounded-xl px-3.5 py-2 font-bold transition-colors whitespace-nowrap shadow-xs ${
                open24Only
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              Open 24/7
            </button>

            {/* View Mode Toggle */}
            <div className="ml-auto flex items-center rounded-xl border border-border bg-background p-1 shadow-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`rounded-lg p-1.5 ${viewMode === 'split' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                title="Split View"
              >
                <Layers size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-1.5 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                title="List Only"
              >
                <List size={14} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`rounded-lg p-1.5 ${viewMode === 'map' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                title="Map Only"
              >
                <MapIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-foreground px-5 py-3 text-xs font-bold text-background shadow-xl flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary" /> Direct station link copied to clipboard!
        </div>
      )}

      {/* Main App Workspace */}
      <section className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Column: Stations List */}
        <div
          className={`w-full lg:w-[440px] xl:w-[480px] shrink-0 border-r border-border flex flex-col h-[calc(100vh-140px)] overflow-y-auto p-4 space-y-3 bg-muted/10 ${
            viewMode === 'map' ? 'hidden lg:flex' : viewMode === 'split' ? 'order-2 lg:order-1 flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground font-semibold">
            <span>
              Found <strong>{filteredStations.length}</strong> verified 0% ethanol stations
            </span>
            <span>{userLocation ? 'GPS Proximity' : 'Community Rating'}</span>
          </div>

          {filteredStations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center my-6">
              <Fuel size={32} className="mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-3 text-base font-bold text-foreground">No stations matched your filters</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Try clearing your filters or selecting "All Cities" to view pan-India verified pumps.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCity('All Cities')
                  setSelectedBrand('All Brands')
                  setSelectedFuelGrade('All Grades')
                  setCocoOnly(false)
                  setOpen24Only(false)
                }}
                className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredStations.map((stn) => {
              const isSelected = stn.id === activeStation?.id
              return (
                <div
                  key={stn.id}
                  onClick={() => {
                    setActiveStationId(stn.id)
                    // On mobile, if in list mode, smooth transition to show active
                  }}
                  className={`group cursor-pointer rounded-2xl border p-4 transition-all duration-200 shadow-xs ${
                    isSelected
                      ? 'border-primary bg-primary/[0.04] ring-2 ring-primary/20 shadow-md'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5 min-w-0">
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-black text-primary">
                          <ShieldCheck size={13} /> {stn.fuelGrade}
                        </span>
                        {stn.isCOCO && (
                          <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                            COCO Flagship
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug break-words">
                        {stn.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1 min-w-0">
                        <MapPin size={13} className="text-primary shrink-0" />
                        <span className="truncate block flex-1">{stn.address}</span>
                      </p>
                    </div>

                    {/* Distance or Price Badge */}
                    <div className="text-right shrink-0">
                      {userLocation && (
                        <span className="block text-xs font-black text-primary">
                          {stn.computedDistance} km
                        </span>
                      )}
                      <span className="block text-xs font-bold text-foreground mt-0.5">
                        ₹{stn.price.toFixed(1)}/L
                      </span>
                    </div>
                  </div>

                  {/* Telemetry & Timing Bar */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5 border-t border-border pt-2.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium truncate">
                      <Clock size={12} className="shrink-0" /> {stn.lastVerified}
                    </span>
                    <span className="font-mono font-semibold text-foreground/80 truncate">
                      {stn.density}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold shrink-0">
                      <Star size={12} className="fill-amber-500 text-amber-500" /> {stn.rating}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Right Column: Live Map & Full Station Details Sheet */}
        <div
          className={`flex-1 flex flex-col h-[calc(100vh-140px)] overflow-y-auto p-3 sm:p-6 bg-background space-y-4 sm:space-y-6 ${
            viewMode === 'list' ? 'hidden lg:flex' : viewMode === 'split' ? 'order-1 lg:order-2 flex' : 'flex'
          }`}
        >
          {/* Interactive Map Canvas */}
          <div className="h-[340px] sm:h-[380px] lg:h-[420px] w-full shrink-0">
            <DynamicLeafletMap
              stations={filteredStations}
              activeStation={activeStation}
              onSelectStation={(id) => setActiveStationId(id)}
              userLocation={userLocation}
            />
          </div>

            {/* Selected Station Full Details Sheet */}
            {activeStation && (
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                {/* Station Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-black text-primary flex items-center gap-1">
                        <ShieldCheck size={14} /> {activeStation.fuelGrade}
                      </span>
                      {activeStation.isCOCO && (
                        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600">
                          COCO Flagship
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        Verified {activeStation.lastVerified}
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl sm:text-3xl font-black text-foreground">
                      {activeStation.name}
                    </h2>
                    <p className="mt-1.5 text-sm text-muted-foreground flex items-center gap-1.5">
                      <MapPin size={16} className="text-primary shrink-0" />
                      {activeStation.address}
                    </p>
                  </div>

                  {/* Price & Rating Display */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 p-4 sm:p-0 bg-muted/30 sm:bg-transparent rounded-2xl">
                    <div className="text-left sm:text-right">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Live Fuel Price
                      </span>
                      <strong className="block text-2xl font-black text-foreground">
                        ₹{activeStation.price.toFixed(2)}/L
                      </strong>
                    </div>
                    <div className="flex items-center gap-1 text-amber-600 font-bold text-sm">
                      <Star size={16} className="fill-amber-500 text-amber-500" /> {activeStation.rating}
                      <span className="text-xs text-muted-foreground">({activeStation.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Key Telemetry Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Form-8 Density
                    </span>
                    <strong className="block text-sm sm:text-base font-black text-foreground mt-1">
                      {activeStation.density}
                    </strong>
                    <span className="block text-[10px] text-green-600 font-semibold mt-0.5">
                      IS 2796 Reference Match
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Operating Hours
                    </span>
                    <strong className="block text-sm sm:text-base font-black text-foreground mt-1">
                      {activeStation.timing}
                    </strong>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      {activeStation.isOpen24Hours ? 'Open 24/7' : 'Standard Shifts'}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Verification Method
                    </span>
                    <strong className="block text-xs sm:text-sm font-bold text-foreground mt-1 line-clamp-1">
                      {activeStation.verifiedBy}
                    </strong>
                    <span className="block text-[10px] text-primary font-semibold mt-0.5">
                      Active Fuel Stock
                    </span>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Station Contact
                    </span>
                    <strong className="block text-xs sm:text-sm font-bold text-foreground mt-1">
                      {activeStation.phone || 'Available in App'}
                    </strong>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">
                      Pump Forecourt Desk
                    </span>
                  </div>
                </div>

                {/* Forecourt Amenities List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Forecourt Facilities & Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeStation.amenities.map((am) => (
                      <span
                        key={am}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs"
                      >
                        <CheckCircle2 size={13} className="text-primary" /> {am}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${activeStation.latitude},${activeStation.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02] hover:bg-primary/90"
                  >
                    <Navigation size={18} /> Open GPS Navigation
                  </a>

                  {activeStation.phone && (
                    <a
                      href={`tel:${activeStation.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-bold text-foreground hover:bg-muted transition-colors shadow-xs"
                    >
                      <Phone size={16} /> Call Pump
                    </a>
                  )}

                  <button
                    onClick={() => handleShare(activeStation)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-sm font-bold text-foreground hover:bg-muted transition-colors shadow-xs"
                    title="Share Station"
                  >
                    <Share2 size={16} /> Share
                  </button>

                  <button
                    onClick={() => {
                      setReportStationName(activeStation.name)
                      setReportCity(activeStation.city)
                      setReportModalOpen(true)
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-5 py-3.5 text-sm font-bold text-primary hover:bg-primary/20 transition-colors shadow-xs"
                  >
                    <Plus size={16} /> Submit Audit Log
                  </button>
                </div>
              </div>
            )}
          </div>
      </section>

      {/* Community Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-foreground">Submit Fuel Station Report</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Help fellow motorists verify 0% ethanol petrol pumps in your city.
                </p>
              </div>
              <button
                onClick={() => setReportModalOpen(false)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {reportSuccess ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-primary" />
                <h4 className="text-base font-bold text-foreground">Report Submitted Successfully!</h4>
                <p className="text-xs text-muted-foreground">
                  Thank you for contributing to India's pure fuel driver network.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-foreground mb-1">Station Name & Location</label>
                  <input
                    type="text"
                    required
                    value={reportStationName}
                    onChange={(e) => setReportStationName(e.target.value)}
                    placeholder="e.g. IndianOil COCO Koramangala, 80 Feet Road"
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-foreground mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={reportCity}
                      onChange={(e) => setReportCity(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-foreground mb-1">Fuel Grade</label>
                    <select
                      value={reportFuelGrade}
                      onChange={(e) => setReportFuelGrade(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="XP100 (0% Ethanol)">IndianOil XP100</option>
                      <option value="poWer100 (0% Ethanol)">HPCL poWer100</option>
                      <option value="Speed 97 (0% Ethanol)">BPCL Speed 97</option>
                      <option value="Verified E0 Batch">Verified E0 Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">
                    Observed Form-8 Density (kg/m³ @ 15°C)
                  </label>
                  <input
                    type="text"
                    value={reportDensity}
                    onChange={(e) => setReportDensity(e.target.value)}
                    placeholder="e.g. 734.8"
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Verification Notes / Receipt Ref</label>
                  <textarea
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Fuel dispensed smoothly, verified with hydrometer test, 24/7 active stock."
                    rows={3}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                {reportError && (
                  <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs font-semibold text-destructive">
                    {reportError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingReport}
                  className="w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-[1.01] shadow-md text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isSubmittingReport ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting to E0 Finder...</>
                  ) : (
                    <><Send size={16} /> Submit Community Report</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===== SEO Content: FAQ + City Links + Footer ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(findFaqSchema) }}
      />

      {/* FAQ */}
      <section className="border-t border-border bg-muted/20 px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answers</p>
          <h2 className="e0-fade-up mt-2 text-2xl font-black sm:text-3xl">
            How to Find Ethanol-Free (E0) Petrol Near You
          </h2>
          <div className="mt-6 space-y-3">
            {findFaqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-foreground [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown size={18} className="e0-faq-caret shrink-0 text-primary" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* City links — internal linking for local SEO */}
      <section className="border-t border-border px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">By Location</p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">0% Ethanol Petrol Pumps by City</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Browse verified XP100, poWer100 and Speed 97 stations city by city across India.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {citiesData.map((c) => (
              <Link
                key={c.slug}
                href={`/city/${c.slug}`}
                className="group flex items-center justify-between gap-2 rounded-2xl border border-border bg-card p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-bold transition-colors group-hover:text-primary">{c.name}</strong>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{c.verifiedPumpsCount}+ verified pumps</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary px-4 pt-8 pb-24 text-primary-foreground lg:px-8 lg:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span className="text-primary-foreground/85">© 2026 E0 Finder — Ethanol-Free Petrol Locator for India.</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-primary-foreground/85">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/blog" className="hover:underline">Blog &amp; Guides</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>

      {/* Mobile Floating View Mode Switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex lg:hidden items-center rounded-full bg-slate-900/95 backdrop-blur p-1.5 shadow-2xl border border-slate-700/80">
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-slate-300 hover:text-white'
          }`}
        >
          <List size={14} /> List ({filteredStations.length})
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
            viewMode === 'map' ? 'bg-primary text-white shadow-md' : 'text-slate-300 hover:text-white'
          }`}
        >
          <MapIcon size={14} /> Map View
        </button>
      </div>
    </main>
  )
}
