import { Link } from 'react-router';
import { PageHero } from '../layout/PageHero';
import { useT } from '../i18n';

export function NotFound() {
  const { t } = useT();
  return (
    <>
      <PageHero title={t('page.notFound')} />
      <main className="page">
        <Link to="/" className="btn btn--outline btn--lg">{t('common.backHome')}</Link>
      </main>
    </>
  );
}
