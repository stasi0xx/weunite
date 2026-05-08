create table if not exists leads (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  email            text        not null,
  business_type    text        not null,
  service_interest text        not null,
  status           text        not null default 'new',
  created_at       timestamptz not null default now()
);
