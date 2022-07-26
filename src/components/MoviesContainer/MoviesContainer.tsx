import { MovieProps } from '../../shared-types/movie';
import LoadingMovies from '../LoadingMovie/LoadingMovies';
import MovieAndTvCard from '../MovieAndTvCard/MovieAndTvCard';
import './MoviesContainer.css';

type MoviesContainerProps = {
  movies: MovieProps[];
}

const MoviesContainer = ({ movies }: MoviesContainerProps) => {
  return (
    <div className="movies-container">
      {movies.length <= 0 && <LoadingMovies />}
      {movies.length > 0 &&
        movies.map((movie: MovieProps) => <MovieAndTvCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MoviesContainer;
