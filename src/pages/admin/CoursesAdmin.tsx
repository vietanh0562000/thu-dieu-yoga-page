import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useRevalidator, useSearchParams } from 'react-router';
import type { Localized } from '../../i18n';
import { STYLE_LABEL, type Level, type YogaStyle } from '../../lib/courses';
import { supabase } from '../../lib/supabase';
import { parseYouTubeId } from '../../video/source';
import {
  blankText,
  CheckboxField,
  List,
  LocalizedField,
  NumberField,
  SaveBar,
  Section,
  SelectField,
  TextField,
  useUnsavedWarning,
  type SaveStatus,
} from './fields';

interface AdminLesson {
  id: string;
  title: Localized;
  duration_min: number;
  is_free: boolean;
  /** YouTube link or ID as typed; empty = no video yet */
  youtube: string;
}

interface AdminCourse {
  id: string;
  slug: string;
  title: Localized;
  summary: Localized;
  description: Localized;
  level: Level;
  style: YogaStyle;
  price_vnd: number;
  cover_path: string | null;
  published: boolean;
  sort: number;
  lessons: AdminLesson[];
}

const LEVELS: Record<Level, string> = { beginner: 'Cơ bản', intermediate: 'Trung cấp', advanced: 'Nâng cao' };

async function loadCourses(): Promise<AdminCourse[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, summary, description, level, style, price_vnd, cover_path, published, sort, lessons(id, position, title, duration_min, is_free, lesson_videos(video_ref))')
    .order('sort')
    .order('position', { referencedTable: 'lessons' });
  if (error) throw error;
  type Row = Omit<AdminCourse, 'lessons'> & { lessons: (Omit<AdminLesson, 'youtube'> & { position: number; lesson_videos: { video_ref: string } | { video_ref: string }[] | null })[] };
  return (data as Row[]).map(({ lessons, ...course }) => ({
    ...course,
    lessons: lessons.map(({ lesson_videos, position, ...lesson }) => {
      const video = Array.isArray(lesson_videos) ? lesson_videos[0] : lesson_videos;
      return { ...lesson, youtube: video?.video_ref ?? '' };
    }),
  }));
}

/** "Yoga buổi sáng" → "yoga-buoi-sang" */
const slugify = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const newCourse = (courses: AdminCourse[]): AdminCourse => ({
  id: crypto.randomUUID(),
  slug: '',
  title: { ...blankText },
  summary: { ...blankText },
  description: { ...blankText },
  level: 'beginner',
  style: 'hatha',
  price_vnd: 0,
  cover_path: null,
  published: false,
  sort: Math.max(0, ...courses.map((c) => c.sort)) + 1,
  lessons: [],
});

