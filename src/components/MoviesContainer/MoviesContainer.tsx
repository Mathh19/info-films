import { useState, useRef, useEffect } from 'react';
import { Pagination, Stack } from '@mui/material';
import { MovieProps } from '../../shared-types/movie';
import { useFetch } from '../../hooks/useFetch';
import { DataProps } from '../../shared-types/data';
import MovieAndTvCard from '../MovieAndTvCard/MovieAndTvCard';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

import './MoviesContainer.css';

type MoviesContainerProps = {
  url: string;
  title: string;
};

const MoviesContainer = ({ title, url }: MoviesContainerProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isScrolledToRight, setIsScrolledToRight] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetch<DataProps>(`${url}&page=${page}`);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  const handleScroll = () => {
    const divElement = divRef.current;
    if (divElement) {
      setIsScrolledToRight(divElement.scrollLeft === 0);
    }
  };

  useEffect(() => {
    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener('scroll', handleScroll);
      divElement.clientWidth < 1400 ? setHasScroll(false) : setHasScroll(true);
      return () => divElement.removeEventListener('scroll', handleScroll);
    }
  }, [divRef.current?.clientLeft]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {data !== undefined && (
        <div className="container">
          <h2 className="title">{title}</h2>
          <div
            ref={divRef}
            className={`movies-container ${
              hasScroll && isScrolledToRight && 'gradientEffect'
            }`}
          >
            {data.results.map((movie: MovieProps) => (
              <MovieAndTvCard key={movie.id} movie={movie} />
            ))}
          </div>
          {data.results.length !== 0 && (
            <div className="container-pagination">
              <Stack spacing={2}>
                <Pagination
                  className="pagination"
                  count={data.total_pages >= 50 ? 50 : data.total_pages}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesContainer;
