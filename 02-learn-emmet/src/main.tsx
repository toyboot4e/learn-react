export * from './App.tsx';

import { App } from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as router from 'react-router-dom';
import { Problem, htmlProblems } from './Problem.ts';
import { NotFound } from './NotFound.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { ErrorPage } from './ErrorPage.tsx';
import { appLoader, AppElement } from './router/AppRouter.tsx';

// TODO: sort imports
// TODO: source directory structure (components, pages or atomic css model)

// TODO: separate layout and the content. see also <Outlet /> and alike.

const gRouter = router.createBrowserRouter([
  // TODO: index page
  // {
  //   path: '/',
  // },
  {
    path: '/404',
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:problemUrl',
    loader: appLoader,
    element: <AppElement />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <router.RouterProvider router={gRouter} />
    </ErrorBoundary>
  </React.StrictMode>,
);
