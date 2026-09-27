export function StatGroup({ items, tone = 'light' }: { items: { value: string; label: string }[]; tone?: 'light' | 'dark' }) {
  return (
    <dl className={`stats stats--${tone}`}>
      {items.map((item) => (
        <div key={item.label} className="stats__item">
          <dt className="stats__label">{item.label}</dt>
          <dd className="stats__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
