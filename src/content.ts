import { useRouteLoaderData } from 'react-router';
import type { Localized } from './i18n';
import { supabase } from './lib/supabase';

/** Everything the admin page can edit. Stored as one JSON row in `site_content`. */
export interface SiteContent {
  hero: { title: Localized; lead: Localized };
  instructor: { lead: Localized; leadMuted: Localized };
  about: { lead: Localized; story: Localized[] };
  practice: { caption: Localized };
  contact: { phone: string; email: string; note: Localized };
  social: { facebook: string; instagram: string; youtube: string };
  stats: { value: string; label: Localized }[];
  benefits: { title: Localized; body: Localized }[];
  testimonials: { quote: Localized; name: string; since: string }[];
}

// ponytail: sample copy from the design project; the admin page overrides any section it saves.
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    title: { vi: 'Tìm lại sự cân bằng', en: 'Find Your Inner Balance' },
    lead: {
      vi: 'Kết nối lại cơ thể và tâm trí qua những buổi tập yoga chánh niệm, phù hợp với mọi trình độ.',
      en: 'Reconnect with your body and mind through mindful yoga sessions designed for all levels.',
    },
  },
  instructor: {
    lead: {
      vi: 'Xin chào, mình là Thu Diệu, giáo viên yoga được chứng nhận với hơn 10 năm kinh nghiệm',
      en: 'Hi, I’m Thu Diệu, a certified yoga instructor with over 10 years',
    },
    leadMuted: {
      vi: ' giúp mọi người tìm thấy sự bình yên, sức mạnh và cân bằng qua chuyển động chánh niệm.',
      en: ' of experience helping people find calm, strength, and balance through mindful movement.',
    },
  },
  about: {
    lead: { vi: 'Yoga không phải là đích đến, mà là cách trở về với chính mình.', en: 'Yoga isn’t a destination, it’s a way back to yourself.' },
    story: [
    {
      vi: 'Mình bắt đầu tập yoga để chữa những cơn đau lưng sau nhiều năm ngồi văn phòng. Điều mình không ngờ là yoga còn dạy mình cách thở chậm lại, lắng nghe cơ thể và sống nhẹ nhàng hơn mỗi ngày.',
      en: 'I started yoga to ease the back pain of years at a desk. What I didn’t expect was that it would also teach me to slow my breath, listen to my body and live a little more gently every day.',
    },
    {
      vi: 'Sau khi hoàn thành chứng chỉ giảng dạy, mình mở những lớp nhỏ tại studio và dần chuyển sang lớp trực tuyến, để bất kỳ ai cũng có thể tập cùng mình, ở bất cứ đâu, theo nhịp độ của riêng họ.',
      en: 'After completing my teacher training I opened small studio classes, then moved online so anyone can practise with me, wherever they are, at their own pace.',
    },
  ],
  },
  practice: { caption: { vi: 'Luyện tập mọi lúc, mọi nơi', en: 'Practice anytime, anywhere' } },
  contact: {
    phone: '+84 900 000 000',
    email: 'hello@thudieuyoga.vn',
    note: {
      vi: 'Giữ liên lạc nhé — hành trình tìm lại cân bằng của bạn bắt đầu từ đây.',
      en: 'Let’s stay connected — your journey to balance starts here.',
    },
  },
  social: { facebook: '', instagram: '', youtube: '' },
  stats: [
    { value: '125+', label: { vi: 'Học viên', en: 'Happy Students' } },
    { value: '4.9/5', label: { vi: 'Đánh giá', en: 'Student Rating' } },
    { value: '10+', label: { vi: 'Năm kinh nghiệm', en: 'Years of Expertise' } },
  ],
  benefits: [
    {
      title: { vi: 'Tâm trí tĩnh lặng', en: 'Calms The Mind' },
      body: {
        vi: 'Chuyển động nhẹ nhàng và hơi thở sâu giúp làm dịu những suy nghĩ dồn dập và giảm căng thẳng.',
        en: 'Gentle movement and deep breathing help quiet racing thoughts and reduce mental clutter.',
      },
    },
    {
      title: { vi: 'Dẻo dai & thăng bằng', en: 'Flexibility & balance' },
      body: {
        vi: 'Luyện tập đều đặn giúp mở các nhóm cơ và khớp bị căng, cải thiện tư thế và sự vững vàng.',
        en: 'Steady practice opens tight muscles and joints, improving posture and stability over time.',
      },
    },
    {
      title: { vi: 'Vững vàng về cảm xúc', en: 'Builds emotional resilience' },
      body: {
        vi: 'Chuyển động theo nhịp thở dạy bạn giữ bình tĩnh và hiện diện khi cuộc sống trở nên áp lực.',
        en: 'Breath-led movement teaches you to stay steady and present when life feels stressful.',
      },
    },
    {
      title: { vi: 'Kết nối sâu sắc hơn', en: 'Deepens connection' },
      body: {
        vi: 'Mỗi buổi tập đưa cơ thể, hơi thở và sự chú tâm trở về bên nhau, cả trên thảm lẫn ngoài đời.',
        en: 'Each session brings body, breath and attention back together, on and off the mat.',
      },
    },
  ],
  testimonials: [
    {
      quote: {
        vi: '“Hai mươi phút mỗi sáng trước khi đi làm, và lưng mình cuối cùng cũng hết đau.”',
        en: '“Twenty minutes before work and my back finally stopped aching.”',
      },
      name: 'Hà N.',
      since: '2024',
    },
    {
      quote: {
        vi: '“Lần đầu tiên mình ngủ ngon suốt một tuần liền. Các bài buổi tối thật sự hiệu quả.”',
        en: '“The first full week of good sleep I’ve had in years. The evening sessions really work.”',
      },
      name: 'Minh T.',
      since: '2023',
    },
    {
      quote: {
        vi: '“Hướng dẫn rõ ràng, nhẹ nhàng. Người mới như mình cũng theo được từ buổi đầu.”',
        en: '“Clear, gentle guidance. Even as a complete beginner I could follow from day one.”',
      },
      name: 'Lan P.',
      since: '2025',
    },
  ],
};

/** Root route loader. Falls back to the defaults if the table is missing or unreachable. */
export async function loadSiteContent(): Promise<SiteContent> {
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 1).maybeSingle();
  if (error) console.warn('site_content unavailable, using defaults:', error.message);
  return { ...DEFAULT_CONTENT, ...(data?.data as Partial<SiteContent> | undefined) };
}

export const useSiteContent = () => useRouteLoaderData('root') as SiteContent;
