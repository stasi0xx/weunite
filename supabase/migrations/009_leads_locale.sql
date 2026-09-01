-- Migration 009: Add locale column to leads table
-- Tracks which language (pl/en) a lead was browsing in when they submitted,
-- so the team can follow up in the right language and the confirmation
-- email can send in the lead's own language. Existing rows backfill to 'pl'.

alter table leads
  add column if not exists locale text not null default 'pl' check (locale in ('pl', 'en'));

update leads set locale = 'pl' where locale is null;

notify pgrst, 'reload schema';
