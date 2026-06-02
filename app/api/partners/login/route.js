import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });

    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !data) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    if (!data.is_active) return NextResponse.json({ error: 'Your account is not yet active. Contact hello@wrexapp.me.' }, { status: 403 });

    const match = await bcrypt.compare(password, data.password_hash);
    if (!match) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

    const token = signToken({ id: data.id, email: data.email, role: 'partner' });
    const { password_hash, ...partnerSafe } = data;
    return NextResponse.json({ token, partner: partnerSafe });
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
