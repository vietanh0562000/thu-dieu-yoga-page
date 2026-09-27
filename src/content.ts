import type { Localized } from './i18n';

// ponytail: sample contact details and copy from the design project; replace with Thu Diệu's real ones.
export const SITE = {
  phone: '+84 900 000 000',
  email: 'hello@thudieuyoga.vn',
  social: [
    { icon: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
    { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
    { icon: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
  ],
};

export const STATS: { value: string; label: Localized }[] = [
  { value: '125+', label: { vi: 'Học viên', en: 'Happy Students' } },
  { value: '4.9/5', label: { vi: 'Đánh giá', en: 'Student Rating' } },
  { value: '10+', label: { vi: 'Năm kinh nghiệm', en: 'Years of Expertise' } },
];

export const BENEFITS: { title: Localized; body: Localized }[] = [
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
];

export const TESTIMONIALS: { quote: Localized; name: string; since: string }[] = [
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
];

export const ABOUT_STORY: Localized[] = [
  {
    vi: 'Mình bắt đầu tập yoga để chữa những cơn đau lưng sau nhiều năm ngồi văn phòng. Điều mình không ngờ là yoga còn dạy mình cách thở chậm lại, lắng nghe cơ thể và sống nhẹ nhàng hơn mỗi ngày.',
    en: 'I started yoga to ease the back pain of years at a desk. What I didn’t expect was that it would also teach me to slow my breath, listen to my body and live a little more gently every day.',
  },
  {
    vi: 'Sau khi hoàn thành chứng chỉ giảng dạy, mình mở những lớp nhỏ tại studio và dần chuyển sang lớp trực tuyến, để bất kỳ ai cũng có thể tập cùng mình, ở bất cứ đâu, theo nhịp độ của riêng họ.',
    en: 'After completing my teacher training I opened small studio classes, then moved online so anyone can practise with me, wherever they are, at their own pace.',
  },
];
