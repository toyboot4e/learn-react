export * from './App.tsx';

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as app from './App.tsx';
import * as router from 'react-router-dom';
import { Problem, htmlProblems } from './Problem.ts';

// TODO: <Route> を配置していくのとどっちが良い？
const gRouter = router.createBrowserRouter([
  {
    path: '/',
    element: <app.App />,
    // errorElement:
    // TODO: the problem pages should be created as a child frame (?)
    // children: [],
  },
  {
    path: ':problemUrl',
    element: <app.App />,
    // TODO: navigate to 404 on error
    // errorElement:
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <router.RouterProvider router={gRouter} />
  </React.StrictMode>,
);
