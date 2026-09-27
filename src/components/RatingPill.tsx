import { Icon } from './Icon';

export function RatingPill({ count = '125+', rating = '4.9/5' }: { count?: string; rating?: string }) {
  return (
    <div className="rating-pill">
      <span className="rating-pill__avatars" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="rating-pill__avatar" />
        ))}
        <span className="rating-pill__avatar rating-pill__count">{count}</span>
      </span>
      <span className="rating-pill__value">{rating}</span>
      <span className="rating-pill__stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" set="fill" size={21} color="var(--star)" />
        ))}
      </span>
    </div>
  );
}
