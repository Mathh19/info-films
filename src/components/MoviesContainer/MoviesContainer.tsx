import { useState, useEffect } from 'react';
import { Pagination, Stack } from '@mui/material';
import { MovieProps } from '../../shared-types/movie';
import LoadingMovies from '../LoadingMovie/LoadingMovies';
import MovieAndTvCard from '../MovieAndTvCard/MovieAndTvCard';
// import { useSearchParams } from 'react-router-dom';
import Wrapper from '../Wrapper/Wrapper';

import './MoviesContainer.css';

type MoviesContainerProps = {
  url: string;
  query?: string | null;
  title: string;
};

const MoviesContainer = ({ url, title }: MoviesContainerProps) => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [pages, setPages] = useState(1);
  const [isloading, setIsLoading] = useState(false);

  const getMovies = async (url: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();

      setPages(data.total_pages);
      setMovies(data.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const movieUrl = `${url}&page=${page}`;
    getMovies(movieUrl);
  }, [page, url]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  return (
    <Wrapper>
      <div className="container">
        <h2 className="title">
          <span>{title}</span>
        </h2>
        {isloading ? (
          <LoadingMovies />
        ) : (
          <div className="movies-container">
            {movies.length > 0 &&
              movies.map((movie: MovieProps) => (
                <MovieAndTvCard key={movie.id} movie={movie} />
              ))}
          </div>
        )}
        {movies.length !== 0 && (
          <div className="container-pagination">
            <Stack spacing={2}>
              <Pagination
                className="pagination"
                count={pages >= 50 ? 50 : pages}
                color="primary"
                variant="outlined"
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default MoviesContainer;
