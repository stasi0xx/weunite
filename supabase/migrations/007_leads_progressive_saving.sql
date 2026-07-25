-- Migration 007: Allow progressive multi-step saving of leads
-- Drops NOT NULL constraints on lead fields that are filled in subsequent steps
-- Adds current_step integer column to track wizard progress

alter table leads
  alter column name drop not null,
  alter column business_type drop not null,
  alter column project_name drop not null,
  alter column project_description drop not null;

alter table leads
  add column if not exists current_step integer not null default 1;

notify pgrst, 'reload schema';
