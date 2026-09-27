import { useState } from 'react';
import { Button } from '../components/Button';
import { ClassCard } from '../components/ClassCard';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { IconButton } from '../components/IconButton';
import { Input } from '../components/Input';
import { MobileNav } from '../components/MobileNav';
import { NavBar } from '../components/NavBar';
import { PlayButton } from '../components/PlayButton';
import './StyleGuide.css';

const SWATCHES = [
  { name: 'Paper', color: '#fafbf8', token: '--paper', use: 'Page' },
  { name: 'Sage 50', color: '#f1f8ee', token: '--sage-50', use: 'Tinted cards' },
  { name: 'Sage 100', color: '#e5ece2', token: '--sage-100', use: 'Card footers' },
  { name: 'Sage 200', color: '#cfdecb', token: '--sage-200', use: 'Photo placeholders' },
  { name: 'Sage 300', color: '#a8c8a4', token: '--sage-300', use: 'Primary action' },
  { name: 'Sage 700', color: '#4e594a', token: '--sage-700', use: 'Muted text' },
  { name: 'Forest 800', color: '#2b3a2c', token: '--forest-800', use: 'Headings' },
  { name: 'Ink 900', color: '#141a12', token: '--ink-900', use: 'Body, dark CTA, footer' },
  { name: 'Star', color: '#fcc805', token: '--star', use: 'The one accent' },
  { name: 'Error', color: '#c2553f', token: '--error', use: 'Form errors only' },
];

const CONTRAST_PAIRS: [fg: string, bg: string, label: string][] = [
  ['#141a12', '#fafbf8', 'Ink 900 on Paper'],
  ['#2b3a2c', '#fafbf8', 'Forest 800 on Paper'],
  ['#4e594a', '#fafbf8', 'Sage 700 on Paper'],
  ['#4e594a', '#e5ece2', 'Sage 700 on Sage 100'],
  ['#1e3717', '#a8c8a4', 'Button text on Sage 300'],
  ['#fdfffc', '#405940', 'White on Forest 700'],
  ['#c2553f', '#fafbf8', 'Error on Paper'],
  ['#6a8466', '#fafbf8', 'Sage 600 on Paper'],
  ['#a8aaa6', '#fafbf8', 'Gray 400 on Paper'],
];

const CHIPS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Hatha', 'Vinyasa', 'Yin'];
const NAV_LINKS = [
  { to: '/classes', label: 'Classes' },
  { to: '/about', label: 'About' },
  { to: '/login', label: 'Log In' },
];
const NAV_CTA = { to: '/classes', label: 'Book a Free Class' };

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function grade(ratio: number) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'Large text only';
  return 'Fails';
}

export function StyleGuide() {
  return (
    <div className="sg">
      <header className="sg-header">
        <Eyebrow>Style Guide · V2</Eyebrow>
        <h1 className="sg-title">Colour, Type &amp; Components</h1>
        <p className="lead">
          Rebuilt on the Thu Diệu Yoga design system.{' '}
          <span className="muted">Sage and paper carry the calm, forest and ink do the reading, and star gold is the single accent.</span>
        </p>
      </header>
      <ColourSection />
      <TypeSection />
      <ButtonsSection />
      <InputsSection />
      <CardsSection />
      <NavbarSection />
      <section className="panel feedback">
        <Eyebrow>For Your Feedback</Eyebrow>
        <p className="feedback__text">
          Three things to confirm before the pages:{' '}
          <span className="muted">light 300 headlines instead of the system’s 500, star gold as the one accent, and the new filter chip, locked card and lesson list patterns.</span>
        </p>
      </section>
    </div>
  );
}

