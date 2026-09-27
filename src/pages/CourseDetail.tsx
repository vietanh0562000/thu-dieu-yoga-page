import { Link, useParams } from 'react-router';
import { LessonList, type LessonItem } from '../components/LessonList';
import { courseMeta, getCourse, totalMinutes } from '../data/courses';
import { useT } from '../i18n';
import { PageHero } from '../layout/PageHero';
import { NotFound } from './NotFound';
import './Classes.css';

export function CourseDetail() {
  const { slug } = useParams();
  const { t, tl, formatPrice } = useT();
  const course = getCourse(slug);
  if (!course) return <NotFound />;

  const lessons: LessonItem[] = course.lessons.map((l) => ({
    id: l.id,
    title: tl(l.title),
    meta: `${t(l.isFree ? 'course.free' : 'course.locked')} · ${l.durationMin} ${t('unit.min')}`,
    state: l.isFree ? 'open' : 'locked',
    to: `/learn/${course.slug}/${l.id}`,
  }));

  return (
    <>
      <PageHero title={tl(course.title)}>
        <p className="page-hero__lead">
          {courseMeta(course, t)} · {totalMinutes(course)} {t('unit.min')}
        </p>
      </PageHero>
      <main className="page course">
        <div className="course__main">
          <p className="statement">{tl(course.summary)}</p>
          <p className="course__description">{tl(course.description)}</p>
          <h2 className="course__heading">{t('course.content')}</h2>
          <LessonList items={lessons} />
        </div>
        <aside className="course__aside">
          <div className="photo course__cover" style={course.cover ? { backgroundImage: `url(${course.cover})` } : undefined} />
          <div className="course__buy">
            <span className="note">{t('course.price')}</span>
            <span className="course__price">{formatPrice(course.priceVnd)}</span>
            {/* ponytail: phase 6 replaces this with the bank transfer dialog */}
            <Link to="/login" className="btn btn--primary btn--lg btn--full">{t('course.enroll')}</Link>
            <p className="note">{t('course.anyDevice')}</p>
          </div>
        </aside>
      </main>
    </>
  );
}
