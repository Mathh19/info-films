import { App } from "./app";
import { ErrorPage } from "./pages/error-page";
import { Home } from "./pages/home/home";
import { Trending } from "./pages/all/trending";
import { Popular } from "./pages/all/popular";
import { TopRated } from "./pages/all/top-rated";
import { RouteObject } from "react-router-dom";
import { Search } from "./pages/search";
import { Movie } from "./pages/movie";
import { Tv } from "./pages/tv";
import { PersonMovie } from "./pages/person/movie";

export const routers = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
      {
        path: "tv/:id",
        element: <Tv />,
      },
      {
        path: "all",
        children: [
          {
            path: "trending",
            element: <Trending />,
          },
          {
            path: "popular",
            element: <Popular />,
          },
          {
            path: "top-rated",
            element: <TopRated />,
          },
        ],
      },
      {
        path: "person",
        children: [
          {
            path: "movie/:id",
            element: <PersonMovie />,
          },
        ],
      },
    ],
  },
] as RouteObject[];