export function CoursesAdmin() {
  const [params, setParams] = useSearchParams();
  const [courses, setCourses] = useState<AdminCourse[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [creating, setCreating] = useState<AdminCourse | null>(null);
  const [dirty, setDirty] = useState(false);

  const reload = useCallback(
    () =>
      loadCourses().then(setCourses, (e) => {
        console.error(e);
        setLoadFailed(true);
      }),
    [],
  );
  useEffect(() => {
    reload();
  }, [reload]);

  const selectedId = params.get('course');
  const open = (id: string | null) => {
    if (dirty && !confirm('Khoá học đang sửa có thay đổi chưa lưu. Bỏ các thay đổi đó?')) return false;
    setDirty(false);
    setParams(id ? { tab: 'courses', course: id } : { tab: 'courses' });
    return true;
  };

  if (loadFailed) return <p className="muted">Không tải được danh sách khoá học. Hãy chạy supabase/admin-courses.sql rồi tải lại trang.</p>;
  if (!courses) return null;
  const selected = creating?.id === selectedId ? creating : courses.find((c) => c.id === selectedId);

  return (
    <div className="admin-courses">
      <nav className="admin-courses__list" aria-label="Danh sách khoá học">
        {courses.map((c) => (
          <button key={c.id} type="button" className="admin-courses__item" aria-current={c.id === selectedId ? 'true' : undefined} onClick={() => open(c.id)}>
            <span className="admin-courses__name">{c.title.vi || '(chưa có tên)'}</span>
            <span className="note">
              {c.published ? 'Đang hiển thị' : 'Đang ẩn'} · {c.lessons.length} bài
            </span>
          </button>
        ))}
        <button
          type="button"
          className="btn btn--outline btn--md"
          onClick={() => {
            const course = newCourse(courses);
            if (open(course.id)) setCreating(course);
          }}
        >
          Thêm khoá học
        </button>
      </nav>

      {selected ? (
        <CourseForm
          key={selected.id}
          course={selected}
          isNew={selected === creating}
          onDirtyChange={setDirty}
          onSaved={() => reload().then(() => setCreating(null))}
          onDeleted={() => {
            setCreating(null);
            setDirty(false);
            setParams({ tab: 'courses' });
            reload();
          }}
        />
      ) : (
        <p className="muted">Chọn một khoá học để sửa, hoặc thêm khoá học mới.</p>
      )}
    </div>
  );
}

interface CourseFormProps {
  course: AdminCourse;
  isNew: boolean;
  onDirtyChange: (dirty: boolean) => void;
  onSaved: () => void;
  onDeleted: () => void;
}

function CourseForm({ course, isNew, onDirtyChange, onSaved, onDeleted }: CourseFormProps) {
  const revalidator = useRevalidator();
  const [draft, setDraft] = useState(course);
  const [status, setStatus] = useState<SaveStatus>(isNew ? 'dirty' : 'clean');
  const [error, setError] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const dirty = status === 'dirty' || status === 'error';
  useUnsavedWarning(dirty);
  useEffect(() => onDirtyChange(dirty), [dirty, onDirtyChange]);

  const set = <K extends keyof AdminCourse>(key: K, value: AdminCourse[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setStatus('dirty');
  };

  const fail = (message: string, err?: unknown) => {
    if (err) console.error(err);
    setError(message);
    setStatus('error');
  };

  const setTitle = (title: Localized) => {
    // New courses get a slug from the Vietnamese title until the admin types their own.
    if (isNew && draft.slug === slugify(draft.title.vi)) set('slug', slugify(title.vi));
    set('title', title);
  };

  const uploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    // ponytail: replaced covers stay in the bucket; clean up in Supabase → Storage if space matters
    const path = `${draft.id}/${Date.now()}.${file.name.split('.').pop()?.toLowerCase() || 'jpg'}`;
    const { error } = await supabase.storage.from('covers').upload(path, file, { contentType: file.type });
    setUploading(false);
    if (error) return fail('Không tải ảnh lên được. Chỉ nhận JPG, PNG, WebP, tối đa 5 MB.', error);
    set('cover_path', supabase.storage.from('covers').getPublicUrl(path).data.publicUrl);
  };

  // ponytail: several requests, not one transaction; a failure midway leaves what was already saved, and saving again completes it
  const save = async (e: FormEvent) => {
    e.preventDefault();
    const badVideo = draft.lessons.findIndex((l) => l.youtube.trim() && !parseYouTubeId(l.youtube));
    if (badVideo >= 0) return fail(`Bài ${badVideo + 1}: link YouTube không hợp lệ.`);
    setStatus('saving');

    const { lessons, ...fields } = draft;
    const saved = await supabase.from('courses').upsert(fields);
    if (saved.error) {
      return fail(saved.error.code === '23505' ? 'Đường dẫn (slug) này đã được dùng cho khoá học khác.' : 'Không lưu được khoá học.', saved.error);
    }

    let removeGone = supabase.from('lessons').delete().eq('course_id', draft.id);
    if (lessons.length) removeGone = removeGone.not('id', 'in', `(${lessons.map((l) => l.id).join(',')})`);
    const removed = await removeGone;
    if (removed.error) return fail('Không xoá được các bài học đã bỏ.', removed.error);

    if (lessons.length) {
      const rows = lessons.map((l, i) => ({ id: l.id, course_id: draft.id, position: i + 1, title: l.title, duration_min: l.duration_min, is_free: l.is_free }));
      const upserted = await supabase.from('lessons').upsert(rows);
      if (upserted.error) return fail('Không lưu được bài học.', upserted.error);

      const videos = lessons.flatMap((l) => {
        const ref = parseYouTubeId(l.youtube);
        return ref ? [{ lesson_id: l.id, provider: 'youtube', video_ref: ref }] : [];
      });
      const noVideo = lessons.filter((l) => !parseYouTubeId(l.youtube)).map((l) => l.id);
      if (videos.length) {
        const r = await supabase.from('lesson_videos').upsert(videos);
        if (r.error) return fail('Không lưu được link video.', r.error);
      }
      if (noVideo.length) {
        const r = await supabase.from('lesson_videos').delete().in('lesson_id', noVideo);
        if (r.error) return fail('Không lưu được link video.', r.error);
      }
    }

    setStatus('saved');
    revalidator.revalidate(); // course pages on the site show the change
    onSaved();
  };

  const remove = async () => {
    if (!confirm(`Xoá khoá học "${draft.title.vi || 'chưa có tên'}"? Không thể hoàn tác.`)) return;
    if (!isNew) {
      const { error } = await supabase.from('courses').delete().eq('id', draft.id);
      if (error) {
        return fail(error.code === '23503' ? 'Khoá học đã có đơn hàng nên không xoá được. Hãy bỏ chọn "Hiển thị trên web" để ẩn khoá học.' : 'Không xoá được khoá học.', error);
      }
      revalidator.revalidate();
    }
    onDeleted();
  };

  return (
    <form className="admin" onSubmit={save}>
      <Section title="Thông tin khoá học">
        {!isNew && draft.published && (
          <Link to={`/classes/${course.slug}`} className="admin__link" target="_blank">
            Xem trên web ↗
          </Link>
        )}
        <LocalizedField label="Tên khoá học" required value={draft.title} onChange={setTitle} />
        <TextField
          label="Đường dẫn (slug)"
          value={draft.slug}
          onChange={(v) => set('slug', v)}
          required
          pattern="[a-z0-9]+(-[a-z0-9]+)*"
          hint={`Trang khoá học sẽ ở /classes/${draft.slug || '…'}. Chỉ dùng chữ thường không dấu, số và dấu gạch ngang.`}
        />
        <LocalizedField label="Mô tả ngắn" multiline value={draft.summary} onChange={(v) => set('summary', v)} />
        <LocalizedField label="Mô tả chi tiết" multiline value={draft.description} onChange={(v) => set('description', v)} />
        <div className="admin__row">
          <SelectField label="Trình độ" value={draft.level} options={LEVELS} onChange={(v) => set('level', v)} />
          <SelectField label="Phong cách" value={draft.style} options={STYLE_LABEL} onChange={(v) => set('style', v)} />
        </div>
        <div className="admin__row">
          <NumberField label="Học phí (VND)" step={1000} value={draft.price_vnd} onChange={(v) => set('price_vnd', v)} />
          <NumberField label="Thứ tự hiển thị" value={draft.sort} onChange={(v) => set('sort', v)} />
        </div>
        <CheckboxField label="Hiển thị trên web" checked={draft.published} onChange={(v) => set('published', v)} />
      </Section>

      <Section title="Ảnh bìa">
        <div className="photo admin__cover" style={draft.cover_path ? { backgroundImage: `url(${draft.cover_path})` } : undefined} />
        <div className="admin__row admin__row--start">
          <label className="btn btn--outline btn--md">
            {uploading ? 'Đang tải lên…' : draft.cover_path ? 'Đổi ảnh' : 'Tải ảnh lên'}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="visually-hidden" onChange={uploadCover} disabled={uploading} />
          </label>
          {draft.cover_path && (
            <button type="button" className="admin__link admin__link--danger" onClick={() => set('cover_path', null)}>
              Bỏ ảnh
            </button>
          )}
        </div>
      </Section>

      <Section title="Bài học" note="Tải video lên YouTube ở chế độ Không công khai (Unlisted), rồi dán link vào đây. Chỉ người đã mua khoá học mới xem được link, trừ bài cho học thử.">
        <List
          items={draft.lessons}
          onChange={(v) => set('lessons', v)}
          blank={() => ({ id: crypto.randomUUID(), title: { ...blankText }, duration_min: 10, is_free: false, youtube: '' })}
          addLabel="Thêm bài học"
          render={(lesson, update, i) => {
            const videoId = parseYouTubeId(lesson.youtube);
            return (
              <>
                <span className="admin__item-title">Bài {i + 1}</span>
                <LocalizedField label="Tên bài" required value={lesson.title} onChange={(v) => update({ ...lesson, title: v })} />
                <div className="admin__row">
                  <NumberField label="Thời lượng (phút)" value={lesson.duration_min} onChange={(v) => update({ ...lesson, duration_min: v })} />
                  <TextField
                    label="Link hoặc ID video YouTube"
                    value={lesson.youtube}
                    onChange={(v) => update({ ...lesson, youtube: v })}
                    hint={!lesson.youtube.trim() ? 'Chưa có video' : videoId ? `ID video: ${videoId}` : 'Link không hợp lệ'}
                  />
                </div>
                <CheckboxField label="Cho học thử miễn phí" checked={lesson.is_free} onChange={(v) => update({ ...lesson, is_free: v })} />
              </>
            );
          }}
        />
      </Section>

      <SaveBar status={status} error={error}>
        <button type="button" className="admin__link admin__link--danger" onClick={remove}>
          Xoá khoá học
        </button>
      </SaveBar>
    </form>
  );
}
