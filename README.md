# Wrex Website — Setup Guide

## What this is
- Public marketing site at wrexapp.me
- Partner signup + Stripe payment ($25/year)
- Partner dashboard (companies manage their own listing)
- API endpoint the Wrex app uses to load live partner data

---

## Step 1 — Supabase (database)

1. Go to supabase.com and create a new project
2. Click **SQL Editor** in the left sidebar
3. Paste the contents of `supabase-schema.sql` and click **Run**
4. Go to **Project Settings → API**
5. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — Stripe

1. Go to stripe.com → Developers → API Keys
2. Copy your **test** keys for now (you'll swap to live keys when ready to charge real money)
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
3. For the webhook:
   - Go to Stripe → Developers → Webhooks → Add endpoint
   - URL: `https://wrexapp.me/api/webhook`
   - Event: `checkout.session.completed`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Step 3 — Environment variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in all the values from Steps 1 and 2
3. Set `JWT_SECRET` to any long random string (e.g. 32+ random characters)

---

## Step 4 — Deploy to Vercel

1. Go to vercel.com and sign up (free)
2. Click **Add New Project** → import from GitHub
   - First push this folder to GitHub: `git init && git add . && git commit -m "init" && git remote add origin YOUR_REPO && git push`
3. In Vercel project settings → **Environment Variables**
   - Add every variable from your `.env.local` file
4. Deploy

---

## Step 5 — Connect your IONOS domain

1. In Vercel → your project → **Settings → Domains**
2. Add `wrexapp.me`
3. Vercel gives you DNS records to add
4. Log into IONOS → DNS settings for wrexapp.me
5. Add the records Vercel shows you (usually an A record and CNAME)
6. Wait 10–30 minutes for DNS to propagate

---

## Step 6 — Update the Wrex app to use live data

Replace the hardcoded `PREFERRED_PARTNERS` in App.js with a live API call:

```javascript
// In TowingScreen useEffect, replace the static PREFERRED_PARTNERS filter with:
const res = await fetch('https://wrexapp.me/api/partners');
const { partners } = await res.json();
const nearby = partners
  .map(p => ({ ...p, distanceMiles: haversineMiles(latitude, longitude, p.lat, p.lng) }))
  .filter(p => p.distanceMiles <= 20)
  .sort((a, b) => a.distanceMiles - b.distanceMiles);
setNearbyPartners(nearby);
```

---

## How it works day-to-day

1. Tow company goes to wrexapp.me → clicks "Become a Preferred Partner"
2. Fills out their info → pays $25 via Stripe
3. Stripe sends a webhook to your site → account is created automatically
4. Company logs into wrexapp.me/partners → can update all their info anytime
5. Wrex app fetches live partners from wrexapp.me/api/partners → shows nearby ones
6. No app rebuild needed — ever

---

## Going live (when ready to charge real money)

1. In Stripe dashboard → switch from Test to Live mode
2. Get your live API keys
3. Update `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel
4. Update the webhook to use your live webhook secret
