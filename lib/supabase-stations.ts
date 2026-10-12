import { WebStation } from '@/lib/stations-data'

/**
 * Read-only access to the live E0 Finder catalogue in Supabase (52,000+ pumps).
 * Uses the publishable key, which RLS limits to SELECT on public tables.
 */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://rwgikpgkmmzpbzwvuiix.supabase.co'
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

const STATION_COLUMNS =
  'id,name,brand,brand_logo,fuel_grade,is_e0_confirmed,is_coco,address,area,city,state,pincode,latitude,longitude,price,density,last_verified,verified_by,rating,review_count,is_open_24_hours,timing,phone,amenities,source,needs_review,updated_at'

export type StationConfidence = 'official' | 'community' | 'listed' | 'unverified'

export interface LiveStation extends WebStation {
  source: string
  confidence: StationConfidence
  confidenceLabel: string
  updatedAt: string
  distanceKm?: number
}

export interface StationQuery {
  q?: string
  lat?: number
  lng?: number
  radiusKm?: number
  city?: string
  brand?: string
  grade?: string
  e0Only?: boolean
  limit?: number
}

export interface NetworkStats {
  total: number
  e0Confirmed: number
  xp100: number
  power100: number
}

export interface CityStats extends NetworkStats {
  premium: number
}

const DAY_SECONDS = 86_400
const DEFAULT_LIMIT = 60
const MAX_LIMIT = 200

function headers(extra: Record<string, string> = {}): Record<string, string> {
  return { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, ...extra }
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function num(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number(value) || 0
  return 0
}

/** Mirrors the app's confidence model so web and app say the same thing. */
export function confidenceFor(row: { source?: string | null; needs_review?: boolean | null; verified_by?: string | null }): StationConfidence {
  const source = (row.source ?? '').toLowerCase()
  if (['iocl', 'hpcl', 'bpcl', 'official'].includes(source)) return 'official'
  if (source === 'community' || (row.verified_by ?? '').toLowerCase().includes('community')) return 'community'
  if (source === 'curated') return 'listed'
  if (source === 'osm' || row.needs_review) return 'unverified'
  return 'listed'
}

export const confidenceLabels: Record<StationConfidence, string> = {
  official: 'Oil company data',
  community: 'Community verified',
  listed: 'Listed on Google Maps',
  unverified: 'Unverified listing',
}

function formatVerified(row: Record<string, unknown>): string {
  const raw = text(row.last_verified)
  const iso = Date.parse(raw) ? raw : text(row.updated_at)
  const date = iso ? new Date(iso) : null
  if (date && !Number.isNaN(date.getTime())) {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
  }
  return raw || 'Not yet verified'
}

export function toLiveStation(row: Record<string, unknown>): LiveStation {
  const confidence = confidenceFor(row as { source?: string; needs_review?: boolean; verified_by?: string })
  const amenities = Array.isArray(row.amenities) ? row.amenities.filter((a): a is string => typeof a === 'string') : []
  const brand = (text(row.brand) || 'Other') as WebStation['brand']
  const fuelGrade = (text(row.fuel_grade) || 'Regular Petrol (E20)') as WebStation['fuelGrade']
  return {
    id: text(row.id),
    name: text(row.name) || brand,
    brand,
    brandLogo: text(row.brand_logo),
    fuelGrade,
    isE0Confirmed: row.is_e0_confirmed === true,
    isCOCO: row.is_coco === true,
    address: text(row.address) || [text(row.area), text(row.city), text(row.state)].filter(Boolean).join(', '),
    area: text(row.area),
    city: text(row.city),
    state: text(row.state),
    pincode: text(row.pincode),
    latitude: num(row.latitude),
    longitude: num(row.longitude),
    price: num(row.price),
    density: text(row.density),
    lastVerified: formatVerified(row),
    verifiedBy: text(row.verified_by) || confidenceLabels[confidence],
    rating: num(row.rating),
    reviewCount: num(row.review_count),
    isOpen24Hours: row.is_open_24_hours === true,
    timing: text(row.timing),
    phone: text(row.phone),
    amenities,
    source: text(row.source) || 'google_crawl',
    confidence,
    confidenceLabel: confidenceLabels[confidence],
    updatedAt: text(row.updated_at),
    distanceKm: typeof row.distance_m === 'number' ? Math.round(row.distance_m / 100) / 10 : undefined,
  }
}

async function rpc(name: string, body: Record<string, unknown>, revalidate = 300): Promise<Record<string, unknown>[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
    next: { revalidate },
  })
  if (!res.ok) throw new Error(`Supabase rpc ${name} failed: ${res.status}`)
  return (await res.json()) as Record<string, unknown>[]
}

