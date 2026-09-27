import { createBrowserRouter, RouterProvider } from 'react-router';
import { SiteLayout } from './layout/SiteLayout';
import { About } from './pages/About';
import { Classes } from './pages/Classes';
import { ComingSoon } from './pages/ComingSoon';
import { CourseDetail } from './pages/CourseDetail';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { StyleGuide } from './pages/StyleGuide';

const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'classes', element: <Classes /> },
      { path: 'classes/:slug', element: <CourseDetail /> },
      { path: 'about', element: <About /> },
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
