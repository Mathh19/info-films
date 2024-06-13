export type Person = {
  name: string;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  profile_path: string | null;
  place_of_birth: string | null;
}

export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  release_date: string;
  first_air_date: string;
  title: string;
  media_type: 'movie' | 'tv';
}

export type Crew = {
  job: string;
  departament: string;
} & Omit<Cast, 'character'>;

export type PersonCredits = {
  cast: Cast[]
  crew: Crew[]
}
