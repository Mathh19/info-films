import { Movie, TV } from "./media";
import { Cast, Crew } from "./person";

export type MoviesResponse<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export type MovieResponse = Movie | TV;

export type TrailerResponse = {
  id: number;
  results: {
    id: string;
    name: string;
    key: string;
  }[];
}

export type CreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
