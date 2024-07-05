export type Movie = {
  backdrop_path: string | null;
  id: number;
  original_title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  adult: boolean;
  title: string;
  homepage: string;
  original_language: string;
  genre_ids: number[];
  genres: { id: number; name: string }[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
}

export type TV = {
  original_name: string;
  name: string;
  first_air_date: string;
  origin_country: string[];
  number_of_episodes: number;
  number_of_seasons: number;
} & Omit<Movie, 'original_title' | 'title' | 'release_date' | 'video' | 'runtime'>

export type MovieAndTV = Movie | TV;
