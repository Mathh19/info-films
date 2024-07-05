import { Person, PersonCredits } from "../shared-types/person";
import { api } from "./api";

export const getPersonData = async (id: string) => {
  const response = await api.get<Person>(`person/${id}`);
  return response.data;
}

export const getPersonCreditsData = async (id: string) => {
  const response = await api.get<PersonCredits>(`person/${id}/combined_credits`);
  return response.data;
}
