interface CarouselPagerProps {
  count: number;
  index: number;
  onChange: (index: number) => void;
  /** accessible names, e.g. 'Change page' and 'Page' */
  label: string;
  pageLabel: string;
  width?: number;
}

export function CarouselPager({ count, index, onChange, label, pageLabel, width = 186 }: CarouselPagerProps) {
  const segment = width / count;
  const bar = Math.min(70, segment);
  return (
    <div className="pager" style={{ width }} role="group" aria-label={label}>
      <span className="pager__bar" style={{ width: bar, left: segment * index + (segment - bar) / 2 }} />
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className="pager__hit"
          style={{ left: segment * i, width: segment }}
          aria-label={`${pageLabel} ${i + 1}`}
          aria-current={i === index ? 'true' : undefined}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}
