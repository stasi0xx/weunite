-- Migration 008: Add offer_type column to leads table
alter table leads
  add column if not exists offer_type text default 'website_visualization';

notify pgrst, 'reload schema';
