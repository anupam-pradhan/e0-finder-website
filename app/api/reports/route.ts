import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { stationName, city, fuelGrade, density, notes, latitude, longitude } = body

    if (!stationName || !city) {
      return NextResponse.json(
        { status: 'error', message: 'Station name and city are required.' },
        { status: 400 }
      )
    }

    // Get submitter IP for basic rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const submitterIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('community_reports')
      .insert({
        station_name: stationName,
        city,
        fuel_grade: fuelGrade || 'XP100 (0% Ethanol)',
        density: density ? `${density} kg/m³ @ 15°C` : '',
        notes: notes || '',
        latitude: latitude || null,
        longitude: longitude || null,
        submitter_ip: submitterIp,
        is_verified: false,
      })
      .select('id, created_at')
      .single()

    if (error) {
      console.error('[community_reports insert error]', error.message)
      return NextResponse.json(
        { status: 'error', message: 'Failed to save report. Please try again.' },
        { status: 500 }
      )
    }

    try {
      const { revalidateTag, revalidatePath } = await import('next/cache')
      revalidateTag('stations', 'max')
      revalidatePath('/find')
    } catch (_) {}

    return NextResponse.json({
      status: 'success',
      message: 'Report submitted successfully. Thank you for contributing!',
      reportId: data?.id,
      submittedAt: data?.created_at,
    })
  } catch (err) {
    console.error('[POST /api/reports error]', err)
    return NextResponse.json(
      { status: 'error', message: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}

// Admin-only: get all reports (requires service role key in Authorization header)
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!authHeader || authHeader !== `Bearer ${serviceKey}`) {
    return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('community_reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }

  return NextResponse.json({ status: 'success', total: data?.length ?? 0, reports: data })
}
