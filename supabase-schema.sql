-- Run this in your Supabase SQL editor to set up the database

create table partners (
  id              uuid primary key default gen_random_uuid(),
  company_name    text not null,
  owner_name      text,
  email           text unique not null,
  password_hash   text not null,
  phone           text,
  address         text,
  city            text,
  state           text,
  zip             text,
  lat             double precision,
  lng             double precision,
  hours           text,
  is24_7          boolean default false,
  tagline         text,
  eta_minutes     integer default 20,
  rating          numeric(3,1) default 0,
  review_count    integer default 0,
  is_active       boolean default false,
  stripe_session_id text,
  renewal_date    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Index for fast location queries
create index partners_active_location on partners(is_active, lat, lng);

-- Only allow reading active partners publicly
alter table partners enable row level security;

create policy "Public can read active partners"
  on partners for select
  using (is_active = true);

create policy "Service role has full access"
  on partners for all
  using (true)
  with check (true);
