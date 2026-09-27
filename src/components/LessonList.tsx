import { Link } from 'react-router';
import { Icon } from './Icon';

export interface LessonItem {
  id: string;
  title: string;
  meta: string;
  /** 'current' = now playing, 'open' = can be watched (needs `to`), 'locked' = not bought yet */
  state: 'current' | 'open' | 'locked';
  to?: string;
}

function LessonIcon({ state }: { state: LessonItem['state'] }) {
  if (state === 'locked') return <Icon name="lock-simple" set="fill" size={16} color="var(--sage-700)" />;
  if (state === 'current') return <Icon name="play" set="fill" size={16} color="var(--white)" />;
  return <Icon name="play" size={16} color="var(--forest-800)" />;
}

export function LessonList({ items }: { items: LessonItem[] }) {
  return (
    <ol className="lesson-list">
      {items.map((lesson, i) => {
        const body = (
          <>
            <span className="lesson__icon"><LessonIcon state={lesson.state} /></span>
            <span className="lesson__text">
              <span className="lesson__title">{lesson.title}</span>
              <span className="lesson__meta">{lesson.meta}</span>
            </span>
            <span className="lesson__num">{String(i + 1).padStart(2, '0')}</span>
          </>
        );
        const className = `lesson lesson--${lesson.state === 'open' ? 'link' : lesson.state === 'current' ? 'active' : 'locked'}`;
        return (
          <li key={lesson.id}>
            {lesson.to && lesson.state !== 'locked' ? (
              <Link to={lesson.to} className={className} aria-current={lesson.state === 'current' ? 'true' : undefined}>
                {body}
              </Link>
            ) : (
              <div className={className}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
