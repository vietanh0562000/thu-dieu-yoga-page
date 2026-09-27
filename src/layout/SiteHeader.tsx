import { MobileNav } from '../components/MobileNav';
import { NavBar } from '../components/NavBar';
import { useAuth } from '../auth';
import { useT } from '../i18n';
import { supabase } from '../lib/supabase';

export function SiteHeader() {
  const { t, lang, setLang } = useT();
  const { session } = useAuth();
  const links = [
    { to: '/classes', label: t('nav.classes') },
    { to: '/about', label: t('nav.about') },
    ...(session ? [] : [{ to: '/login', label: t('nav.login') }]),
  ];
  const cta = { to: '/classes', label: t('nav.cta') };
  const other = lang === 'vi' ? 'en' : 'vi';
  const extra = (
    <>
      {session && (
        <button type="button" className="glass header-button" onClick={() => supabase.auth.signOut()}>
          {t('nav.logout')}
        </button>
      )}
      <button type="button" className="glass header-button lang-switch" aria-label={t('lang.switch')} lang={other} onClick={() => setLang(other)}>
        {other.toUpperCase()}
      </button>
    </>
  );

  return (
    <header className="site-header">
      <div className="site-header__desktop">
        <NavBar links={links} cta={cta} extra={extra} />
      </div>
      <div className="site-header__mobile">
        <MobileNav links={links} cta={cta} extra={extra} menuLabel={t('nav.menu')} />
      </div>
    </header>
  );
}
