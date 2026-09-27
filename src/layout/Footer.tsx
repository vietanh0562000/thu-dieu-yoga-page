import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Wordmark } from '../components/Wordmark';
import { SITE } from '../content';
import { useT } from '../i18n';


export function Footer() {
  const { t } = useT();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <Wordmark tone="light" scale={1.05} />
          <p className="site-footer__tagline">{t('footer.tagline')}</p>
        </div>
        <div>
          <div className="site-footer__heading">{t('footer.links')}</div>
          <ul className="site-footer__list">
            <li><Link to="/classes">{t('nav.classes')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/login">{t('nav.login')}</Link></li>
          </ul>
        </div>
        <div>
          <div className="site-footer__heading">{t('footer.follow')}</div>
          <ul className="site-footer__list">
            {SITE.social.map((s) => (
              <li key={s.icon}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <Icon name={s.icon} set="brand" size={19} color="var(--white)" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="site-footer__legal">© {new Date().getFullYear()} Thu Diệu Yoga. {t('footer.rights')}</p>
    </footer>
  );
}
