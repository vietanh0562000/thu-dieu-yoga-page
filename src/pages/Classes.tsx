import { useLoaderData, useSearchParams } from 'react-router';
import { ClassCard } from '../components/ClassCard';
import { courseMeta, STYLE_LABEL, type Course, type Level, type YogaStyle } from '../lib/courses';
import { useT } from '../i18n';
import { PageHero } from '../layout/PageHero';
import './Classes.css';

type Filter = 'all' | Level | YogaStyle;
const FILTERS: Filter[] = ['all', 'beginner', 'intermediate', 'advanced', 'hatha', 'vinyasa', 'yin'];
const isStyle = (f: Filter): f is YogaStyle => f in STYLE_LABEL;

export function Classes() {
  const { t, tl } = useT();
  const all = useLoaderData() as Course[];
  // The filter lives in the URL so it survives reloads, back and shared links.
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
        <div className="chips" role="group" aria-label={t('classes.filter')}>
          {FILTERS.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setParams(f === 'all' ? {} : { filter: f }, { replace: true })}>
              {label(f)}
            </button>
          ))}
        </div>
        {courses.length ? (
          <div className="course-grid">
            {courses.map((c) => (
              <ClassCard key={c.slug} title={tl(c.title)} meta={courseMeta(c, t)} to={`/classes/${c.slug}`} image={c.cover_path ?? undefined} />
            ))}
          </div>
        ) : (
          <p className="muted">{t('classes.empty')}</p>
        )}
      </main>
    </>
  );
}
