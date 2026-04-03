import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    console.error(
      'todays_bookings: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY',
    )
    return NextResponse.json({ error: 'Database not configured', count: null }, { status: 503 })
  }
  const supabase = createClient(url, serviceKey)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Failed to query bookings' }, { status: 500 })
  }

  return NextResponse.json({ count }, { status: 200 })
}
