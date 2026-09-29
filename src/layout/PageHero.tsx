import type { ReactNode } from 'react';
import { usePageTitle } from '../i18n';

export function PageHero({ title, children }: { title: string; children?: ReactNode }) {
  usePageTitle(title);
  return (
    <section className="page-hero">
      <div className="page-hero__body">
        <h1 className="page-hero__title">{title}</h1>
        {children}
      </div>
    </section>
  );
}
