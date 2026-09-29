# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Thu Diệu Yoga** is a bi-lingual yoga course platform with user authentication, course management, and an admin panel.

- **Frontend:** Vite + React 19 + TypeScript
- **Backend:** Supabase (PostgreSQL with Row-Level Security)
- **Languages:** Vietnamese (vi) and English (en)
- **Target:** Yoga instructors and learners managing and taking courses online

## Development Commands

```bash
# Start dev server (Vite hot-reload on port 5173)
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview

# Validate YouTube ID parsing (used in lesson editing)
npm run check
```

## Architecture

### Frontend Structure

```
src/
├── pages/              # Page components (Home, Classes, Admin, etc.)
│   └── admin/         # Admin tab panels (CoursesAdmin, ContentEditor, etc.)
├── components/        # Reusable UI: Button, Input, Icon, ClassCard, etc.
├── layout/            # SiteLayout, Header, Footer, PageHero
├── lib/               # Supabase client, course queries
├── video/             # YouTubePlayer, video source parsing
├── styles/            # Global CSS
├── App.tsx            # React Router 7 setup
├── auth.tsx           # Auth context, RequireAuth guard
├── i18n.tsx           # Localization strings for vi/en
├── content.ts         # Site content model and loader
└── main.tsx           # Entry point
```

### Key Patterns

**Routing & Loaders** (`App.tsx`):
- Uses React Router 7 with loaders for data fetching
- `loadSiteContent` and `listCourses` are root/index loaders
- Search param changes (admin tabs, filters) don't refetch; explicit revalidation used in admin saves
- `RequireAuth` guard redirects to login with `next=` param for post-login redirect

**Authentication** (`auth.tsx`):
- Supabase session management in `AuthProvider` context
- `useAuth()` hook provides `{ session, loading }`
- `RequireAuth` wrapper gates protected routes (admin, learn pages)

**i18n** (`i18n.tsx`):
- Type `Localized = Record<'vi' | 'en', string>` for bilingual fields
- `t()` function and `useLang()` hook for switching between languages
- All UI strings and database content use this pattern

**Database Schema** (`supabase/schema.sql`):
- `courses` – metadata (slug, title, description, level, style, price, cover image)
- `lessons` – course units (title, duration, position, free/paid flag)
- `lesson_videos` – separate table for YouTube video IDs (access-controlled)
- `orders` – purchase records (status: pending/paid/cancelled)
- `lesson_progress` – user watch time and completion tracking
- `site_content` – editable JSON blob (hero, testimonials, benefits, contact, social)
- `admins` – admin user list for dashboard access
- Row-level security policies restrict video/progress data to authorized users

### Admin Features

The admin panel (`/admin`) has three main tabs:
1. **Courses** (`CoursesAdmin.tsx`) – Create, edit, delete courses and lessons; upload cover images; manage YouTube video links
2. **Content** (`ContentEditor.tsx`) – Edit site-wide copy (hero, testimonials, stats, benefits, contact info)
3. **Orders** (implied) – View and manage customer orders

## Environment Variables

Required in `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These are checked at runtime in `src/lib/supabase.ts`; missing keys will throw an error.

## Common Tasks

**Add a new route:**
1. Create page component in `src/pages/`
2. Add route config to `App.tsx` router
3. If data needed, add a loader function

**Add UI component:**
1. Create in `src/components/` with `.tsx` + corresponding `.css`
2. Use design system patterns (Button, Input, Icon, etc.)

**Add i18n string:**
1. Add key to `vi` and `en` objects in `src/i18n.tsx`
2. Use `t('key')` in components via `useLang()` hook

**Update site content:**
- Edit via admin panel (simplest)
- Or directly update the row in `supabase → site_content` table

**Add database query:**
1. Use Supabase client from `src/lib/supabase.ts`
2. Queries in route loaders return data to components via `useRouteLoaderData()`
3. RLS policies enforce access control automatically

## Testing & Validation

- **Type checking:** `npm run build` runs `tsc` first
- **YouTube URLs:** `npm run check` validates the parser in `src/video/source.ts` against various YouTube URL formats (watch, shorts, live, nocookie embeds, etc.)

## Database Setup

Schema is in `supabase/schema.sql` with sample data. Admin setup in `supabase/admin.sql`. Run once in Supabase → SQL Editor after creating a project.

## Notes

- The app falls back to default content if the `site_content` table is unreachable
- Lesson videos are stored separately from lessons to enforce RLS-based access control
- YouTube embed uses iframe with `youtube-nocookie.com` for privacy
- Site fully works offline (cached) but requires network for login and content updates
