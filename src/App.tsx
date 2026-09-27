import { createBrowserRouter, RouterProvider, type ShouldRevalidateFunctionArgs } from 'react-router';
import { RequireAuth } from './auth';
import { loadSiteContent } from './content';
import { SiteLayout } from './layout/SiteLayout';
import { getCourse, listCourses } from './lib/courses';
import { About } from './pages/About';
import { Admin } from './pages/admin/Admin';
import { Classes } from './pages/Classes';
import { ComingSoon } from './pages/ComingSoon';
import { CourseDetail } from './pages/CourseDetail';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { RouteError } from './pages/RouteError';
import { StyleGuide } from './pages/StyleGuide';

// Search-param changes (admin tabs, class filters) don't refetch; saving in the admin revalidates explicitly.
const onlyWhenAsked = ({ currentUrl, nextUrl }: ShouldRevalidateFunctionArgs) => currentUrl.href === nextUrl.href;

const router = createBrowserRouter([
  {
    id: 'root',
    element: <SiteLayout />,
    loader: loadSiteContent,
    shouldRevalidate: onlyWhenAsked,
    errorElement: <RouteError />,
    hydrateFallbackElement: <div className="boot" />,
    children: [
      { index: true, element: <Home />, loader: listCourses },
      { path: 'classes', element: <Classes />, loader: listCourses, shouldRevalidate: onlyWhenAsked },
      { path: 'classes/:slug', element: <CourseDetail />, loader: ({ params }) => getCourse(params.slug!) },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      {
        path: 'learn/:slug/:lessonId?',
        element: (
          <RequireAuth>
            <ComingSoon title="page.learn" />
          </RequireAuth>
        ),
      },
      {
        path: 'admin',
        element: (
          <RequireAuth>
            <Admin />
          </RequireAuth>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: 'style-guide', element: <StyleGuide /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
