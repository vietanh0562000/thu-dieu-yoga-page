import { MobileNav } from '../components/MobileNav';
import { NavBar } from '../components/NavBar';
import { useT } from '../i18n';

export function SiteHeader() {
  const { t, lang, setLang } = useT();
  const links = [
    { to: '/classes', label: t('nav.classes') },
    { to: '/about', label: t('nav.about') },
    { to: '/login', label: t('nav.login') },
  ];
  const cta = { to: '/classes', label: t('nav.cta') };
  const other = lang === 'vi' ? 'en' : 'vi';
  const langSwitch = (
    <button type="button" className="glass lang-switch" aria-label={t('lang.switch')} lang={other} onClick={() => setLang(other)}>
      {other.toUpperCase()}
    </button>
  );

  return (
    <header className="site-header">
      <div className="site-header__desktop">
        <NavBar links={links} cta={cta} extra={langSwitch} />
      </div>
      <div className="site-header__mobile">
        <MobileNav links={links} cta={cta} extra={langSwitch} menuLabel={t('nav.menu')} />
      </div>
    </header>
  );
}
