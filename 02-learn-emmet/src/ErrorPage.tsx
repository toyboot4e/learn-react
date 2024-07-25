import { useRouteError, json, isRouteErrorResponse } from 'react-router-dom';

// TODO: put them in a proper file
export type RouteErrorContext = {
  readonly relativeUrl: string;
};

export const newRouteError = (
  ctx: RouteErrorContext,
  status: number,
): Response => {
  return json(ctx, { status });
};

// FIXME: show stack trace? (development mode)
export const ErrorPage = () => {
  // FIXME: `any` sounds like absolutely unsafe?
  const error: any = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      // FIXME: cast `error.data` of type `any` to `RouteErrorContext`, but only when possible
      const data = error.data as RouteErrorContext;
      return (
        <div>
          <h1>Given unknown problem</h1>
          <p>Sorry, there's no such problem {data.relativeUrl}.</p>
        </div>
      );
    }
  }

  // FIXME: do safe cast before accessing the fields? (Response or Error)
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
