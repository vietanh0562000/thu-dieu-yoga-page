-- Admin page, "Khoá học" tab: lets admins edit courses, lessons, video IDs and cover photos.
-- Run once in Supabase → SQL Editor, after schema.sql and admin.sql.

-- Admins see and edit every course, published or not.
create policy "admins manage courses" on public.courses
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage lessons" on public.lessons
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage lesson videos" on public.lesson_videos
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant insert, update, delete on public.courses, public.lessons, public.lesson_videos to authenticated;

-- Lessons are saved in one go, so swapping two positions must not trip the unique check mid-save.
alter table public.lessons drop constraint lessons_course_id_position_key;
alter table public.lessons add constraint lessons_course_position unique (course_id, position) deferrable initially deferred;

-- Deleting a course must never delete purchase records: refuse instead (hide the course).
alter table public.orders drop constraint orders_course_id_fkey;
alter table public.orders add constraint orders_course_id_fkey
  foreign key (course_id) references public.courses on delete restrict;

-- Cover photos: public bucket, admins upload. Images only, up to 5 MB.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('covers', 'covers', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "admins upload covers" on storage.objects
  for insert to authenticated with check (bucket_id = 'covers' and public.is_admin());
create policy "admins replace covers" on storage.objects
  for update to authenticated using (bucket_id = 'covers' and public.is_admin());
create policy "admins delete covers" on storage.objects
  for delete to authenticated using (bucket_id = 'covers' and public.is_admin());
