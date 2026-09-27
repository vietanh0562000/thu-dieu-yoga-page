import { useEffect, type ReactNode } from 'react';
import { Input, Textarea } from '../../components/Input';
import type { Localized } from '../../i18n';

// Form building blocks shared by the admin tabs.

export const blankText: Localized = { vi: '', en: '' };

export function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="admin__section">
      <h2 className="admin__title">{title}</h2>
      {note && <p className="note">{note}</p>}
      {children}
    </section>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  required?: boolean;
  pattern?: string;
}

export function TextField({ label, value, onChange, type = 'text', hint, required, pattern }: TextFieldProps) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Input tone="light" type={type} value={value} required={required} pattern={pattern} onChange={(e) => onChange(e.target.value)} />
      {hint && <span className="note">{hint}</span>}
    </label>
  );
}

export function NumberField({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <Input tone="light" type="number" min={0} step={step} required value={value} onChange={(e) => onChange(e.target.valueAsNumber || 0)} />
    </label>
  );
}

export function SelectField<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Record<T, string>; onChange: (v: T) => void }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select className="input input--light" value={value} onChange={(e) => onChange(e.target.value as T)}>
        {(Object.keys(options) as T[]).map((key) => (
          <option key={key} value={key}>{options[key]}</option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="admin__check">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

/** One label, a Vietnamese and an English box side by side. */
export function LocalizedField({ label, value, onChange, multiline, required }: { label: string; value: Localized; onChange: (v: Localized) => void; multiline?: boolean; required?: boolean }) {
  return (
    <fieldset className="admin__field">
      <legend className="field__label">{label}</legend>
      <div className="admin__langs">
        {(['vi', 'en'] as const).map((lang) => (
          <label key={lang} className="admin__lang">
            <span className="note">{lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
            {multiline ? (
              <Textarea tone="light" rows={3} required={required && lang === 'vi'} value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} />
            ) : (
              <Input tone="light" required={required && lang === 'vi'} value={value[lang]} onChange={(e) => onChange({ ...value, [lang]: e.target.value })} />
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
  blank: () => T;
  addLabel: string;
  render: (item: T, update: (item: T) => void, index: number) => ReactNode;
}

/** Editable list: add, remove, move up and down. */
export function List<T>({ items, onChange, blank, addLabel, render }: ListProps<T>) {
  const move = (from: number, to: number) => {
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  };
  return (
    <div className="admin__list">
      {items.map((item, i) => (
        <div key={i} className="admin__item">
          {render(item, (next) => onChange(items.map((x, j) => (j === i ? next : x))), i)}
          <div className="admin__item-actions">
            <button type="button" className="admin__link" disabled={i === 0} onClick={() => move(i, i - 1)}>↑ Lên</button>
            <button type="button" className="admin__link" disabled={i === items.length - 1} onClick={() => move(i, i + 1)}>↓ Xuống</button>
            <button type="button" className="admin__link admin__link--danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>Xoá</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn--outline btn--md admin__add" onClick={() => onChange([...items, blank()])}>
        {addLabel}
      </button>
    </div>
  );
}

export type SaveStatus = 'clean' | 'dirty' | 'saving' | 'saved' | 'error';

/** Sticky footer with the save button and what just happened. */
export function SaveBar({ status, error, children }: { status: SaveStatus; error?: string; children?: ReactNode }) {
  const message = { clean: '', dirty: 'Có thay đổi chưa lưu', saving: 'Đang lưu…', saved: 'Đã lưu. Trang web đã cập nhật.', error: error ?? 'Không lưu được, vui lòng thử lại.' }[status];
  return (
    <div className="admin__bar">
      <button type="submit" className="btn btn--dark btn--lg" disabled={status === 'saving' || status === 'clean' || status === 'saved'}>
        Lưu thay đổi
      </button>
      {children}
      <span role="status" className={status === 'error' ? 'admin__status admin__status--error' : 'admin__status'}>{message}</span>
    </div>
  );
}

/** Asks before closing or reloading the tab while there are unsaved edits. */
export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
}
