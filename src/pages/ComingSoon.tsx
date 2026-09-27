import { PageHero } from '../layout/PageHero';
import { useT, type TKey } from '../i18n';

/** Stand-in for routes whose page lands in a later phase (see docs/PLAN.md). */
export function ComingSoon({ title }: { title: TKey }) {
  const { t } = useT();
  return (
    <>
      <PageHero title={t(title)} />
      <main className="page">
        <p className="muted">{t('common.comingSoon')}</p>
      </main>
    </>
  );
}
