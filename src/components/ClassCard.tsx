import { Link } from 'react-router';
import { Icon } from './Icon';

interface ClassCardProps {
  title: string;
  meta: string;
  to: string;
  image?: string;
}

/** The whole card is clickable through the title link. */
export function ClassCard({ title, meta, to, image }: ClassCardProps) {
  return (
    <article className="class-card card-hover fade-in-up stagger-item">
      <div className="class-card__media">
        {/* hide a missing photo so the sage placeholder shows instead of a broken image */}
        {image && <img src={image} alt="" onError={(e) => (e.currentTarget.hidden = true)} />}
      </div>
      <div className="class-card__footer">
        <div>
          <div className="class-card__meta">{meta}</div>
          <Link to={to} className="class-card__title class-card__link">{title}</Link>
        </div>
        <span className="icon-btn icon-btn--dark class-card__arrow" aria-hidden="true">
          <Icon name="arrow-right" size={22} />
        </span>
      </div>
    </article>
  );
}
