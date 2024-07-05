import { CategoryResponse } from "../shared-types/api-responses";
import { api } from "./api";

export const getCategoriesData = async (mediaType: 'movie' | 'tv') => {
  const response = await api.get<CategoryResponse>(`genre/${mediaType}/list`);
  return response.data;
}
