import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('URL:', supabaseUrl ? 'Found' : 'Missing')
console.log('Key:', supabaseKey ? 'Found' : 'Missing')

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data, error, count } = await supabase
    .from('stations')
    .select('id, name, city, is_active', { count: 'exact' })
    .limit(10)

  console.log('Count:', count)
  console.log('Error:', error)
  console.log('Sample rows:', data)
}

run()
