import { createClient } from '@supabase/supabase-js'

// Supports both NEXT_PUBLIC_ (browser) and server-side env variable names
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Public client — safe to use in browser and server components
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client — server-side only (API routes). Never expose to client.
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// ─── Type Definitions matching Supabase table columns ────────────────────────

export interface StationRow {
  id: string
  name: string
  brand: string
  brand_logo: string
  fuel_grade: string
  is_e0_confirmed: boolean
  is_coco: boolean
  address: string
  area: string
  city: string
  state: string
  pincode: string
  latitude: number
  longitude: number
  price: number
  density: string
  last_verified: string
  verified_by: string
  rating: number
  review_count: number
  is_open_24_hours: boolean
  timing: string
  phone: string
  amenities: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CommunityReportRow {
  id?: string
  station_name: string
  city: string
  fuel_grade: string
  density: string
  notes: string
  latitude?: number
  longitude?: number
  submitter_ip?: string
  is_verified: boolean
  created_at?: string
}
