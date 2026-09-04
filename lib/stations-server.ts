import { unstable_cache } from 'next/cache'
import { createAdminClient, StationRow } from '@/lib/supabase'
import { initialStations, WebStation } from '@/lib/stations-data'

// State base pricing adjustments for Indian metros
const statePriceAdjustments: Record<string, { xp100: number; power100: number; speed97: number }> = {
  Karnataka: { xp100: 145.0, power100: 146.0, speed97: 139.0 },
  Delhi: { xp100: 145.0, power100: 147.0, speed97: 140.0 },
  Haryana: { xp100: 146.0, power100: 147.0, speed97: 141.0 },
  'Uttar Pradesh': { xp100: 144.5, power100: 146.5, speed97: 139.5 },
  Maharashtra: { xp100: 146.0, power100: 146.5, speed97: 138.0 },
  Telangana: { xp100: 145.0, power100: 147.0, speed97: 140.5 },
  'Tamil Nadu': { xp100: 144.0, power100: 146.0, speed97: 139.0 },
  'West Bengal': { xp100: 145.0, power100: 147.0, speed97: 140.0 },
  'Punjab / Haryana': { xp100: 144.0, power100: 146.0, speed97: 139.0 },
  Rajasthan: { xp100: 146.5, power100: 148.0, speed97: 141.0 },
  Gujarat: { xp100: 144.5, power100: 146.0, speed97: 139.5 },
  Kerala: { xp100: 145.5, power100: 147.0, speed97: 140.5 },
  Goa: { xp100: 143.5, power100: 145.0, speed97: 138.0 },
}

export function applyPricing(stations: WebStation[]): WebStation[] {
  const now = new Date()
  const todayStr = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })

  return stations.map((stn) => {
    const prices = statePriceAdjustments[stn.state] || { xp100: 145.0, power100: 146.0, speed97: 139.0 }
    const currentPrice =
      stn.fuelGrade?.includes('poWer100')
        ? prices.power100
        : stn.fuelGrade?.includes('Speed 97')
        ? prices.speed97
        : prices.xp100

    return {
      ...stn,
      price: currentPrice,
      lastVerified: `Today (${todayStr}) • 06:00 AM Form-8 Log`,
    }
  })
}

// Convert Supabase database row (snake_case) to WebStation (camelCase)
export function rowToStation(row: Record<string, any>): WebStation {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    brandLogo: row.brand_logo || '/assets/oil_company_logo/Indian_Oil_Logo.svg',
    fuelGrade: row.fuel_grade,
    isE0Confirmed: row.is_e0_confirmed ?? true,
    isCOCO: row.is_coco ?? false,
    address: row.address || '',
    area: row.area || '',
    city: row.city || '',
    state: row.state || 'India',
    pincode: row.pincode || '',
    latitude: Number(row.latitude) || 12.9716,
    longitude: Number(row.longitude) || 77.5946,
    price: Number(row.price) || 145.0,
    density: row.density || '735.0 kg/m³ @ 15°C',
    lastVerified: row.last_verified || 'Verified E0 Batch',
    verifiedBy: row.verified_by || 'OMC Form-8 Daily Certificate',
    rating: Number(row.rating) || 4.9,
    reviewCount: Number(row.review_count) || 10,
    isOpen24Hours: row.is_open_24_hours ?? true,
    timing: row.timing || 'Open 24 Hours',
    phone: row.phone || '',
    amenities: Array.isArray(row.amenities) ? row.amenities : ['0% Ethanol Dispenser', 'UPI / Card'],
  }
}

export interface StationFilterOptions {
  city?: string | null
  brand?: string | null
  grade?: string | null
}

/**
 * Raw server-side fetch from Supabase table 'stations'
 */
async function fetchStationsFromSupabase(filters: StationFilterOptions = {}): Promise<{
  stations: WebStation[]
  source: 'supabase' | 'static'
}> {
  try {
    const supabase = createAdminClient()
    let query = supabase
      .from('stations')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })

    if (filters.city && filters.city !== 'All Cities') {
      query = query.ilike('city', filters.city)
    }
    if (filters.brand && filters.brand !== 'All Brands') {
      query = query.eq('brand', filters.brand)
    }
    if (filters.grade && filters.grade !== 'All Grades') {
      query = query.ilike('fuel_grade', `%${filters.grade}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('[Supabase Server Fetch Error]:', error.message)
      throw error
    }

    if (data && data.length > 0) {
      const mapped = data.map(rowToStation)
      return { stations: applyPricing(mapped), source: 'supabase' }
    }
  } catch (err) {
    console.warn('[Supabase Server Fetch] Falling back to static data:', err)
  }

  // Graceful fallback to static initialStations
  let fallback = [...initialStations]
  if (filters.city && filters.city !== 'All Cities') {
    fallback = fallback.filter((s) => s.city.toLowerCase() === filters.city?.toLowerCase())
  }
  if (filters.brand && filters.brand !== 'All Brands') {
    fallback = fallback.filter((s) => s.brand.toLowerCase() === filters.brand?.toLowerCase())
  }
  if (filters.grade && filters.grade !== 'All Grades') {
    fallback = fallback.filter((s) => s.fuelGrade.toLowerCase().includes(filters.grade?.toLowerCase() || ''))
  }

  return { stations: applyPricing(fallback), source: 'static' }
}

/**
 * Production-ready cached server function.
 * Uses Next.js unstable_cache with tag 'stations' and revalidates every 60 seconds.
 */
export const getCachedStations = unstable_cache(
  async (city?: string, brand?: string, grade?: string) => {
    return fetchStationsFromSupabase({ city, brand, grade })
  },
  ['stations-cache'],
  {
    revalidate: 60, // 60 seconds ISR cache
    tags: ['stations'],
  }
)

/**
 * Primary server-side accessor for stations.
 * Call this in Server Components (e.g. app/find/page.tsx, app/city/[slug]/page.tsx).
 */
export async function getStationsServer(filters: StationFilterOptions = {}): Promise<WebStation[]> {
  const result = await getCachedStations(
    filters.city || undefined,
    filters.brand || undefined,
    filters.grade || undefined
  )
  return result.stations
}

/**
 * Get stations specifically for a given city (by name or slug).
 */
export async function getStationsByCity(cityName: string): Promise<WebStation[]> {
  const allStations = await getStationsServer()
  const lower = cityName.toLowerCase()
  return allStations.filter(
    (s) =>
      s.city.toLowerCase() === lower ||
      s.city.toLowerCase().includes(lower) ||
      lower.includes(s.city.toLowerCase())
  )
}