function ColourSection() {
  return (
    <section className="sg-section">
      <Eyebrow>01 · Colour</Eyebrow>
      <div className="swatch-grid">
        {SWATCHES.map((s) => (
          <div key={s.token} className="swatch">
            <div className="swatch__chip" style={{ background: s.color }} />
            <div className="swatch__name">{s.name}</div>
            <div className="note">
              {s.token}
              <br />
              {s.use}
            </div>
          </div>
        ))}
      </div>
      <div className="panel panel--tint contrast">
        <div className="contrast__title">
          Text contrast <span className="muted">— AA needs 4.5:1 for body text, 3:1 for large headlines</span>
        </div>
        <div className="contrast__grid">
          {CONTRAST_PAIRS.map(([fg, bg, label]) => {
            const ratio = contrastRatio(fg, bg);
            return (
              <div key={label} className="contrast__item">
                <div className="contrast__sample" style={{ background: bg, color: fg }}>Aa</div>
                <div className="contrast__text">
                  <span>{label}</span>
                  <strong className={ratio >= 4.5 ? 'pass' : 'fail'}>
                    {ratio.toFixed(1)}:1 · {grade(ratio)}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
        <p className="small-muted">Gray 400 is too light for text on paper, so muted copy will use Sage 700 instead. Sage 600 is kept for large type and accents only.</p>
      </div>
    </section>
  );
}

const TYPE_ROWS = [
  { label: 'Display', spec: '300 · 116 / 0.94', className: 't-display', sample: 'Breathe, Then Begin' },
  { label: 'Heading', spec: '400 · 34 / 1.15', className: 't-heading', sample: 'Classes For Every Level' },
  { label: 'Card title', spec: '600 · 26 / 1.25', className: 't-card-title', sample: 'Morning Flow' },
];

function TypeSection() {
  return (
    <section className="sg-section">
      <Eyebrow>02 · Type</Eyebrow>
      <div className="type-specimens">
        <div className="panel panel--sage type-specimen">
          <span className="type-specimen__glyph">Aa</span>
          <span className="type-specimen__name">Hanken Grotesk</span>
          <span className="small-muted">The only typeface. Light 300 for large headlines, Regular 400 and Medium 500 for text, Semibold 600 and Bold 700 for card titles and labels. Includes Vietnamese.</span>
        </div>
        <div className="panel panel--tint type-specimen type-specimen--end">
          <span className="type-specimen__vi">ÀÁẢÃẠ Thu Diệu</span>
          <span className="muted">
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm
            <br />
            0123456789 · 4.9/5 · 125+
          </span>
        </div>
      </div>
      <div className="type-rows">
        {TYPE_ROWS.map((r) => (
          <div key={r.label} className="type-row">
            <span className="note">{r.label}<br />{r.spec}</span>
            <span className={r.className}>{r.sample}</span>
          </div>
        ))}
        <div className="type-row">
          <span className="note">Lead, two-tone<br />400 · 22 / 1.5</span>
          <span className="lead">
            A slow, grounding practice to open the hips.{' '}
            <span className="muted">Keep a block and a blanket nearby, and move at the pace of your breath.</span>
          </span>
        </div>
        <div className="type-row">
          <span className="note">Body<br />400 · 16 / 1.5</span>
          <span className="t-body">Each lesson is filmed in natural light and can be watched on any screen. Pause, rewind or pick up where you left off.</span>
        </div>
        <div className="type-row">
          <span className="note">Eyebrow<br />700 · 14 · upper</span>
          <Eyebrow>Featured Classes</Eyebrow>
        </div>
      </div>
    </section>
  );
}

function ButtonsSection() {
  const [chip, setChip] = useState(CHIPS[0]);
  return (
    <section className="sg-section">
      <Eyebrow>03 · Buttons</Eyebrow>
      <div className="row">
        <Button size="lg">Book a Free Class</Button>
        <Button variant="dark" size="lg">Start Practising</Button>
        <Button variant="outline" size="lg">Browse Classes</Button>
        <Button variant="tint" size="lg">Send Message</Button>
        <Button size="lg" disabled>Disabled</Button>
      </div>
      <div className="panel panel--forest row">
        <Button variant="light" size="lg">Join Class Now</Button>
        <Button variant="outline-light" size="lg" icon="play">Watch Demo</Button>
        <span className="on-dark-note">Light and outline-light variants sit on photography or forest.</span>
      </div>
      <div className="button-notes">
        <div><strong>Primary</strong> — sage, one per section. Dark text on sage passes AA.</div>
        <div><strong>Dark</strong> — nav CTA and forms where sage would fade into the section.</div>
        <div><strong>Outline</strong> — the quieter alternative next to a primary.</div>
        <div><strong>60px / 46px</strong> — both clear the 44px touch minimum.</div>
      </div>
      <div className="stack">
        <span className="subhead">Icon buttons &amp; play control</span>
        <div className="row row--loose">
          <IconButton label="Open" icon="arrow-right" />
          <IconButton label="Back" icon="arrow-left" variant="light" />
          <div className="panel panel--forest panel--compact row row--loose">
            <IconButton label="Email" icon="envelope-simple" iconSet="fill" variant="glass" />
            <PlayButton size={96} />
          </div>
        </div>
      </div>
      <div className="stack">
        <span className="subhead">
          Filter chips <span className="muted">— new, built from button tokens</span>
        </span>
        <div className="chips">
          {CHIPS.map((label) => (
            <button key={label} type="button" className="chip" aria-pressed={chip === label} onClick={() => setChip(label)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function InputsSection() {
  const [showPw, setShowPw] = useState(false);
  return (
    <section className="sg-section">
      <Eyebrow>04 · Inputs</Eyebrow>
      <div className="fields">
        <label className="field">
          <span className="field__label">Email</span>
          <Input tone="light" type="email" placeholder="you@example.com" />
          <span className="note">Default · click to see focus</span>
        </label>
        <label className="field">
          <span className="field__label">Password</span>
          <div className="password">
            <Input tone="light" type={showPw ? 'text' : 'password'} defaultValue="lotus2026" readOnly />
            <button type="button" className="password__toggle" onClick={() => setShowPw((v) => !v)}>
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
          <span className="note">At least 8 characters</span>
        </label>
        <label className="field">
          <span className="field__label">Email</span>
          <Input tone="light" defaultValue="thu@gmial" readOnly aria-invalid="true" />
          <span className="field__error">
            <Icon name="warning-circle" set="fill" size={16} color="var(--error)" />
            Enter a valid email, like name@example.com
          </span>
        </label>
      </div>
      <div className="alert" role="alert">
        <Icon name="warning-circle" set="fill" size={20} color="var(--error)" style={{ marginTop: 1 }} />
        <span>
          That email and password don’t match. Try again or <a href="#">reset your password</a>.
        </span>
      </div>
    </section>
  );
}

function CardsSection() {
  return (
    <section className="sg-section">
      <Eyebrow>05 · Cards</Eyebrow>
      <div className="card-grid">
        <div className="stack stack--tight">
          <ClassCard meta="Hatha · Beginner · 28 min" title="Morning Flow" to="/classes/morning-flow" />
          <span className="note">ClassCard · photo slot empty until real images arrive</span>
        </div>
        <div className="stack stack--tight">
          <div className="class-card">
            <div className="class-card__media locked">
              <span className="locked__badge">
                <Icon name="lock-simple" set="fill" size={22} color="var(--ink-900)" />
              </span>
              <span className="locked__label">Members only</span>
            </div>
            <div className="class-card__footer">
              <div>
                <div className="class-card__meta">Vinyasa · Intermediate · 45 min</div>
                <div className="class-card__title">Strength &amp; Balance</div>
              </div>
            </div>
          </div>
          <span className="note">Locked variant · new, follows ClassCard</span>
        </div>
        <div className="stack stack--tight">
          <div className="panel panel--tint testimonial">
            <div className="stars" role="img" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Icon key={i} name="star" set="fill" size={18} color="var(--star)" />
              ))}
            </div>
            <p className="testimonial__quote">“Twenty minutes before work and my back finally stopped aching.”</p>
            <div className="testimonial__author">
              <div className="avatar" />
              <div>
                <div className="testimonial__name">Hannah R.</div>
                <div className="note">Member since 2024</div>
              </div>
            </div>
          </div>
          <span className="note">Testimonial · benefit-card surface, star gold accent</span>
        </div>
      </div>
      <div className="stack lessons">
        <span className="subhead">
          Lesson list <span className="muted">— new, numbered rows with hairline dividers</span>
        </span>
        <div>
          <div className="lesson lesson--active">
            <span className="lesson__icon"><Icon name="play" set="fill" size={16} color="var(--white)" /></span>
            <div className="lesson__text">
              <span className="lesson__title">Sun Salutations</span>
              <span className="lesson__meta">Now playing · 12 min</span>
            </div>
            <span className="lesson__num">02</span>
          </div>
          <div className="lesson lesson--link">
            <span className="lesson__icon"><Icon name="play" size={16} color="var(--forest-800)" /></span>
            <div className="lesson__text">
              <span className="lesson__title">Standing Balance</span>
              <span className="lesson__meta">14 min</span>
            </div>
            <span className="lesson__num">03</span>
          </div>
          <div className="lesson lesson--locked">
            <span className="lesson__icon"><Icon name="lock-simple" set="fill" size={16} color="var(--sage-700)" /></span>
            <div className="lesson__text">
              <span className="lesson__title">Deep Hip Release</span>
              <span className="lesson__meta">Locked · 18 min</span>
            </div>
            <span className="lesson__num">04</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavbarSection() {
  return (
    <section className="sg-section">
      <Eyebrow>06 · Navbar</Eyebrow>
      <div className="hero-frame">
        <span className="hero-frame__caption">Hero photo</span>
        <div className="hero-frame__nav">
          <NavBar links={NAV_LINKS} cta={NAV_CTA} />
        </div>
      </div>
      <div className="row row--top">
        <div className="mobile-demo">
          <MobileNav links={NAV_LINKS} cta={NAV_CTA} defaultOpen />
        </div>
        <p className="small-muted mobile-demo__note">
          Desktop uses the NavBar component unchanged. On phones it collapses to the glass wordmark pill and a round menu button; the menu opens as a paper sheet with large light links and the one primary action. Tap the menu button to toggle.
        </p>
      </div>
    </section>
  );
}
