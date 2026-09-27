-- Thu Diệu Yoga: tables, access rules and sample courses.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

-- ─── Tables ──────────────────────────────────────────────────────────────────

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,                -- {"vi": "...", "en": "..."}
  summary jsonb not null,
  description jsonb not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  style text not null check (style in ('hatha', 'vinyasa', 'yin')),
  price_vnd integer not null check (price_vnd >= 0),
  cover_path text,                     -- e.g. /images/window-stretch.jpg
  published boolean not null default false,
  sort integer not null default 0
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses on delete cascade,
  position integer not null,
  title jsonb not null,
  duration_min integer not null,
  is_free boolean not null default false,
  unique (course_id, position)
);

-- Kept apart from lessons so video IDs are only readable by people allowed to watch.
create table public.lesson_videos (
  lesson_id uuid primary key references public.lessons on delete cascade,
  provider text not null default 'youtube' check (provider in ('youtube')),
  video_ref text not null              -- YouTube video ID
);

-- A paid order is the permission to watch a course. The admin flips status to 'paid' by hand.
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  email text,
  course_id uuid not null references public.courses on delete cascade,
  reference text not null unique default ('TDY' || upper(substr(md5(gen_random_uuid()::text), 1, 6))),
  amount_vnd integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  created_at timestamptz not null default now()
);
-- One open order per user and course.
create unique index orders_one_open_per_course on public.orders (user_id, course_id) where status in ('pending', 'paid');

