import type { Localized, TKey } from '../i18n';

// ponytail: sample catalogue until phase 5 moves courses into Supabase; field names follow the planned tables.

export type Level = 'beginner' | 'intermediate' | 'advanced';
export type YogaStyle = 'hatha' | 'vinyasa' | 'yin';

export interface Lesson {
  id: string;
  title: Localized;
  durationMin: number;
  isFree: boolean;
}

export interface Course {
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  level: Level;
  style: YogaStyle;
  priceVnd: number;
  /** path under /public; the sage placeholder shows until the file exists */
  cover?: string;
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    slug: 'morning-flow',
    title: { vi: 'Yoga buổi sáng', en: 'Morning Flow' },
    summary: {
      vi: 'Chuỗi bài tập nhẹ nhàng giúp cơ thể thức dậy và tâm trí tỉnh táo.',
      en: 'A gentle sequence to wake up the body and clear the mind.',
    },
    description: {
      vi: 'Tám buổi tập ngắn dành cho người mới bắt đầu. Bạn sẽ học cách thở, các tư thế nền tảng và một chuỗi chào mặt trời có thể tập mỗi sáng chỉ trong 20 phút.',
      en: 'Eight short sessions for beginners. You will learn to breathe, the foundation poses, and a sun salutation you can practise every morning in 20 minutes.',
    },
    level: 'beginner',
    style: 'hatha',
    priceVnd: 490000,
    cover: '/images/class-morning-flow.png',
    lessons: [
      { id: 'mf-1', title: { vi: 'Hơi thở nền tảng', en: 'Foundation Breath' }, durationMin: 12, isFree: true },
      { id: 'mf-2', title: { vi: 'Chào mặt trời', en: 'Sun Salutations' }, durationMin: 18, isFree: false },
      { id: 'mf-3', title: { vi: 'Thăng bằng khi đứng', en: 'Standing Balance' }, durationMin: 16, isFree: false },
      { id: 'mf-4', title: { vi: 'Mở hông nhẹ nhàng', en: 'Gentle Hip Opening' }, durationMin: 20, isFree: false },
    ],
  },
  {
    slug: 'gentle-stretch',
    title: { vi: 'Giãn cơ nhẹ nhàng', en: 'Gentle Stretch' },
    summary: {
      vi: 'Thả lỏng lưng, vai và hông sau một ngày dài ngồi làm việc.',
      en: 'Release your back, shoulders and hips after a long day at a desk.',
    },
    description: {
      vi: 'Những tư thế Yin giữ lâu, kết hợp đạo cụ, giúp giải phóng căng cứng sâu trong cơ và khớp. Phù hợp để tập vào buổi tối.',
      en: 'Long-held Yin poses with props to release deep tension in muscles and joints. Best practised in the evening.',
    },
    level: 'beginner',
    style: 'yin',
    priceVnd: 390000,
    cover: '/images/class-gentle-stretch.png',
    lessons: [
      { id: 'gs-1', title: { vi: 'Thả lỏng cổ và vai', en: 'Neck & Shoulder Release' }, durationMin: 15, isFree: true },
      { id: 'gs-2', title: { vi: 'Lưng dưới khoẻ hơn', en: 'Kinder Lower Back' }, durationMin: 22, isFree: false },
      { id: 'gs-3', title: { vi: 'Giãn hông sâu', en: 'Deep Hip Release' }, durationMin: 25, isFree: false },
    ],
  },
  {
    slug: 'strength-balance',
    title: { vi: 'Sức mạnh & Thăng bằng', en: 'Strength & Balance' },
    summary: {
      vi: 'Xây dựng sức mạnh cơ lõi và sự vững vàng qua các chuỗi Vinyasa.',
      en: 'Build core strength and steadiness through Vinyasa flows.',
    },
    description: {
      vi: 'Dành cho người đã quen các tư thế cơ bản. Các chuỗi chuyển động liên tục theo nhịp thở giúp tăng sức bền, sức mạnh và khả năng tập trung.',
      en: 'For students who know the basic poses. Continuous breath-led flows that build stamina, strength and focus.',
    },
    level: 'intermediate',
    style: 'vinyasa',
    priceVnd: 690000,
    lessons: [
      { id: 'sb-1', title: { vi: 'Kích hoạt cơ lõi', en: 'Core Activation' }, durationMin: 20, isFree: true },
      { id: 'sb-2', title: { vi: 'Chuỗi chiến binh', en: 'Warrior Flow' }, durationMin: 30, isFree: false },
      { id: 'sb-3', title: { vi: 'Thăng bằng trên tay', en: 'Arm Balances' }, durationMin: 28, isFree: false },
      { id: 'sb-4', title: { vi: 'Chuỗi tổng hợp', en: 'Full Practice' }, durationMin: 45, isFree: false },
    ],
  },
  {
    slug: 'evening-restore',
    title: { vi: 'Phục hồi buổi tối', en: 'Evening Restore' },
    summary: {
      vi: 'Làm dịu hệ thần kinh và chuẩn bị cho một giấc ngủ sâu.',
      en: 'Calm the nervous system and prepare for deep sleep.',
    },
    description: {
      vi: 'Các bài tập phục hồi chậm rãi, kết hợp thở và thiền ngắn, giúp bạn khép lại một ngày thật nhẹ nhõm.',
      en: 'Slow restorative practice with breathwork and short meditations to close the day with ease.',
    },
    level: 'advanced',
    style: 'yin',
    priceVnd: 450000,
    lessons: [
      { id: 'er-1', title: { vi: 'Thở để thư giãn', en: 'Breathing to Unwind' }, durationMin: 10, isFree: true },
      { id: 'er-2', title: { vi: 'Phục hồi toàn thân', en: 'Full Body Restore' }, durationMin: 35, isFree: false },
      { id: 'er-3', title: { vi: 'Thiền trước khi ngủ', en: 'Bedtime Meditation' }, durationMin: 15, isFree: false },
    ],
  },
];

export const getCourse = (slug: string | undefined) => COURSES.find((c) => c.slug === slug);

export const totalMinutes = (course: Course) => course.lessons.reduce((sum, l) => sum + l.durationMin, 0);

export const STYLE_LABEL: Record<YogaStyle, string> = { hatha: 'Hatha', vinyasa: 'Vinyasa', yin: 'Yin' };

/** "Hatha · Cơ bản · 4 bài học" */
export const courseMeta = (course: Course, t: (key: TKey) => string) =>
  `${STYLE_LABEL[course.style]} · ${t(`level.${course.level}` as const)} · ${course.lessons.length} ${t('unit.lessons')}`;
