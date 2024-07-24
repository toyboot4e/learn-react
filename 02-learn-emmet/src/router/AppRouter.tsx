import { JSX } from 'react';
import { htmlProblems, normalizeProblemUrl } from '../Problem.ts';
import { App, AppProps } from '../App.tsx';
import { redirect, useLoaderData } from 'react-router-dom';

/** Redirects to `404` for invalid problems URLs */
export const appLoader = ({ params }: { params: { problemUrl: string } }) => {
  // which type is preferable?:
  // export const appLoader: LoaderFunction = ({ params }) => {
  const { problemUrl } = params;
  if (problemUrl === undefined) {
    return redirect('/404');
  }

  const problemNo = htmlProblems.findIndex(
    (p) => p.url === normalizeProblemUrl(problemUrl),
  );

  if (problemNo === -1) {
    // TODO: do not redirect, but return 404
    // TODO: pass original URL as context
    return redirect('/404');
  }

  const problem = htmlProblems[problemNo]!;
  return { problemNo, problem } as AppProps;
};

/** Just creates the `App`.*/
export const AppElement = (): JSX.Element => {
  const props = useLoaderData() as AppProps;
  return App(props);
};