create table public.lesson_progress (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  lesson_id uuid not null references public.lessons on delete cascade,
  seconds integer not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ─── Orders created from the website get trusted values ──────────────────────
-- Users only choose the course; who, email, price and status are filled in here.
-- Rows added in the dashboard (no logged-in user) are left as typed.

create function public.fill_order() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null then
    new.user_id := auth.uid();
    new.email := auth.jwt() ->> 'email';
    new.status := 'pending';
    new.amount_vnd := (select price_vnd from courses where id = new.course_id);
  end if;
  return new;
end;
$$;

create trigger orders_fill before insert on public.orders
for each row execute function public.fill_order();

-- ─── Access rule ─────────────────────────────────────────────────────────────

create function public.can_watch(p_lesson_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from lessons l
    where l.id = p_lesson_id
      and (l.is_free or exists (
        select 1 from orders o
        where o.course_id = l.course_id and o.user_id = auth.uid() and o.status = 'paid'
      ))
  );
$$;

-- ─── Row level security ──────────────────────────────────────────────────────

alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_videos enable row level security;
alter table public.orders enable row level security;
alter table public.lesson_progress enable row level security;

create policy "published courses are public" on public.courses
  for select using (published);

create policy "lessons of published courses are public" on public.lessons
  for select using (exists (select 1 from public.courses c where c.id = course_id and c.published));

create policy "videos for allowed viewers" on public.lesson_videos
  for select using (public.can_watch(lesson_id));

create policy "read own orders" on public.orders
  for select to authenticated using (user_id = auth.uid());

-- Checked after fill_order has set user_id, price and status.
create policy "create own orders" on public.orders
  for insert to authenticated with check (user_id = auth.uid());

create policy "own progress" on public.lesson_progress
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Explicit grants, in case the project doesn't expose new tables automatically.
grant select on public.courses, public.lessons, public.lesson_videos to anon, authenticated;
grant select, insert on public.orders to authenticated;
grant select, insert, update on public.lesson_progress to authenticated;

-- ─── Sample courses (replace with the real ones) ─────────────────────────────

with c as (
  insert into public.courses (slug, title, summary, description, level, style, price_vnd, cover_path, published, sort) values
  ('morning-flow',
   '{"vi":"Yoga buổi sáng","en":"Morning Flow"}',
   '{"vi":"Chuỗi bài tập nhẹ nhàng giúp cơ thể thức dậy và tâm trí tỉnh táo.","en":"A gentle sequence to wake up the body and clear the mind."}',
   '{"vi":"Bốn buổi tập ngắn dành cho người mới bắt đầu. Bạn sẽ học cách thở, các tư thế nền tảng và một chuỗi chào mặt trời có thể tập mỗi sáng chỉ trong 20 phút.","en":"Four short sessions for beginners. You will learn to breathe, the foundation poses, and a sun salutation you can practise every morning in 20 minutes."}',
   'beginner', 'hatha', 490000, '/images/window-stretch.jpg', true, 1),
  ('gentle-stretch',
   '{"vi":"Giãn cơ nhẹ nhàng","en":"Gentle Stretch"}',
   '{"vi":"Thả lỏng lưng, vai và hông sau một ngày dài ngồi làm việc.","en":"Release your back, shoulders and hips after a long day at a desk."}',
   '{"vi":"Những tư thế Yin giữ lâu, kết hợp đạo cụ, giúp giải phóng căng cứng sâu trong cơ và khớp. Phù hợp để tập vào buổi tối.","en":"Long-held Yin poses with props to release deep tension in muscles and joints. Best practised in the evening."}',
   'beginner', 'yin', 390000, '/images/forward-fold.jpg', true, 2),
  ('strength-balance',
   '{"vi":"Sức mạnh & Thăng bằng","en":"Strength & Balance"}',
   '{"vi":"Xây dựng sức mạnh cơ lõi và sự vững vàng qua các chuỗi Vinyasa.","en":"Build core strength and steadiness through Vinyasa flows."}',
   '{"vi":"Dành cho người đã quen các tư thế cơ bản. Các chuỗi chuyển động liên tục theo nhịp thở giúp tăng sức bền, sức mạnh và khả năng tập trung.","en":"For students who know the basic poses. Continuous breath-led flows that build stamina, strength and focus."}',
   'intermediate', 'vinyasa', 690000, '/images/lunge-waterfall.jpg', true, 3),
  ('evening-restore',
   '{"vi":"Phục hồi buổi tối","en":"Evening Restore"}',
   '{"vi":"Làm dịu hệ thần kinh và chuẩn bị cho một giấc ngủ sâu.","en":"Calm the nervous system and prepare for deep sleep."}',
   '{"vi":"Các bài tập phục hồi chậm rãi, kết hợp thở và thiền ngắn, giúp bạn khép lại một ngày thật nhẹ nhõm.","en":"Slow restorative practice with breathwork and short meditations to close the day with ease."}',
   'advanced', 'yin', 450000, '/images/warrior-sunset.jpg', true, 4)
  returning id, slug
)
insert into public.lessons (course_id, position, title, duration_min, is_free)
select c.id, l.position, l.title::jsonb, l.duration_min, l.is_free
from c join (values
  ('morning-flow', 1, '{"vi":"Hơi thở nền tảng","en":"Foundation Breath"}', 12, true),
  ('morning-flow', 2, '{"vi":"Chào mặt trời","en":"Sun Salutations"}', 18, false),
  ('morning-flow', 3, '{"vi":"Thăng bằng khi đứng","en":"Standing Balance"}', 16, false),
  ('morning-flow', 4, '{"vi":"Mở hông nhẹ nhàng","en":"Gentle Hip Opening"}', 20, false),
  ('gentle-stretch', 1, '{"vi":"Thả lỏng cổ và vai","en":"Neck & Shoulder Release"}', 15, true),
  ('gentle-stretch', 2, '{"vi":"Lưng dưới khoẻ hơn","en":"Kinder Lower Back"}', 22, false),
  ('gentle-stretch', 3, '{"vi":"Giãn hông sâu","en":"Deep Hip Release"}', 25, false),
  ('strength-balance', 1, '{"vi":"Kích hoạt cơ lõi","en":"Core Activation"}', 20, true),
  ('strength-balance', 2, '{"vi":"Chuỗi chiến binh","en":"Warrior Flow"}', 30, false),
  ('strength-balance', 3, '{"vi":"Thăng bằng trên tay","en":"Arm Balances"}', 28, false),
  ('strength-balance', 4, '{"vi":"Chuỗi tổng hợp","en":"Full Practice"}', 45, false),
  ('evening-restore', 1, '{"vi":"Thở để thư giãn","en":"Breathing to Unwind"}', 10, true),
  ('evening-restore', 2, '{"vi":"Phục hồi toàn thân","en":"Full Body Restore"}', 35, false),
  ('evening-restore', 3, '{"vi":"Thiền trước khi ngủ","en":"Bedtime Meditation"}', 15, false)
) as l(slug, position, title, duration_min, is_free) on l.slug = c.slug;
