import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(req) {
  const token = getTokenFromRequest(req);
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getAdminClient();
  const { data, error } = await supabase.from('partners').select('*').eq('id', payload.id).single();
  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { password_hash, ...safe } = data;
  return NextResponse.json({ partner: safe });
}