function clampLimit(limit?: number): number {
  return Math.min(Math.max(limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT)
}

function applyFilters(rows: LiveStation[], query: StationQuery): LiveStation[] {
  const brand = query.brand?.toLowerCase()
  const grade = query.grade?.toLowerCase()
  return rows.filter((s) => {
    if (query.e0Only && !s.isE0Confirmed) return false
    if (brand && !s.brand.toLowerCase().includes(brand)) return false
    if (grade && !s.fuelGrade.toLowerCase().includes(grade)) return false
    return true
  })
}

function rankE0First(rows: LiveStation[]): LiveStation[] {
  const score = (s: LiveStation) => (s.isE0Confirmed ? 3 : 0) + (/xp100|power100|speed 97/i.test(s.fuelGrade) ? 2 : 0) + (s.isCOCO ? 1 : 0)
  return [...rows].sort((a, b) => score(b) - score(a) || (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
}

/** Search the live catalogue by text, GPS or city. Returns E0/premium pumps first. */
export async function fetchStations(query: StationQuery): Promise<LiveStation[]> {
  const limit = clampLimit(query.limit)
  const fetchLimit = Math.min(limit * 3, MAX_LIMIT * 2)
  let rows: Record<string, unknown>[]

  if (query.q && query.q.trim().length >= 2) {
    rows = await rpc('stations_search', { q: query.q.trim(), lat: query.lat ?? null, lng: query.lng ?? null, max_results: fetchLimit })
  } else if (typeof query.lat === 'number' && typeof query.lng === 'number') {
    rows = await rpc('stations_nearby', {
      lat: query.lat,
      lng: query.lng,
      radius_m: Math.round((query.radiusKm ?? 25) * 1000),
      max_results: fetchLimit,
    })
  } else {
    const params = new URLSearchParams({ select: STATION_COLUMNS, is_active: 'eq.true', limit: String(fetchLimit) })
    params.set('order', 'is_e0_confirmed.desc,rating.desc.nullslast')
    if (query.city) params.set('city', `ilike.*${query.city.replace(/[%*,()]/g, '')}*`)
    if (query.e0Only) params.set('is_e0_confirmed', 'eq.true')
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stations?${params}`, { headers: headers(), next: { revalidate: 300 } })
    if (!res.ok) throw new Error(`Supabase stations query failed: ${res.status}`)
    rows = (await res.json()) as Record<string, unknown>[]
  }

  return rankE0First(applyFilters(rows.map(toLiveStation), query)).slice(0, limit)
}

async function count(filters: Record<string, string>): Promise<number> {
  const params = new URLSearchParams({ select: 'id', is_active: 'eq.true', ...filters })
  const res = await fetch(`${SUPABASE_URL}/rest/v1/stations?${params}`, {
    method: 'HEAD',
    headers: headers({ Prefer: 'count=exact', 'Range-Unit': 'items', Range: '0-0' }),
    next: { revalidate: DAY_SECONDS },
  })
  const range = res.headers.get('content-range') ?? ''
  const total = Number(range.split('/')[1])
  return Number.isFinite(total) ? total : 0
}

/** Whole-India totals, refreshed daily. */
export async function fetchNetworkStats(): Promise<NetworkStats | null> {
  try {
    const [total, e0Confirmed, xp100, power100] = await Promise.all([
      count({}),
      count({ is_e0_confirmed: 'eq.true' }),
      count({ fuel_grade: 'ilike.*xp100*' }),
      count({ fuel_grade: 'ilike.*power100*' }),
    ])
    return total > 0 ? { total, e0Confirmed, xp100, power100 } : null
  } catch {
    return null
  }
}

function cityFilter(names: string[]): string {
  const clean = names.map((n) => n.replace(/[%*,()]/g, '').trim()).filter(Boolean)
  return `(${clean.map((n) => `city.ilike.*${n}*`).join(',')})`
}

/** Per-city totals. Pass every spelling the catalogue may use (e.g. Bengaluru + Bangalore). */
export async function fetchCityStats(names: string[]): Promise<CityStats | null> {
  try {
    const or = cityFilter(names)
    const [total, e0Confirmed, xp100, power100] = await Promise.all([
      count({ or }),
      count({ or, is_e0_confirmed: 'eq.true' }),
      count({ or, fuel_grade: 'ilike.*xp100*' }),
      count({ or, fuel_grade: 'ilike.*power100*' }),
    ])
    return total > 0 ? { total, e0Confirmed, xp100, power100, premium: xp100 + power100 } : null
  } catch {
    return null
  }
}

/** Best pumps to feature on a city page: confirmed E0 and premium grades first. */
export async function fetchCityHighlights(names: string[], limit = 9): Promise<LiveStation[]> {
  try {
    const params = new URLSearchParams({
      select: STATION_COLUMNS,
      is_active: 'eq.true',
      or: cityFilter(names),
      order: 'is_e0_confirmed.desc,is_coco.desc,rating.desc.nullslast',
      limit: String(limit * 4),
    })
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stations?${params}`, { headers: headers(), next: { revalidate: DAY_SECONDS } })
    if (!res.ok) return []
    const rows = (await res.json()) as Record<string, unknown>[]
    return rankE0First(rows.map(toLiveStation)).slice(0, limit)
  } catch {
    return []
  }
}

/** Per-state totals (matches the catalogue's `state` column, e.g. "Delhi" also hits "Delhi (NCT)"). */
export async function fetchStateStats(names: string[]): Promise<CityStats | null> {
  try {
    const clean = names.map((n) => n.replace(/[%*,()]/g, '').trim()).filter(Boolean)
    const or = `(${clean.map((n) => `state.ilike.*${n}*`).join(',')})`
    const [total, e0Confirmed, xp100, power100] = await Promise.all([
      count({ or }),
      count({ or, is_e0_confirmed: 'eq.true' }),
      count({ or, fuel_grade: 'ilike.*xp100*' }),
      count({ or, fuel_grade: 'ilike.*power100*' }),
    ])
    return total > 0 ? { total, e0Confirmed, xp100, power100, premium: xp100 + power100 } : null
  } catch {
    return null
  }
}

/** Pumps-mapped totals keyed by state slug, for state lists. Missing states fall back to the caller's number. */
export async function fetchStateTotals(states: { slug: string; name: string }[]): Promise<Record<string, number>> {
  const entries = await Promise.all(
    states.map(async (st) => {
      const stats = await fetchStateStats([st.name])
      return [st.slug, stats?.total ?? 0] as const
    }),
  )
  return Object.fromEntries(entries.filter(([, n]) => n > 0))
}

// ---------------------------------------------------------------------------
// Featured pumps: every outlet that reports 0% ethanol or a premium grade.
// These are the only pumps that get their own indexable page.
// ---------------------------------------------------------------------------

const FEATURED_FILTER =
  '(is_e0_confirmed.eq.true,fuel_grade.ilike.*xp100*,fuel_grade.ilike.*power100*,fuel_grade.ilike.*speed 97*,fuel_grade.ilike.*speed 100*)'

export type FuelGradeKey = 'xp100' | 'power100' | 'speed-97' | 'ethanol-free'

export const fuelGradePages: Record<
  FuelGradeKey,
  { name: string; brand: string; title: string; h1: string; intro: string; matches: (s: LiveStation) => boolean }
> = {
  xp100: {
    name: 'XP100',
    brand: 'IndianOil',
    title: 'XP100 Petrol Pumps in India — Live List by State (Near Me)',
    h1: 'All XP100 petrol pumps in India',
    intro:
      'IndianOil XP100 is a 100-octane premium petrol that IndianOil sells without ethanol. This list shows every XP100 outlet in the E0 Finder catalogue, grouped by state, with directions and the date each listing was last verified.',
    matches: (s) => /xp100/i.test(s.fuelGrade),
  },
  power100: {
    name: 'poWer100',
    brand: 'HPCL',
    title: 'HPCL poWer100 Petrol Pumps in India — Live List by State (Near Me)',
    h1: 'All HPCL poWer100 petrol pumps in India',
    intro:
      'HPCL poWer100 is a 100-octane premium petrol. HPCL lists some outlets as 0% ethanol and others as low ethanol (up to 4.5%); each pump below shows which. Grouped by state with directions and last-verified dates.',
    matches: (s) => /power100/i.test(s.fuelGrade),
  },
  'speed-97': {
    name: 'Speed 97',
    brand: 'BPCL',
    title: 'BPCL Speed 97 Petrol Pumps in India — Live List by State (Near Me)',
    h1: 'All BPCL Speed 97 petrol pumps in India',
    intro:
      'BPCL Speed 97 is a 97-octane premium petrol reported as ethanol-free at the outlets listed here. Grouped by state with directions and last-verified dates.',
    matches: (s) => /speed ?97|speed ?100/i.test(s.fuelGrade),
  },
  'ethanol-free': {
    name: 'ethanol-free (E0)',
    brand: 'All brands',
    title: 'Ethanol-Free (E0) Petrol Pumps in India — Live List by State (Near Me)',
    h1: 'All petrol pumps reporting 0% ethanol (E0) petrol in India',
    intro:
      'Every pump in the E0 Finder catalogue that reports 0% ethanol petrol, across IndianOil, HPCL and BPCL. Grouped by state with directions and last-verified dates. Stock changes daily, so confirm at the pump.',
    matches: (s) => s.isE0Confirmed,
  },
}

/** All pumps that report E0 or a premium grade (currently a few dozen), refreshed daily. */
export async function fetchFeaturedPumps(): Promise<LiveStation[]> {
  try {
    const params = new URLSearchParams({
      select: STATION_COLUMNS,
      is_active: 'eq.true',
      or: FEATURED_FILTER,
      order: 'is_e0_confirmed.desc,state.asc,city.asc,name.asc',
      limit: '500',
    })
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stations?${params}`, { headers: headers(), next: { revalidate: DAY_SECONDS } })
    if (!res.ok) return []
    const rows = (await res.json()) as Record<string, unknown>[]
    return rows.map(toLiveStation).filter((s) => s.latitude && s.longitude)
  } catch {
    return []
  }
}

/** One pump by catalogue id. Returns null when missing or inactive. */
export async function fetchPumpById(id: string): Promise<LiveStation | null> {
  try {
    const params = new URLSearchParams({ select: STATION_COLUMNS, id: `eq.${id}`, is_active: 'eq.true', limit: '1' })
    const res = await fetch(`${SUPABASE_URL}/rest/v1/stations?${params}`, { headers: headers(), next: { revalidate: DAY_SECONDS } })
    if (!res.ok) return null
    const rows = (await res.json()) as Record<string, unknown>[]
    return rows.length ? toLiveStation(rows[0]) : null
  } catch {
    return null
  }
}

/** True when a pump qualifies for its own indexable page. */
export function isFeaturedPump(s: LiveStation): boolean {
  return s.isE0Confirmed || /xp100|power100|speed ?97|speed ?100/i.test(s.fuelGrade)
}

export function pumpPath(s: { id: string }): string {
  return `/pump/${encodeURIComponent(s.id)}`
}

export function directionsUrl(s: { latitude: number; longitude: number }): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${s.latitude},${s.longitude}`
}
