import { JSX } from 'react';
import { htmlProblems, normalizeProblemUrl } from '../Problem.ts';
import { App, AppProps } from '../App.tsx';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

/** Redirects to `404` for invalid problems URLs */
export const appLoader: LoaderFunction = ({ params }) => {
  const { problemUrl } = params;
  if (problemUrl === undefined) {
    // TODO: pass the original URL as context
    // TODO: show it in the problem area, not as the whole page
    throw new Response('Not Found', { status: 404 });
  }

  const problemNo = htmlProblems.findIndex(
    (p) => p.url === normalizeProblemUrl(problemUrl),
  );

  if (problemNo === -1) {
    // TODO: same as above
    throw new Response('Not Found', { status: 404 });
  }

  const problem = htmlProblems[problemNo]!;
  return { problemNo, problem } as AppProps;
};

/** Just creates the `App`.*/
export const AppElement = (): JSX.Element => {
  const props = useLoaderData() as AppProps;
  return App(props);
};
