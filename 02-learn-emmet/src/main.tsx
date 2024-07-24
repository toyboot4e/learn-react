export * from './App.tsx';

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as app from './App.tsx';
import * as router from 'react-router-dom';
import { Problem, htmlProblems } from './Problem.ts';
import { NotFound } from './NotFound.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { ErrorPage } from './ErrorPage.tsx';

// TODO: source directory structure (components, pages or atomic css model)

const gRouter = router.createBrowserRouter([
  {
    path: '/',
    element: <app.App />,
    // errorElement:
    // TODO: the problem pages should be created as a child frame (?)
    // children: [],
    errorElement: <ErrorPage />,
  },
  {
    path: ':problemUrl',
    element: <app.App />,
    // TODO: navigate to 404 on error
    // errorElement:
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
