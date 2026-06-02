import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PUT(req) {
  const token = getTokenFromRequest(req);
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const supabase = getAdminClient();

  const updates = {
    company_name: body.company_name,
    owner_name:   body.owner_name,
    email:        body.email,
    phone:        body.phone,
    address:      body.address,
    city:         body.city,
    state:        body.state,
    zip:          body.zip,
    hours:        body.hours,
    is24_7:       body.is24_7,
    tagline:      body.tagline,
    eta_minutes:  body.eta_minutes,
    lat:          body.lat || null,
    lng:          body.lng || null,
    updated_at:   new Date().toISOString(),
  };

  // Update password only if provided
  if (body.new_password && body.new_password.length >= 8) {
    updates.password_hash = await bcrypt.hash(body.new_password, 12);
  }

  const { data, error } = await supabase.from('partners').update(updates).eq('id', payload.id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { password_hash, ...safe } = data;
  return NextResponse.json({ partner: safe });
}
