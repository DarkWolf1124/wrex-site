import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const ANNUAL_PRICE_CENTS = 99900; // $999/year — change this to whatever you want
