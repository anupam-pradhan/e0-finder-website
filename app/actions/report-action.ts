'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createAdminClient } from '@/lib/supabase'

export interface SubmitReportInput {
  stationName: string
  city: string
  fuelGrade: string
  density?: string
  notes?: string
  latitude?: number | null
  longitude?: number | null
}

export interface SubmitReportResult {
  success: boolean
  message: string
  id?: string
}

/**
 * Production-ready Server Action for submitting community station reports.
 * Validates, sanitizes, writes to Supabase, and revalidates cached station tags.
 */
export async function submitCommunityReportAction(
  data: SubmitReportInput
): Promise<SubmitReportResult> {
  const stationName = data.stationName?.trim()
  const city = data.city?.trim()
  const fuelGrade = data.fuelGrade?.trim()
  const density = data.density?.trim() || ''
  const notes = data.notes?.trim() || ''

  if (!stationName || stationName.length < 3) {
    return { success: false, message: 'Please provide a valid station name (at least 3 characters).' }
  }

  if (!city) {
    return { success: false, message: 'Please specify the city.' }
  }

  try {
    const supabase = createAdminClient()

    const { data: inserted, error } = await supabase
      .from('community_reports')
      .insert({
        station_name: stationName,
        city: city,
        fuel_grade: fuelGrade || 'XP100 (0% Ethanol)',
        density: density ? `${density} kg/m³ @ 15°C` : '735.0 kg/m³ @ 15°C',
        notes: notes,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        is_verified: false,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[submitCommunityReportAction] Supabase error:', error.message)
      return { success: false, message: 'Database error. Please try again later.' }
    }

    // Invalidate station cache so fresh data shows up
    try {
      revalidateTag('stations', 'max')
      revalidatePath('/find')
    } catch (_) {}

    return {
      success: true,
      message: 'Report submitted successfully. Our team will verify and list it!',
      id: inserted?.id,
    }
  } catch (err: any) {
    console.error('[submitCommunityReportAction] Unexpected error:', err)
    return { success: false, message: 'An unexpected error occurred. Please try again.' }
  }
}
