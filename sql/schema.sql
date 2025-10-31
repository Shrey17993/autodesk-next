-- signups table
create table if not exists signups (
  id bigserial primary key,
  name text,
  email text not null unique,
  role text,
  referrer text,
  referral_code text,
  referrals int default 0,
  created_at timestamptz default now(),
  tier text default 'waitlist', -- waitlist | winner | discount
  note text
);

create index if not exists idx_signups_created_at on signups(created_at);
