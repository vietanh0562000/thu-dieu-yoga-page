import { Link, useLoaderData, useSearchParams } from 'react-router';
import { Icon } from '../components/Icon';
import { STYLE_LABEL, totalMinutes, type Course, type Level, type YogaStyle } from '../lib/courses';
import { useT } from '../i18n';
import { PageHero } from '../layout/PageHero';
import './Classes.css';

type Filter = 'all' | Level | YogaStyle;
const FILTERS: Filter[] = ['all', 'beginner', 'intermediate', 'advanced', 'hatha', 'vinyasa', 'yin'];
const isStyle = (f: Filter): f is YogaStyle => f in STYLE_LABEL;

export function Classes() {
  const { t } = useT();
  const all = useLoaderData() as Course[];
  const [params, setParams] = useSearchParams();
  const requested = params.get('filter') as Filter;
  const filter = FILTERS.includes(requested) ? requested : 'all';
  const courses = all.filter((c) => filter === 'all' || c.level === filter || c.style === filter);
  const label = (f: Filter) => (f === 'all' ? t('level.all') : isStyle(f) ? STYLE_LABEL[f] : t(`level.${f}` as const));

  return (
    <>
      <PageHero title={t('page.classes')}>
        <p className="page-hero__lead">{t('classes.lead')}</p>
      </PageHero>
      <main className="page catalog">
        <div className="catalog__heading">
          <div className="catalog__pill">{t('classes.filter')}</div>
          <h2 className="catalog__title">{t('classes.subtitle')}</h2>
          <p className="catalog__lead">{t('classes.subtitleLead')}</p>
        </div>

        <div className="chips" role="group" aria-label={t('classes.filter')}>
          {FILTERS.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setParams(f === 'all' ? {} : { filter: f }, { replace: true })}>
              {label(f)}
            </button>
          ))}
        </div>

        {courses.length ? (
          <div className="course-list">
            {courses.map((c, i) => (
              <CourseRow key={c.slug} course={c} index={i + 1} />
            ))}
          </div>
        ) : (
          <p className="muted">{t('classes.empty')}</p>
        )}
      </main>
    </>
  );
}

function CourseRow({ course, index }: { course: Course; index: number }) {
  const { t, tl } = useT();
  const mins = totalMinutes(course);
  return (
    <Link to={`/classes/${course.slug}`} className="course-row">
      <span className="course-row__num">{String(index).padStart(2, '0')}</span>
      <div className="course-row__info">
        <h3 className="course-row__title">{tl(course.title)}</h3>
        <p className="course-row__summary">{tl(course.summary)}</p>
      </div>
      <div className="course-row__image">
        {course.cover_path && (
          <img src={course.cover_path} alt="" loading="lazy" onError={(e) => (e.currentTarget.hidden = true)} />
        )}
      </div>
      <div className="course-row__meta">
        <div className="course-row__meta-col">
          <span className="course-row__label">{t('classes.levelLabel')}</span>
          <span className="course-row__value">{t(`level.${course.level}` as const)}</span>
        </div>
        <div className="course-row__meta-col">
          <span className="course-row__label">{t('classes.durationLabel')}</span>
          <span className="course-row__value">{mins} {t('unit.min')}</span>
        </div>
      </div>
      <span className="course-row__arrow" aria-hidden="true">
        <Icon name="arrow-right" size={20} />
      </span>
    </Link>
  );
}
