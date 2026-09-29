import { Link, useLoaderData } from 'react-router';
import { LessonList, type LessonItem } from '../components/LessonList';
import { ScrollReveal } from '../components/ScrollReveal';
import { courseMeta, totalMinutes, type Course } from '../lib/courses';
import { useT } from '../i18n';
import { PageHero } from '../layout/PageHero';
import { NotFound } from './NotFound';
import './Classes.css';

export function CourseDetail() {
  const { t, tl, formatPrice } = useT();
  const course = useLoaderData() as Course | null;
  if (!course) return <NotFound />;

  const lessons: LessonItem[] = course.lessons.map((l) => ({
    id: l.id,
    title: tl(l.title),
    meta: `${t(l.is_free ? 'course.free' : 'course.locked')} · ${l.duration_min} ${t('unit.min')}`,
    state: l.is_free ? 'open' : 'locked',
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
        <ScrollReveal direction="left">
          <div className="course__main">
            <p className="statement">{tl(course.summary)}</p>
            <p className="course__description">{tl(course.description)}</p>
            <h2 className="course__heading">{t('course.content')}</h2>
            <LessonList items={lessons} />
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.1}>
          <aside className="course__aside">
            <div className="photo course__cover" style={course.cover_path ? { backgroundImage: `url(${course.cover_path})` } : undefined} />
            <div className="course__buy">
              <span className="note">{t('course.price')}</span>
              <span className="course__price">{formatPrice(course.price_vnd)}</span>
              <Link to="/login" className="btn btn--primary btn--lg btn--full">{t('course.enroll')}</Link>
              <p className="note">{t('course.anyDevice')}</p>
            </div>
          </aside>
        </ScrollReveal>
      </main>
    </>
  );
}
