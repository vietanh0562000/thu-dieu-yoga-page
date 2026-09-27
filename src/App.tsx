import { createBrowserRouter, RouterProvider } from 'react-router';
import { SiteLayout } from './layout/SiteLayout';
import { ComingSoon } from './pages/ComingSoon';
import { NotFound } from './pages/NotFound';
import { StyleGuide } from './pages/StyleGuide';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <ComingSoon title="page.home" /> },
      { path: 'classes', element: <ComingSoon title="page.classes" /> },
      { path: 'classes/:slug', element: <ComingSoon title="page.course" /> },
      { path: 'about', element: <ComingSoon title="page.about" /> },
      { path: 'login', element: <ComingSoon title="page.login" /> },
      { path: 'learn/:slug/:lessonId?', element: <ComingSoon title="page.learn" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'style-guide', element: <StyleGuide /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
