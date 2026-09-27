import type { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';

/** Forest frame at the top of inner pages: site header + page title. */
export function PageHero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <SiteHeader />
      <div className="page-hero__body">
        <h1 className="page-hero__title">{title}</h1>
        {children}
      </div>
    </section>
  );
}
