import { GenreProps } from './genre';

export type MovieProps = {
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  budget: number;
  revenue: number;
  genres: GenreProps[];
  runtime: number;
  overview: string;
  media_type: string;
  title: string;
  name: string;
  id: number;
  vote_average: number;
  vote_count: number;
};
