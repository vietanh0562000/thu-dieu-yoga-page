import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useRevalidator } from 'react-router';
import { Input, Textarea } from '../components/Input';
import { useSiteContent, type SiteContent } from '../content';
import type { Localized } from '../i18n';
import { PageHero } from '../layout/PageHero';
import { supabase } from '../lib/supabase';
import './Admin.css';

// Internal tool for the studio owner, so its labels are Vietnamese only.

export function Admin() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.rpc('is_admin').then(({ data, error }) => {
      if (error) console.error(error);
      setAllowed(data === true);
    });
  }, []);

  return (
    <>
      <PageHero title="Quản trị nội dung" />
      <main className="page">
        {allowed === null ? null : allowed ? (
          <ContentEditor />
        ) : (
          <p className="muted">Tài khoản này chưa có quyền quản trị. Xem hướng dẫn thêm quản trị viên trong supabase/admin.sql.</p>
        )}
      </main>
    </>
  );
}

const blankText: Localized = { vi: '', en: '' };

function ContentEditor() {
  const saved = useSiteContent();
  const revalidator = useRevalidator();
  const [draft, setDraft] = useState(saved);
  const [status, setStatus] = useState<'clean' | 'dirty' | 'saving' | 'saved' | 'error'>('clean');

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
    <form className="admin" onSubmit={save}>
      <Section title="Trang chủ · Phần đầu trang">
        <LocalizedField label="Tiêu đề lớn" value={hero.title} onChange={(v) => set('hero', { ...hero, title: v })} />
        <LocalizedField label="Mô tả" multiline value={hero.lead} onChange={(v) => set('hero', { ...hero, lead: v })} />
      </Section>

      <Section title="Giới thiệu giáo viên" note="Hiện ở trang chủ và trang Giới thiệu. Phần chữ nhạt nối tiếp ngay sau phần chữ đậm.">
        <LocalizedField label="Phần chữ đậm" multiline value={instructor.lead} onChange={(v) => set('instructor', { ...instructor, lead: v })} />
        <LocalizedField label="Phần chữ nhạt" multiline value={instructor.leadMuted} onChange={(v) => set('instructor', { ...instructor, leadMuted: v })} />
      </Section>

      <Section title="Con số thống kê">
        <List
          items={draft.stats}
          onChange={(v) => set('stats', v)}
          blank={{ value: '', label: blankText }}
          addLabel="Thêm con số"
          render={(stat, update) => (
            <>
              <TextField label="Con số (ví dụ 125+)" value={stat.value} onChange={(v) => update({ ...stat, value: v })} />
              <LocalizedField label="Nhãn" value={stat.label} onChange={(v) => update({ ...stat, label: v })} />
            </>
          )}
        />
      </Section>

      <Section title="Lợi ích của yoga">
        <List
          items={draft.benefits}
          onChange={(v) => set('benefits', v)}
          blank={{ title: blankText, body: blankText }}
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

      <Section title="Trang Giới thiệu">
        <LocalizedField label="Câu mở đầu" multiline value={about.lead} onChange={(v) => set('about', { ...about, lead: v })} />
        <List
          items={about.story}
          onChange={(v) => set('about', { ...about, story: v })}
          blank={blankText}
          addLabel="Thêm đoạn văn"
          render={(paragraph, update) => <LocalizedField label="Đoạn văn" multiline value={paragraph} onChange={update} />}
        />
      </Section>

      <Section title="Cảm nhận học viên">
        <List
          items={draft.testimonials}
          onChange={(v) => set('testimonials', v)}
          blank={{ quote: blankText, name: '', since: '' }}
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

      <div className="admin__bar">
        <button type="submit" className="btn btn--dark btn--lg" disabled={status === 'saving' || status === 'clean'}>
          Lưu thay đổi
        </button>
        <span role="status" className={status === 'error' ? 'admin__status admin__status--error' : 'admin__status'}>
          {{ clean: '', dirty: 'Có thay đổi chưa lưu', saving: 'Đang lưu…', saved: 'Đã lưu. Trang web đã cập nhật.', error: 'Không lưu được, vui lòng thử lại.' }[status]}
        </span>
      </div>
    </form>
  );
}

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="admin__section">
      <h2 className="admin__title">{title}</h2>
      {note && <p className="note">{note}</p>}
      {children}
    </section>
  );
}

function TextField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Input tone="light" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

/** One label, a Vietnamese and an English box side by side. */
function LocalizedField({ label, value, onChange, multiline }: { label: string; value: Localized; onChange: (v: Localized) => void; multiline?: boolean }) {
  return (
    <fieldset className="admin__field">
      <legend className="field__label">{label}</legend>
      <div className="admin__langs">
        {(['vi', 'en'] as const).map((lang) => (
          <label key={lang} className="admin__lang">
            <span className="note">{lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            {multiline ? (
              <Textarea tone="light" rows={3} value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} />
            ) : (
              <Input tone="light" value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface ListProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  blank: T;
  addLabel: string;
  render: (item: T, update: (item: T) => void) => ReactNode;
}

/** Editable list with add and remove. */
function List<T>({ items, onChange, blank, addLabel, render }: ListProps<T>) {
  return (
    <div className="admin__list">
      {items.map((item, i) => (
        <div key={i} className="admin__item">
          {render(item, (next) => onChange(items.map((x, j) => (j === i ? next : x))))}
          <button type="button" className="admin__remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            Xoá mục này
          </button>
        </div>
      ))}
      <button type="button" className="btn btn--outline btn--md admin__add" onClick={() => onChange([...items, structuredClone(blank)])}>
        {addLabel}
      </button>
    </div>
  );
}
