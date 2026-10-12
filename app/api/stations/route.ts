import { NextResponse } from 'next/server'
import { fetchStations, type StationQuery } from '@/lib/supabase-stations'
import { initialStations } from '@/lib/stations-data'

export const dynamic = 'force-dynamic'

function numberParam(value: string | null): number | undefined {
  if (value === null || value === '') return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

/**
 * Live station search over the E0 Finder catalogue (52,000+ pumps in Supabase).
 * Query params: q, lat, lng, radiusKm, city, brand, grade, e0=1, limit.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const brand = searchParams.get('brand')
  const grade = searchParams.get('grade')

  const query: StationQuery = {
    q: searchParams.get('q') ?? undefined,
    lat: numberParam(searchParams.get('lat')),
    lng: numberParam(searchParams.get('lng')),
    radiusKm: numberParam(searchParams.get('radiusKm')),
    city: city && city !== 'All Cities' ? city : undefined,
    brand: brand && brand !== 'All Brands' ? brand : undefined,
    grade: grade && grade !== 'All Grades' ? grade : undefined,
    e0Only: searchParams.get('e0') === '1',
    limit: numberParam(searchParams.get('limit')),
  }

  const now = new Date()
  try {
    const stations = await fetchStations(query)
    return NextResponse.json(
      { status: 'success', source: 'supabase', lastSyncAt: now.toISOString(), totalStations: stations.length, stations },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } },
    )
  } catch (error) {
    console.error('[api/stations] live catalogue unavailable, serving curated fallback', error)
    const fallback = initialStations.filter((s) => !query.city || s.city.toLowerCase() === query.city.toLowerCase())
    return NextResponse.json(
      { status: 'degraded', source: 'curated', lastSyncAt: now.toISOString(), totalStations: fallback.length, stations: fallback },
      { status: 200, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
