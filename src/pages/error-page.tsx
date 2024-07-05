import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div
      id="error-page"
      className="flex min-h-svh flex-col items-center justify-center gap-9"
    >
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-xl italic text-zinc-500">
        {error.statusText || error.message}
      </p>
    </div>
  );
};
