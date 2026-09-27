import { Link } from 'react-router';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { StatGroup } from '../components/StatGroup';
import { ABOUT_STORY, BENEFITS, STATS, TESTIMONIALS } from '../content';
import { useT } from '../i18n';
import { PageHero } from '../layout/PageHero';
import './About.css';

export function About() {
  const { t, tl } = useT();
  return (
    <>
      <PageHero title={t('page.about')}>
        <p className="page-hero__lead">{t('about.lead')}</p>
      </PageHero>
      <main>
        <section className="section story">
          <div className="photo story__photo" role="img" aria-label="Thu Diệu" />
          <div className="story__copy">
            <Eyebrow>{t('about.storyEyebrow')}</Eyebrow>
            <p className="statement">
              {t('home.instructorLead')}
              <span className="statement__muted">{t('home.instructorLeadMuted')}</span>
            </p>
            {ABOUT_STORY.map((p, i) => (
              <p key={i} className="story__text">{tl(p)}</p>
            ))}
            <StatGroup tone="dark" items={STATS.map((s) => ({ value: s.value, label: tl(s.label) }))} />
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">{t('about.benefitsTitle')}</h2>
          <div className="benefit-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="panel panel--tint benefit-card">
                <span className="benefit-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="benefit-card__title">{tl(b.title)}</h3>
                <p className="benefit-card__body">{tl(b.body)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section__title">{t('about.testimonialsTitle')}</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((q) => (
              <figure key={q.name} className="panel panel--tint testimonial">
                <div className="stars" role="img" aria-label="5/5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon key={i} name="star" set="fill" size={18} color="var(--star)" />
                  ))}
                </div>
                <blockquote className="testimonial__quote">{tl(q.quote)}</blockquote>
                <figcaption className="testimonial__author">
                  <span className="avatar" />
                  <span>
                    <span className="testimonial__name">{q.name}</span>
                    <span className="note"> · {t('about.memberSince')} {q.since}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="panel panel--sage cta-band">
            <Eyebrow>{t('about.ctaTitle')}</Eyebrow>
            <p className="statement">{t('about.ctaBody')}</p>
            <Link to="/classes" className="btn btn--primary btn--lg">{t('home.join')}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
