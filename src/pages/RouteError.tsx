import { useRouteError } from 'react-router';
import { useT } from '../i18n';
import { PageHero } from '../layout/PageHero';

/** Shown when a page's data fails to load (network, Supabase down). */
export function RouteError() {
  const { t } = useT();
  console.error(useRouteError());
  return (
    <>
      <PageHero title={t('error.title')} />
      <main className="page">
        <p className="muted">{t('error.body')}</p>
        <button type="button" className="btn btn--outline btn--lg" onClick={() => location.reload()}>
          {t('error.retry')}
        </button>
      </main>
    </>
  );
}
