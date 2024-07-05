import { api } from "./api";
import { CreditsResponse, MoviesResponse, TrailerResponse } from "../shared-types/api-responses";
import { Movie, TV } from "../shared-types/media";

export const getMoviesData = async <T>(endpoint: string) => {
  const response = await api.get<MoviesResponse<T>>(endpoint);
  return response.data;
}

export const getMovieData = async (id: string) => {
  const response = await api.get<Movie>(`movie/${id}`);
  return response.data;
}

export const getTVData = async (id: string) => {
  const response = await api.get<TV>(`tv/${id}`);
  return response.data;
}

export const getTrailerData = async (mediaType: 'movie' | 'tv', id: string) => {
  const response = await api.get<TrailerResponse>(`${mediaType}/${id}/videos`);
  return response.data;
}

export const getCreditsData = async (mediaType: 'movie' | 'tv', id: string) => {
  const response = await api.get<CreditsResponse>(`${mediaType}/${id}/credits`);
  return response.data;
}

export const getMoviesByCategoryData = async (genreId: string) => {
  const response = await api.get<MoviesResponse<Movie[]>>(`discover/movie?with_genres=${genreId}`);
  return response.data;
}

export const getTvByCategoryData = async (genreId: string) => {
  const response = await api.get<MoviesResponse<TV[]>>(`discover/tv?with_genres=${genreId}`);
  return response.data;
}
