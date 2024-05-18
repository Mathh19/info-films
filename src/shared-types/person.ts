export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export type Crew = {
  job: string;
} & Omit<Cast, 'character'>;
