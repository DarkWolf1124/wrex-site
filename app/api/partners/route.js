import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('partners')
      .select('id,company_name,phone,lat,lng,rating,review_count,is24_7,hours,eta_minutes,tagline,is_active')
      .eq('is_active', true)
      .not('lat', 'is', null)
      .not('lng', 'is', null);

    if (error) throw error;
    return NextResponse.json({ partners: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
