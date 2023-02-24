export type TvCreditsProps = {
  id: number;
  cast: [
    {
      id: number;
      original_name: string;
      name: string;
      character: string;
      episode_count: number;
      first_air_date: string;
    },
  ];
  crew: [
    {
      id: number;
      original_name: string;
      name: string;
      job: string;
      first_air_date: string;
    },
  ];
};
