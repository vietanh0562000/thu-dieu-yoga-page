import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import { BenefitList } from '../components/BenefitList';
import { CarouselPager } from '../components/CarouselPager';
import { ClassCard } from '../components/ClassCard';
import { ContactChip } from '../components/ContactChip';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { Input, Textarea } from '../components/Input';
import { PlayButton } from '../components/PlayButton';
import { RatingPill } from '../components/RatingPill';
import { StatGroup } from '../components/StatGroup';
import { useSiteContent } from '../content';
import { courseMeta, type Course } from '../lib/courses';
import { usePageTitle, useT } from '../i18n';
import { SiteHeader } from '../layout/SiteHeader';
import './Home.css';

export function Home() {
  usePageTitle();
  const courses = useLoaderData() as Course[];
  return (
    <>
      <Hero />
      <main>
        <Instructor />
        <CoursesCarousel courses={courses} />
        <Practice />
        <Contact />
      </main>
    </>
  );
}

function Hero() {
  const { t, tl } = useT();
  const { hero, stats } = useSiteContent();
  return (
    <section className="hero">
      <div className="hero__photo" />
      <SiteHeader />
      <div className="hero__body">
        <RatingPill />
        <h1 className="hero__title fade-in-up">{tl(hero.title)}</h1>
        <p className="hero__lead fade-in-up">{tl(hero.lead)}</p>
        <div className="hero__actions fade-in-up">
          <Link to="/classes" className="btn btn--light btn--lg">{t('home.join')}</Link>
          <a href="#practice" className="btn btn--outline-light btn--lg">
            <Icon name="play" size={22} />
            {t('home.watch')}
          </a>
        </div>
      </div>
      <div className="hero__stats">
        <StatGroup items={stats.map((s) => ({ value: s.value, label: tl(s.label) }))} />
      </div>
    </section>
  );
}

function Instructor() {
  const { t, tl } = useT();
  const { instructor, benefits } = useSiteContent();
  return (
    <section className="section instructor fade-in-up">
      <div className="instructor__copy">
        <Eyebrow>{t('home.instructorEyebrow')}</Eyebrow>
        <p className="statement">
          {tl(instructor.lead)}
          <span className="statement__muted">{tl(instructor.leadMuted)}</span>
        </p>
        <BenefitList items={benefits.map((b) => ({ title: tl(b.title), body: tl(b.body) }))} />
        <Link to="/about" className="btn btn--primary btn--md">{t('home.aboutMore')}</Link>
      </div>
      <div className="photo instructor__photo" role="img" aria-label="Thu Diệu" />
    </section>
  );
}

function CoursesCarousel({ courses }: { courses: Course[] }) {
  const { t, tl } = useT();
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  // Pages come from the scroll track itself, so the CSS decides how many cards fit per page.
  const measure = () => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  };
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const goTo = (i: number) => {
    const el = track.current!;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="section fade-in-up">
      <Eyebrow>{t('home.classesEyebrow')}</Eyebrow>
      <div className="section__head">
        <h2 className="section__title">{t('home.classesTitle')}</h2>
        <Link to="/classes" className="btn btn--outline btn--md">{t('home.allClasses')}</Link>
      </div>
      <div ref={track} className="carousel" onScroll={measure}>
        {courses.map((c) => (
          <div key={c.slug} className="carousel__item">
            <ClassCard title={tl(c.title)} meta={courseMeta(c, t)} to={`/classes/${c.slug}`} image={c.cover_path ?? undefined} />
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="carousel__pager">
          <CarouselPager count={pages} index={page} onChange={goTo} label={t('pager.label')} pageLabel={t('pager.page')} />
        </div>
      )}
    </section>
  );
}

function Practice() {
  const { t, tl } = useT();
  const { practice } = useSiteContent();
  const navigate = useNavigate();
  return (
    <section id="practice" className="practice fade-in-up">
      {/* ponytail: opens the catalogue; switch to an intro video in <VideoPlayer> once there is one */}
      <PlayButton size="min(590px, 72vw)" label={t('home.practiceAction')} onClick={() => navigate('/classes')} />
      <p className="practice__caption">{tl(practice.caption)}</p>
    </section>
  );
}

function Contact() {
  const { t, tl } = useT();
  const { contact } = useSiteContent();

  // ponytail: opens the visitor's mail app; move to a Supabase table if messages should land in the dashboard
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get('message')}\n\n${f.get('name')} · ${f.get('phone')} · ${f.get('email')}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(t('form.subject'))}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="contact fade-in-up">
      <div className="contact__intro">
        <Eyebrow tone="light">{t('home.contactEyebrow')}</Eyebrow>
        <h2 className="contact__title">
          <span>{t('home.connect1')}</span> <span>{t('home.connect2')}</span>
        </h2>
        <p className="contact__note">{tl(contact.note)}</p>
        <div className="contact__chips">
          <ContactChip icon="phone" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</ContactChip>
          <ContactChip icon="envelope-simple" href={`mailto:${contact.email}`}>{contact.email}</ContactChip>
        </div>
      </div>
      <form className="contact__form" onSubmit={send}>
        <Input name="name" placeholder={t('form.name')} aria-label={t('form.name')} autoComplete="name" required />
        <Input name="phone" type="tel" placeholder={t('form.phone')} aria-label={t('form.phone')} autoComplete="tel" />
        <Input name="email" type="email" placeholder={t('form.email')} aria-label={t('form.email')} autoComplete="email" />
        <Textarea name="message" placeholder={t('form.message')} aria-label={t('form.message')} required />
        <button type="submit" className="btn btn--tint btn--lg btn--full contact__send">{t('form.send')}</button>
      </form>
    </section>
  );
}
