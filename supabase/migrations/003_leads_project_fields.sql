alter table leads
  add column if not exists project_name text not null default '',
  add column if not exists project_description text not null default '';

alter table leads
  alter column project_name drop default,
  alter column project_description drop default;

alter table leads
  drop column if exists service_interest;
