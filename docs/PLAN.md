# Thu Diệu Yoga website: plan

Vite + React + TypeScript, Supabase (auth, Postgres), YouTube (video hosting). Vietnamese by default, English as a second language.
Payment is a manual bank transfer: the admin confirms each transfer and grants access by hand.

## Pages

| Route | Page | Notes |
|---|---|---|
| `/` | Landing | Port of the design project's `ui_kits/website` sections |
| `/classes` | Online classes | ClassCard grid, filter chips (level, style) |
| `/classes/:slug` | Course detail | Description, lesson list (free/locked), price, buy / pending / continue |
| `/about` | About | Instructor story, benefits, stats, testimonials |
| `/login` | Login / sign up | Supabase email + password, one page with a toggle |
| `/learn/:slug/:lessonId` | Player | Login + paid order required. YouTube embed, lesson list, progress |
| `/style-guide` | Style guide | Kept for reference |

## Structure

```
src/
  App.tsx            routes
  i18n.tsx           vi/en dictionaries, useT(); no i18n library
  layout/            SiteHeader (NavBar + mobile menu), PageHero, Footer
  pages/             one file per route (+ its CSS)
  components/        design-system components; port the rest when a page needs one
  content.ts         site copy + contact details (sample until replaced)
  auth.tsx           session context, RequireAuth
  lib/courses.ts     course types + queries (used by route loaders)
public/images/       photos; see the README there
  lib/supabase.ts    client
  video/             VideoPlayer + YouTubePlayer; the only code that knows the video host
supabase/schema.sql  tables, RLS, triggers + sample courses; run once in the SQL Editor
```

## Data (Supabase)

- `courses (id, slug, title jsonb {vi,en}, summary jsonb, level, style, price_vnd, cover_path, published, sort)`
- `lessons (id, course_id, position, title jsonb, duration_min, is_free)`
- `lesson_videos (lesson_id, provider 'youtube', video_ref)`: kept apart from `lessons` so video IDs are never public.
  Each row names its own provider, so lessons can move to another host one at a time
- `orders (id, user_id, course_id, reference, amount_vnd, status pending|paid|cancelled, created_at)`
- `lesson_progress (user_id, lesson_id, seconds, completed, updated_at)`

Access rule: a user can watch a lesson if it is free, or if they have an order with `status = 'paid'` for its course.
There is no separate enrollments table; a paid order is the permission.

- RLS: anyone can read published courses and lessons. Users can insert and read their own orders; only the admin
  (dashboard, service role) can change an order's status. Users can read and write their own progress.
- `lesson_videos` RLS: a row is readable only when the access rule passes. The player asks for the lesson's row;
  getting none back means the lesson is locked. No signed URLs or server code needed.
- Videos are uploaded to YouTube as **Unlisted** with embedding allowed. Private videos won't play in an embed,
  and Public ones show up in search.
- The player embeds `youtube-nocookie.com` with `rel=0` (related videos from the same channel only). The IFrame
  Player API reports the position and the ended event, which drive resume and "completed".
- Course covers live in a public Supabase storage bucket `covers`.

## Purchase flow

1. Course detail → "Đăng ký" → log in if needed.
2. A dialog shows the bank, account number, account holder, amount, and transfer note = order reference
   (e.g. `TDY7K2M9Q`), plus a VietQR image (`img.vietqr.io`) pre-filled with the same details.
3. "Tôi đã chuyển khoản" creates an order with status `pending`, and the course page shows "Đang chờ xác nhận".
4. The admin checks the bank app, then opens Supabase → Table Editor → `orders` and sets `status = 'paid'`.
   The course unlocks on the user's next page load.

Bank details come from env vars: `VITE_BANK_ID`, `VITE_BANK_ACCOUNT`, `VITE_BANK_ACCOUNT_NAME`.

## Phases (the site runs at the end of each one)

1. ✅ **Foundation**: router, i18n, header + mobile menu, page hero, footer, placeholder pages, style guide at `/style-guide`.
2. ✅ **Landing**: port Hero, Instructor, Classes carousel, VideoSection, Contact, plus images and needed components.
3. ✅ **Classes + course detail**: on local data in `src/data/courses.ts`, shaped like the DB rows.
4. ✅ **About.**
5. ✅ **Supabase**: schema + RLS, auth (login/sign up), switch course data to queries.
6. **Purchase**: bank transfer dialog, VietQR, pending orders, access check.
7. **Player**: YouTube embed via the IFrame API, lesson list, next lesson, resume position + completed.
8. **Polish + deploy**: page titles/meta, 404, loading/error states, accessibility pass, hosting.

## Needed from you

- Before phase 5: create a Supabase project and put `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in `.env.local`.
- Before phase 6: bank name (VietQR bank ID), account number, account holder name.
- Real photos whenever they're ready. Videos go on your YouTube channel as Unlisted; give me each lesson's video ID.

## Known limits

- Unlisted isn't private: a paying user can copy the video link from the player and share it, and it works forever.
  The site keeps IDs away from non-buyers, but it can't stop a buyer from sharing. The upgrade path, if it becomes
  a problem, is Bunny Stream with signed URLs. The steps are written at the top of `src/video/source.ts`;
  only that folder, the `lesson_videos` rows and one Edge Function change.
- YouTube's terms may limit charging for access to embedded YouTube videos. Check the YouTube Terms of Service
  and the API Services Developer Policies before launch; this is the main risk of this choice.
- The embed shows YouTube branding and the channel name, and viewers can click through to YouTube.
- As a single-page app, the landing page is weaker for SEO. Pre-rendering can be added later if it matters.
