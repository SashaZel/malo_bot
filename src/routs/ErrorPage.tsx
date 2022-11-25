import React from "react";
import poster from "../assets/pictures/poster_small.png";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessageCard = (
    <div className="text-4xl font-semibold">Unexpected error.</div>
  );

  if (error instanceof Error) {
    errorMessageCard = (
      <div>
        <span className="text-6xl font-bold">{error.name + " "}</span>{" "}
        <span className="text-xl font-semibold">{error.message}</span>
      </div>
    );
  }

  if (isRouteErrorResponse(error) && error.status && error.statusText) {
    errorMessageCard = (
      <div>
        <span className="text-6xl font-bold">{error.status + " "}</span>{" "}
        <span className="text-xl font-semibold">{error.statusText}</span>
      </div>
    );
  }

  return (
    <div id="error-page" className="w-10/12 2xl:w-8/12 mx-auto flex">
      <div className="mt-32 w-1/2 xl:w-1/3">
        <h2 className="text-xl">Oops...! Something went wrong.</h2>
        <div className="text-red-600 ml-12 mt-4">{errorMessageCard}</div>
        <div className="mt-12">
          <Link
            to={"/malo_bot/"}
            className="bg-neutral-200 p-4 rounded-md hover:bg-neutral-300"
          >
            Go to Main page
          </Link>
        </div>
      </div>
      <div className="w-1/2 xl:w-2/3">
        <img src={poster} alt="malo_bot poster" />
      </div>
    </div>
  );
};
