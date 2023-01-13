import { GenreProps } from './genre';

export type TvProps = {
  name: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  genres: GenreProps[];
};
