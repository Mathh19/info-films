export type Movie = {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number
}

export type TV = {
  original_name: string;
  name: string;
  first_air_date: string;
  origin_country: string[];
} & Omit<Movie, 'original_title' | 'title' | 'release_date' | 'video'>

export type MovieAndTV = Movie | TV;
