import { Outlet, ScrollRestoration } from 'react-router';
import { Footer } from './Footer';
import { SiteHeader } from './SiteHeader';

export function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
}
