import LoadingMovies from '../LoadingMovie/LoadingMovies';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesContainer.css';

const MoviesContainer = ({ movies }) => {
  return (
    <div className="movies-container">
      {movies.length <= 0 && <LoadingMovies />}
      {movies.length > 0 &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MoviesContainer;
