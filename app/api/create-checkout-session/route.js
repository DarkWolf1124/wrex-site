import { NextResponse } from 'next/server';
import { stripe, ANNUAL_PRICE_CENTS } from '@/lib/stripe';

export async function POST(req) {
  try {
    const { partnerData } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: ANNUAL_PRICE_CENTS,
          product_data: {
            name: 'Wrex Preferred Partner — Annual Membership',
            description: 'Listed in the Wrex app for drivers within 20 miles of your location.',
          },
        },
        quantity: 1,
      }],
      customer_email: partnerData.email,
      metadata: {
        company_name:  partnerData.companyName,
        owner_name:    partnerData.ownerName,
        email:         partnerData.email,
        password:      partnerData.password, // hashed in webhook
        phone:         partnerData.phone,
        address:       partnerData.address,
        city:          partnerData.city,
        state:         partnerData.state,
        zip:           partnerData.zip,
        hours:         partnerData.hours || '',
        is24_7:        String(partnerData.is24_7 || false),
        tagline:       partnerData.tagline || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/partners/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/partners/signup`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
