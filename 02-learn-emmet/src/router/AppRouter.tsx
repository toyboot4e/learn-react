import { JSX } from 'react';
import { htmlProblems, normalizeProblemUrl } from '../Problem.ts';
import { App, AppProps } from '../App.tsx';
import { newRouteError } from '../ErrorPage.tsx';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

/** Redirects to `404` for invalid problems URLs */
export const appLoader: LoaderFunction = ({ params }) => {
  const { problemUrl } = params;
  if (problemUrl === undefined) {
    console.error('is it possible??');
    throw new Response('Not Found', { status: 404 });
  }

  const problemNo = htmlProblems.findIndex(
    (p) => p.slug === normalizeProblemUrl(problemUrl),
  );

  if (problemNo === -1) {
    // TODO: show it in the problem area, not as the whole page (use outlet or separate layout)
    throw newRouteError(
      {
        relativeUrl: problemUrl,
      },
      404,
    );
  }

  const problem = htmlProblems[problemNo]!;
  return { problemNo, problem } as AppProps;
};

/** Just creates the `App`.*/
export const AppElement = (): JSX.Element => {
  const props = useLoaderData() as AppProps;
  return App(props);
};
