-- Admin page: who is an admin, and the editable site content.
-- Run once in Supabase → SQL Editor, after schema.sql.

-- ─── Admins ──────────────────────────────────────────────────────────────────
-- Add yourself after signing up on the website (change the email):
--   insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';

create table public.admins (
  user_id uuid primary key references auth.users on delete cascade
);
alter table public.admins enable row level security; -- no policies: only is_admin() reads it

create function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;

-- ─── Site content ────────────────────────────────────────────────────────────
-- One JSON document with all editable copy. Missing sections fall back to the defaults in src/content.ts.

create table public.site_content (
  id integer primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

create policy "site content is public" on public.site_content
  for select using (true);
create policy "admins create site content" on public.site_content
  for insert to authenticated with check (public.is_admin());
create policy "admins edit site content" on public.site_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;
