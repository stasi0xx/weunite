create table booking_slots (
  id           uuid     primary key default gen_random_uuid(),
  day_of_week  smallint not null check (day_of_week between 0 and 6),
  time_slot    time     not null,
  is_active    boolean  not null default true,
  created_at   timestamptz not null default now(),
  unique (day_of_week, time_slot)
);

create table blocked_dates (
  id     uuid primary key default gen_random_uuid(),
  date   date not null unique,
  reason text
);

create table bookings (
  id                     uuid primary key default gen_random_uuid(),
  lead_id                uuid not null references leads(id),
  date                   date not null,
  time_slot              time not null,
  idempotency_key        uuid not null,
  status                 text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  reminder_24h_sent_at   timestamptz,
  reminder_1h_sent_at    timestamptz,
  created_at             timestamptz not null default now(),
  unique (date, time_slot),
  unique (idempotency_key)
);

-- seed initial availability: Mon / Wed / Fri at 10:00, 12:00, 14:00
insert into booking_slots (day_of_week, time_slot) values
  (1, '10:00'), (1, '12:00'), (1, '14:00'),
  (3, '10:00'), (3, '12:00'), (3, '14:00'),
  (5, '10:00'), (5, '12:00'), (5, '14:00');
