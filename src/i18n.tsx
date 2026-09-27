import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'vi' | 'en';

const vi = {
  'nav.classes': 'Lớp học',
  'nav.about': 'Giới thiệu',
  'nav.login': 'Đăng nhập',
  'nav.cta': 'Học thử miễn phí',
  'nav.menu': 'Mở menu',
  'lang.switch': 'Switch to English',
  'footer.tagline': 'Giúp bạn kết nối lại với cơ thể, tĩnh tâm và tìm thấy sự hài hoà trong từng hơi thở.',
  'footer.links': 'Liên kết',
  'footer.follow': 'Theo dõi',
  'footer.rights': 'Bảo lưu mọi quyền.',
  'page.home': 'Tìm lại sự cân bằng',
  'page.classes': 'Lớp học trực tuyến',
  'page.course': 'Chi tiết khoá học',
  'page.about': 'Giới thiệu',
  'page.login': 'Đăng nhập',
  'page.learn': 'Phòng học',
  'page.notFound': 'Không tìm thấy trang',
  'common.comingSoon': 'Trang này đang được xây dựng.',
  'common.backHome': 'Về trang chủ',
  'video.error': 'Không tải được video. Hãy tắt trình chặn quảng cáo hoặc thử lại.',
  'video.openYouTube': 'Xem trên YouTube',
};

export type TKey = keyof typeof vi;

const en: Record<TKey, string> = {
  'nav.classes': 'Classes',
  'nav.about': 'About',
  'nav.login': 'Log In',
  'nav.cta': 'Book a Free Class',
  'nav.menu': 'Open menu',
  'lang.switch': 'Chuyển sang tiếng Việt',
  'footer.tagline': 'Helping you reconnect with your body, calm your mind, and discover harmony in every breath.',
  'footer.links': 'Quick Links',
  'footer.follow': 'Follow Me',
  'footer.rights': 'All rights reserved.',
  'page.home': 'Find Your Inner Balance',
  'page.classes': 'Online Classes',
  'page.course': 'Course Details',
  'page.about': 'About',
  'page.login': 'Log In',
  'page.learn': 'Classroom',
  'page.notFound': 'Page Not Found',
  'common.comingSoon': 'This page is under construction.',
  'common.backHome': 'Back to Home',
  'video.error': 'Couldn’t load the video. Turn off ad blockers or try again.',
  'video.openYouTube': 'Watch on YouTube',
};

const dictionaries: Record<Lang, Record<TKey, string>> = { vi, en };
const STORAGE_KEY = 'lang';

function initialLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'vi';
  } catch {
    return 'vi';
  }
}

interface LangContext {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
}

const Ctx = createContext<LangContext | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage blocked: the choice just won't persist
    }
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t: (key) => dictionaries[lang][key] }}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used inside <LanguageProvider>');
  return ctx;
}
