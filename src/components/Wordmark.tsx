interface WordmarkProps {
  tone?: 'dark' | 'light';
  name?: string;
  tagline?: string;
  scale?: number;
}

/** Typeset stand-in until a real logo file exists. */
export function Wordmark({ tone = 'dark', name = 'Thu Diệu Yoga', tagline = 'Meditation and yoga', scale = 1 }: WordmarkProps) {
  return (
    <div className="wordmark" style={{ color: tone === 'light' ? 'var(--white)' : 'var(--ink-900)' }}>
      <span style={{ fontSize: 17 * scale, fontWeight: 500, letterSpacing: '-0.05em' }}>{name}</span>
      {tagline && (
        <span style={{ fontSize: 7 * scale, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 3 * scale }}>
          {tagline}
        </span>
      )}
    </div>
  );
}
