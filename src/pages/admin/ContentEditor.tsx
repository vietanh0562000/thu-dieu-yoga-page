import { useState, type FormEvent } from 'react';
import { useRevalidator } from 'react-router';
import { useSiteContent, type SiteContent } from '../../content';
import { supabase } from '../../lib/supabase';
import { blankText, List, LocalizedField, SaveBar, Section, TextField, useUnsavedWarning, type SaveStatus } from './fields';

export type ContentTab = 'home' | 'about' | 'contact';

/**
 * Site copy, split over three tabs. It stays mounted while the admin switches tabs,
 * so one draft and one save button cover all of them.
 */
export function ContentEditor({ tab, hidden }: { tab: ContentTab; hidden: boolean }) {
  const saved = useSiteContent();
  const revalidator = useRevalidator();
  const [draft, setDraft] = useState(saved);
  const [status, setStatus] = useState<SaveStatus>('clean');
  useUnsavedWarning(status === 'dirty' || status === 'error');

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setStatus('dirty');
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    const { error } = await supabase.from('site_content').upsert({ id: 1, data: draft, updated_at: new Date().toISOString() });
    if (error) {
      console.error(error);
      return setStatus('error');
    }
    setStatus('saved');
    revalidator.revalidate(); // the rest of the site picks up the new copy
  };

  const { hero, instructor, about, practice, contact, social } = draft;

  return (
    <form className="admin" onSubmit={save} hidden={hidden}>
      {tab === 'home' && (
        <>
          <Section title="Phần đầu trang">
            <LocalizedField label="Tiêu đề lớn" value={hero.title} onChange={(v) => set('hero', { ...hero, title: v })} />
            <LocalizedField label="Mô tả" multiline value={hero.lead} onChange={(v) => set('hero', { ...hero, lead: v })} />
          </Section>

          <Section title="Giới thiệu giáo viên" note="Hiện ở trang chủ và trang Giới thiệu. Phần chữ nhạt nối tiếp ngay sau phần chữ đậm.">
            <LocalizedField label="Phần chữ đậm" multiline value={instructor.lead} onChange={(v) => set('instructor', { ...instructor, lead: v })} />
            <LocalizedField label="Phần chữ nhạt" multiline value={instructor.leadMuted} onChange={(v) => set('instructor', { ...instructor, leadMuted: v })} />
          </Section>

          <Section title="Con số thống kê" note="Hiện ở trang chủ và trang Giới thiệu.">
            <List
              items={draft.stats}
              onChange={(v) => set('stats', v)}
              blank={() => ({ value: '', label: blankText })}
              addLabel="Thêm con số"
              render={(stat, update) => (
                <>
                  <TextField label="Con số (ví dụ 125+)" value={stat.value} onChange={(v) => update({ ...stat, value: v })} />
                  <LocalizedField label="Nhãn" value={stat.label} onChange={(v) => update({ ...stat, label: v })} />
                </>
              )}
            />
          </Section>

          <Section title="Lợi ích của yoga" note="Hiện ở trang chủ và trang Giới thiệu.">
            <List
              items={draft.benefits}
              onChange={(v) => set('benefits', v)}
              blank={() => ({ title: blankText, body: blankText })}
              addLabel="Thêm lợi ích"
              render={(benefit, update) => (
                <>
                  <LocalizedField label="Tiêu đề" value={benefit.title} onChange={(v) => update({ ...benefit, title: v })} />
                  <LocalizedField label="Nội dung" multiline value={benefit.body} onChange={(v) => update({ ...benefit, body: v })} />
                </>
              )}
            />
          </Section>

          <Section title="Luyện tập mọi lúc, mọi nơi">
            <LocalizedField label="Dòng chữ dưới nút play" value={practice.caption} onChange={(v) => set('practice', { caption: v })} />
          </Section>
        </>
      )}

      {tab === 'about' && (
        <>
          <Section title="Câu chuyện">
            <LocalizedField label="Câu mở đầu" multiline value={about.lead} onChange={(v) => set('about', { ...about, lead: v })} />
            <List
              items={about.story}
              onChange={(v) => set('about', { ...about, story: v })}
              blank={() => ({ ...blankText })}
              addLabel="Thêm đoạn văn"
              render={(paragraph, update) => <LocalizedField label="Đoạn văn" multiline value={paragraph} onChange={update} />}
            />
          </Section>

          <Section title="Cảm nhận học viên">
            <List
              items={draft.testimonials}
              onChange={(v) => set('testimonials', v)}
              blank={() => ({ quote: blankText, name: '', since: '' })}
              addLabel="Thêm cảm nhận"
              render={(item, update) => (
                <>
                  <LocalizedField label="Lời cảm nhận" multiline value={item.quote} onChange={(v) => update({ ...item, quote: v })} />
                  <TextField label="Tên học viên" value={item.name} onChange={(v) => update({ ...item, name: v })} />
                  <TextField label="Học từ năm" value={item.since} onChange={(v) => update({ ...item, since: v })} />
                </>
              )}
            />
          </Section>
        </>
      )}

      {tab === 'contact' && (
        <>
          <Section title="Liên hệ">
            <TextField label="Số điện thoại" value={contact.phone} onChange={(v) => set('contact', { ...contact, phone: v })} />
            <TextField label="Email" type="email" value={contact.email} onChange={(v) => set('contact', { ...contact, email: v })} />
            <LocalizedField label="Lời nhắn" multiline value={contact.note} onChange={(v) => set('contact', { ...contact, note: v })} />
          </Section>

          <Section title="Mạng xã hội" note="Dán đường dẫn đầy đủ, bắt đầu bằng https://. Để trống thì ẩn khỏi chân trang.">
            <TextField label="Facebook" type="url" value={social.facebook} onChange={(v) => set('social', { ...social, facebook: v })} />
            <TextField label="Instagram" type="url" value={social.instagram} onChange={(v) => set('social', { ...social, instagram: v })} />
            <TextField label="YouTube" type="url" value={social.youtube} onChange={(v) => set('social', { ...social, youtube: v })} />
          </Section>
        </>
      )}

      <SaveBar status={status} />
    </form>
  );
}
