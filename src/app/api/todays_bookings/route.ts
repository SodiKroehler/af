import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { bookingFail, bookingVerbose } from '@lib/booking/diagnostics'

export async function GET() {
  const url = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
  const serviceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim())
  bookingVerbose('GET /api/todays_bookings env check', {
    hasNEXT_PUBLIC_SUPABASE_URL: url,
    hasSUPABASE_SERVICE_ROLE_KEY: serviceKey,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl?.trim() || !supabaseServiceKey?.trim()) {
    bookingFail('todays_bookings: missing env — set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on Vercel', {
      hasUrl: !!supabaseUrl?.trim(),
      hasServiceRole: !!supabaseServiceKey?.trim(),
    })
    return NextResponse.json(
      { error: 'Database not configured', code: 'ENV_MISSING', count: null },
      { status: 503 },
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  if (error) {
    bookingFail('todays_bookings: Supabase query failed', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    })
    return NextResponse.json(
      { error: 'Failed to query bookings', code: 'SUPABASE_ERROR', count: null, supabase: error.message },
      { status: 500 },
    )
  }

  bookingVerbose('todays_bookings: ok', { count })
  return NextResponse.json({ count }, { status: 200 })
}
