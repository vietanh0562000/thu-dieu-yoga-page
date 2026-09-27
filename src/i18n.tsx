import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'vi' | 'en';

/** Content stored in both languages, e.g. course titles. */
export type Localized = Record<Lang, string>;

const vi = {
  'nav.classes': 'Lớp học',
  'nav.about': 'Giới thiệu',
  'nav.login': 'Đăng nhập',
  'nav.cta': 'Học thử miễn phí',
  'nav.menu': 'Mở menu',
  'nav.logout': 'Đăng xuất',
  'auth.signupTitle': 'Tạo tài khoản',
  'auth.email': 'Email',
  'auth.password': 'Mật khẩu',
  'auth.show': 'Hiện',
  'auth.hide': 'Ẩn',
  'auth.passwordHint': 'Ít nhất 8 ký tự',
  'auth.submitLogin': 'Đăng nhập',
  'auth.submitSignup': 'Tạo tài khoản',
  'auth.toSignup': 'Chưa có tài khoản? Đăng ký',
  'auth.toLogin': 'Đã có tài khoản? Đăng nhập',
  'auth.checkEmail': 'Hãy mở email xác nhận vừa được gửi tới',
  'auth.error.invalid': 'Email hoặc mật khẩu không đúng.',
  'auth.error.unconfirmed': 'Tài khoản chưa được xác nhận. Hãy kiểm tra email của bạn.',
  'auth.error.exists': 'Email này đã có tài khoản. Hãy đăng nhập.',
  'auth.error.weak': 'Mật khẩu quá yếu, hãy dùng ít nhất 8 ký tự.',
  'auth.error.rate': 'Bạn đã thử quá nhiều lần. Vui lòng đợi một lát rồi thử lại.',
  'auth.error.generic': 'Có lỗi xảy ra, vui lòng thử lại.',
  'error.title': 'Đã có lỗi xảy ra',
  'error.body': 'Không tải được dữ liệu. Hãy kiểm tra kết nối mạng rồi thử lại.',
  'error.retry': 'Thử lại',
  'lang.switch': 'Switch to English',
  'footer.tagline': 'Giúp bạn kết nối lại với cơ thể, tĩnh tâm và tìm thấy sự hài hoà trong từng hơi thở.',
  'footer.links': 'Liên kết',
  'footer.follow': 'Theo dõi',
  'footer.rights': 'Bảo lưu mọi quyền.',
  'page.home': 'Tìm lại sự cân bằng',
  'page.classes': 'Lớp học trực tuyến',
  'page.about': 'Giới thiệu',
  'page.login': 'Đăng nhập',
  'page.learn': 'Phòng học',
  'page.notFound': 'Không tìm thấy trang',
  'common.comingSoon': 'Trang này đang được xây dựng.',
  'common.backHome': 'Về trang chủ',
  'video.error': 'Không tải được video. Hãy tắt trình chặn quảng cáo hoặc thử lại.',
  'video.openYouTube': 'Xem trên YouTube',
  'unit.lessons': 'bài học',
  'unit.min': 'phút',
  'level.all': 'Tất cả',
  'level.beginner': 'Cơ bản',
  'level.intermediate': 'Trung cấp',
  'level.advanced': 'Nâng cao',
  'pager.label': 'Chuyển trang',
  'pager.page': 'Trang',
  'home.lead': 'Kết nối lại cơ thể và tâm trí qua những buổi tập yoga chánh niệm, phù hợp với mọi trình độ.',
  'home.join': 'Tham gia lớp học',
  'home.watch': 'Xem giới thiệu',
  'home.instructorEyebrow': 'Giáo viên của bạn',
  'home.instructorLead': 'Xin chào, mình là Thu Diệu, giáo viên yoga được chứng nhận với hơn 10 năm kinh nghiệm',
  'home.instructorLeadMuted': ' giúp mọi người tìm thấy sự bình yên, sức mạnh và cân bằng qua chuyển động chánh niệm.',
  'home.aboutMore': 'Tìm hiểu thêm',
  'home.classesEyebrow': 'Lớp học',
  'home.classesTitle': 'Khoá học trực tuyến',
  'home.allClasses': 'Xem tất cả khoá học',
  'home.practice': 'Luyện tập mọi lúc, mọi nơi',
  'home.practiceAction': 'Xem các khoá học',
  'home.contactEyebrow': 'Liên hệ',
  'home.connect1': 'Hãy',
  'home.connect2': 'kết nối',
  'home.connectNote': 'Giữ liên lạc nhé — hành trình tìm lại cân bằng của bạn bắt đầu từ đây.',
  'form.name': 'Họ và tên',
  'form.phone': 'Số điện thoại',
  'form.email': 'Email',
  'form.message': 'Lời nhắn',
  'form.send': 'Gửi lời nhắn',
  'form.subject': 'Lời nhắn từ website',
  'classes.lead': 'Học yoga tại nhà cùng Thu Diệu, theo nhịp độ của riêng bạn.',
  'classes.filter': 'Lọc khoá học',
  'classes.empty': 'Chưa có khoá học phù hợp.',
  'course.content': 'Nội dung khoá học',
  'course.free': 'Học thử miễn phí',
  'course.locked': 'Cần đăng ký',
  'course.price': 'Học phí',
  'course.enroll': 'Đăng ký khoá học',
  'course.anyDevice': 'Xem trên điện thoại, máy tính bảng hoặc máy tính.',
  'about.lead': 'Yoga không phải là đích đến, mà là cách trở về với chính mình.',
  'about.storyEyebrow': 'Câu chuyện',
  'about.benefitsTitle': 'Yoga mang lại cho bạn',
  'about.testimonialsTitle': 'Học viên nói gì',
  'about.memberSince': 'Học viên từ',
  'about.ctaTitle': 'Sẵn sàng bắt đầu?',
  'about.ctaBody': 'Mỗi khoá học đều có bài học thử miễn phí. Hãy thử trước khi quyết định.',
};

