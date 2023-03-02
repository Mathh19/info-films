import { MovieProps } from './movie';

export type DataProps = {
  results: MovieProps[];
  total_pages: number;
  total_results: number;
};
