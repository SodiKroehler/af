import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseServiceRoleKey, getSupabaseUrlForServer } from '@lib/supabaseEnv'

export async function GET() {
    const url = getSupabaseUrlForServer()
    const serviceKey = getSupabaseServiceRoleKey()
    if (!url || !serviceKey) {
        console.error(
            'todays_bookings: set NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL / SUPABASE_v2_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_v2_SUPABASE_SERVICE_ROLE_KEY)',
        )
        return NextResponse.json({ error: 'Database not configured', count: null }, { status: 503 })
    }
    const supabase = createClient(url, serviceKey)

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString());


    if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: 'Failed to query bookings' }, { status: 500 });
    }

    return NextResponse.json({ count }, { status: 200 });
}