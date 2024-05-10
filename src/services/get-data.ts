import { api } from "./api";
import { MoviesResponse } from "../shared-types/api-responses";

export const getMoviesData = async <T>(endpoint: string) => {
  const response = await api.get<MoviesResponse<T>>(endpoint);
  return response.data;
}
