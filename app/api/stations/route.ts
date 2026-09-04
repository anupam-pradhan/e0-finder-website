import { NextResponse } from 'next/server'
import { getCachedStations } from '@/lib/stations-server'

// Enable dynamic runtime with ISR headers
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city') || undefined
  const brand = searchParams.get('brand') || undefined
  const grade = searchParams.get('grade') || undefined

  const now = new Date()
  const todayStr = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })

  try {
    const { stations, source } = await getCachedStations(city, brand, grade)

    return NextResponse.json(
      {
        status: 'success',
        source,
        lastSyncAt: now.toISOString(),
        omcRevisionDate: todayStr,
        omcRevisionTime: '06:00 AM IST',
        totalStations: stations.length,
        stations,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (err: any) {
    console.error('[/api/stations error]:', err)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to retrieve stations dataset.',
        stations: [],
      },
      { status: 500 }
    )
  }
}
