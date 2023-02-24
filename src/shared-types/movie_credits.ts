export type MovieCreditsProps = {
  id: number;
  cast: [
    {
      id: number;
      original_title: string;
      title: string;
      character: string;
      release_date: string;
    },
  ];
  crew: [
    {
      id: number;
      original_title: string;
      title: string;
      job: string;
      release_date: string;
    },
  ];
};
