import { useState } from 'react';

/** Numbered list where one item at a time is open. */
export function BenefitList({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="benefits">
      {items.map((item, i) =>
        i === open ? (
          <div key={i} className="benefits__open">
            <div className="benefits__title">{item.title}</div>
            <p className="benefits__body">{item.body}</p>
          </div>
        ) : (
          <button key={i} type="button" className="benefits__item" aria-expanded="false" onClick={() => setOpen(i)}>
            <span className="benefits__num">{String(i + 1).padStart(2, '0')}</span>
            {item.title}
          </button>
        ),
      )}
    </div>
  );
}
