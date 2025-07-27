import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be the *secret* service role key
);

export async function GET() {
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