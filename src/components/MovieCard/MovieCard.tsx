import { BsFillStarFill } from 'react-icons/bs';
import { MovieProps } from '../../shared-types/movie';
import { TvProps } from '../../shared-types/tv';
import { MovieCardProps } from '../MovieAndTvCard/MovieAndTvCard';

const imageUrl = import.meta.env.VITE_IMG;


const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img
        src={imageUrl + movie.poster_path}
        alt={`${movie.name}`}
        className="img-movie"
      />
      <h2 className="title-movie">{movie.title}</h2>
      <p className="container-star">
        <BsFillStarFill className="star" />{' '}
        {`${movie.vote_average.toFixed(1)} (${movie.vote_count})`}
      </p>
    </div>
  );
};

export default MovieCard;
