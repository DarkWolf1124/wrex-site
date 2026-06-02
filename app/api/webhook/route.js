import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminClient } from '@/lib/supabase';
import bcrypt from 'bcryptjs';


export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const m = session.metadata;

    try {
      const supabase = getAdminClient();
      const passwordHash = await bcrypt.hash(m.password, 12);

      // Calculate renewal date (1 year from now)
      const renewal = new Date();
      renewal.setFullYear(renewal.getFullYear() + 1);

      const { error } = await supabase.from('partners').insert({
        company_name:   m.company_name,
        owner_name:     m.owner_name,
        email:          m.email,
        password_hash:  passwordHash,
        phone:          m.phone,
        address:        m.address,
        city:           m.city,
        state:          m.state,
        zip:            m.zip,
        hours:          m.hours,
        is24_7:         m.is24_7 === 'true',
        tagline:        m.tagline,
        is_active:      true,
        eta_minutes:    20,
        rating:         0,
        review_count:   0,
        lat:            null,
        lng:            null,
        stripe_session_id: session.id,
        renewal_date:   renewal.toISOString(),
      });

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json({ error: 'DB insert failed' }, { status: 500 });
      }

      console.log(`✓ New partner created: ${m.company_name}`);
    } catch (err) {
      console.error('Webhook handler error:', err);
      return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
