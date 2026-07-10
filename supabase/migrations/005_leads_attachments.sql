alter table leads
  add column if not exists attachments jsonb not null default '[]'::jsonb;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-attachments',
  'lead-attachments',
  false,
  10485760,
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

-- Anonymous visitors may only upload (insert) into this bucket, never list/read/overwrite/delete.
-- Uploaded files are only ever read back server-side (service role) via short-lived signed URLs.
create policy "Anon can upload lead attachments"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'lead-attachments');
