import { useState, useEffect } from 'react';
import { Pagination, Stack } from '@mui/material';
import { MovieProps } from '../../shared-types/movie';
import LoadingMovies from '../LoadingMovie/LoadingMovies';
import MovieAndTvCard from '../MovieAndTvCard/MovieAndTvCard';

import './MoviesContainer.css';

type MoviesContainerProps = {
  url: string;
  query?: string | null;
}

const MoviesContainer = ({ url, query }: MoviesContainerProps) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [pages, setPages] = useState(1);

  const getBestMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setPages(data.total_pages);
    setMovies(data.results);
  };

  useEffect(() => {
    const movieUrl = `${url}&page=${page}`;

    getBestMovies(movieUrl);
  }, [page, query]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  return (
    <>
      <div className="movies-container">
        {movies.length <= 0 && <LoadingMovies />}
        {movies.length > 0 &&
          movies.map((movie: MovieProps) => <MovieAndTvCard key={movie.id} movie={movie} />)}
      </div>
      <div className="container-pagination">
        <Stack spacing={2}>
          <Pagination
            count={pages >= 50 ? 50 : pages}
            color="primary"
            variant='outlined'
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
};

export default MoviesContainer;
