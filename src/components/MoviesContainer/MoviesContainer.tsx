import { useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { MovieProps } from '../../shared-types/movie';
import { useFetch } from '../../hooks/useFetch';
import { DataProps } from '../../shared-types/data';
import MovieAndTvCard from '../MovieAndTvCard/MovieAndTvCard';
import Wrapper from '../Wrapper/Wrapper';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

import './MoviesContainer.css';

type MoviesContainerProps = {
  url: string;
  title: string;
};

const MoviesContainer = ({ title, url }: MoviesContainerProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetch<DataProps>(`${url}&page=${page}`);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <Wrapper>
      {data !== undefined && (
        <div className="container">
          <h2 className="title">{title}</h2>
          <div className="movies-container">
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
                  color="primary"
                  variant="outlined"
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default MoviesContainer;
