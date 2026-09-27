import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { Wordmark } from '../components/Wordmark';
import { useSiteContent } from '../content';
import { useT } from '../i18n';


const SOCIAL = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'youtube', label: 'YouTube' },
] as const;

export function Footer() {
  const { t } = useT();
  const { social } = useSiteContent();
  // Links typed in the admin page; only real web addresses are shown.
  const profiles = SOCIAL.filter((s) => /^https?:\/\//.test(social[s.key]));
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
        {profiles.length > 0 && (
          <div>
            <div className="site-footer__heading">{t('footer.follow')}</div>
            <ul className="site-footer__list">
              {profiles.map((s) => (
                <li key={s.key}>
                  <a href={social[s.key]} target="_blank" rel="noreferrer">
                    <Icon name={s.key} set="brand" size={19} color="var(--white)" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="site-footer__legal">© {new Date().getFullYear()} Thu Diệu Yoga. {t('footer.rights')}</p>
    </footer>
  );
}
