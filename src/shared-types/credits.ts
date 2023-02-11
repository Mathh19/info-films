type Cast = {
  id: number;
  known_for_department: string;
  original_name: string;
  character: string;
  profile_path: string;
};
type Crew = {
  job: string;
} & Omit<Cast, 'character'>;

export type CreditsProps = {
  cast: Cast[];
  crew: Crew[];
};