export type TKey = keyof typeof vi;

const en: Record<TKey, string> = {
  'nav.classes': 'Classes',
  'nav.about': 'About',
  'nav.login': 'Log In',
  'nav.cta': 'Book a Free Class',
  'nav.menu': 'Open menu',
  'nav.logout': 'Log Out',
  'auth.signupTitle': 'Create Account',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.show': 'Show',
  'auth.hide': 'Hide',
  'auth.passwordHint': 'At least 8 characters',
  'auth.submitLogin': 'Log In',
  'auth.submitSignup': 'Create Account',
  'auth.toSignup': 'No account yet? Sign up',
  'auth.toLogin': 'Already have an account? Log in',
  'auth.checkEmail': 'Open the confirmation email we just sent to',
  'auth.error.invalid': 'Wrong email or password.',
  'auth.error.unconfirmed': 'Your account isn’t confirmed yet. Check your email.',
  'auth.error.exists': 'This email already has an account. Log in instead.',
  'auth.error.weak': 'That password is too weak. Use at least 8 characters.',
  'auth.error.rate': 'Too many attempts. Please wait a moment and try again.',
  'auth.error.generic': 'Something went wrong. Please try again.',
  'error.title': 'Something Went Wrong',
  'error.body': 'We couldn’t load this page. Check your connection and try again.',
  'error.retry': 'Try Again',
  'lang.switch': 'Chuyển sang tiếng Việt',
  'footer.tagline': 'Helping you reconnect with your body, calm your mind, and discover harmony in every breath.',
  'footer.links': 'Quick Links',
  'footer.follow': 'Follow Me',
  'footer.rights': 'All rights reserved.',
  'page.home': 'Find Your Inner Balance',
  'page.classes': 'Online Classes',
  'page.about': 'About',
  'page.login': 'Log In',
  'page.learn': 'Classroom',
  'page.notFound': 'Page Not Found',
  'common.comingSoon': 'This page is under construction.',
  'common.backHome': 'Back to Home',
  'video.error': 'Couldn’t load the video. Turn off ad blockers or try again.',
  'video.openYouTube': 'Watch on YouTube',
  'unit.lessons': 'lessons',
  'unit.min': 'min',
  'level.all': 'All Levels',
  'level.beginner': 'Beginner',
  'level.intermediate': 'Intermediate',
  'level.advanced': 'Advanced',
  'pager.label': 'Change page',
  'pager.page': 'Page',
  'home.lead': 'Reconnect with your body and mind through mindful yoga sessions designed for all levels.',
  'home.join': 'Join Class Now',
  'home.watch': 'Watch Demo',
  'home.instructorEyebrow': 'Meet your instructor',
  'home.instructorLead': 'Hi, I’m Thu Diệu, a certified yoga instructor with over 10 years',
  'home.instructorLeadMuted': ' of experience helping people find calm, strength, and balance through mindful movement.',
  'home.aboutMore': 'Learn More',
  'home.classesEyebrow': 'Classes',
  'home.classesTitle': 'Online Courses',
  'home.allClasses': 'See All Courses',
  'home.practice': 'Practice anytime, anywhere',
  'home.practiceAction': 'Browse the courses',
  'home.contactEyebrow': 'Contact',
  'home.connect1': 'Let’s',
  'home.connect2': 'Connect',
  'home.connectNote': 'Let’s stay connected — your journey to balance starts here.',
  'form.name': 'Name',
  'form.phone': 'Phone Number',
  'form.email': 'Email',
  'form.message': 'Message',
  'form.send': 'Send Message',
  'form.subject': 'Message from the website',
  'classes.lead': 'Practise yoga at home with Thu Diệu, at your own pace.',
  'classes.filter': 'Filter courses',
  'classes.empty': 'No courses match this filter yet.',
  'course.content': 'Course Content',
  'course.free': 'Free preview',
  'course.locked': 'Enrol to unlock',
  'course.price': 'Price',
  'course.enroll': 'Enrol Now',
  'course.anyDevice': 'Watch on your phone, tablet or computer.',
  'about.lead': 'Yoga isn’t a destination, it’s a way back to yourself.',
  'about.storyEyebrow': 'My story',
  'about.benefitsTitle': 'What yoga gives you',
  'about.testimonialsTitle': 'What students say',
  'about.memberSince': 'Member since',
  'about.ctaTitle': 'Ready to begin?',
  'about.ctaBody': 'Every course has a free preview lesson. Try it before you decide.',
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
  /** UI string */
  t: (key: TKey) => string;
  /** content string */
  tl: (text: Localized) => string;
  formatPrice: (vnd: number) => string;
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

  const value: LangContext = {
    lang,
    setLang,
    t: (key) => dictionaries[lang][key],
    tl: (text) => text[lang],
    formatPrice: (vnd) => new Intl.NumberFormat(lang === 'vi' ? 'vi-VN' : 'en-US', { style: 'currency', currency: 'VND' }).format(vnd),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useT must be used inside <LanguageProvider>');
  return ctx;
}

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Thu Diệu Yoga` : 'Thu Diệu Yoga';
  }, [title]);
}
