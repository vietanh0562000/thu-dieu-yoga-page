import { Outlet, ScrollRestoration } from 'react-router';
import { Footer } from './Footer';

export function SiteLayout() {
  return (
    <>
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
}
