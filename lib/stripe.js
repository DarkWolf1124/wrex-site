import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const ANNUAL_PRICE_CENTS = 2500; // $25.00
