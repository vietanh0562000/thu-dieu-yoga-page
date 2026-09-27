import type { Localized, TKey } from '../i18n';
import { supabase } from './supabase';

// Shapes follow the tables in supabase/schema.sql.

export type Level = 'beginner' | 'intermediate' | 'advanced';
export type YogaStyle = 'hatha' | 'vinyasa' | 'yin';

export interface Lesson {
  id: string;
  position: number;
  title: Localized;
  duration_min: number;
  is_free: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  level: Level;
  style: YogaStyle;
  price_vnd: number;
  cover_path: string | null;
  lessons: Lesson[];
}

const COURSE_FIELDS = 'id, slug, title, summary, description, level, style, price_vnd, cover_path, lessons(id, position, title, duration_min, is_free)';

export async function listCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .order('sort')
    .order('position', { referencedTable: 'lessons' });
  if (error) throw error;
  return data as Course[];
}

/** null when there is no published course with this slug */
export async function getCourse(slug: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('slug', slug)
    .order('position', { referencedTable: 'lessons' })
    .maybeSingle();
  if (error) throw error;
  return data as Course | null;
}

export const STYLE_LABEL: Record<YogaStyle, string> = { hatha: 'Hatha', vinyasa: 'Vinyasa', yin: 'Yin' };

/** "Hatha · Cơ bản · 4 bài học" */
export const courseMeta = (course: Course, t: (key: TKey) => string) =>
  `${STYLE_LABEL[course.style]} · ${t(`level.${course.level}` as const)} · ${course.lessons.length} ${t('unit.lessons')}`;

export const totalMinutes = (course: Course) => course.lessons.reduce((sum, l) => sum + l.duration_min, 0);
