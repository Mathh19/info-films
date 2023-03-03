import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

import './MovieAndTvCard.css';
import { MovieProps } from '../../shared-types/movie';

const imageUrl = import.meta.env.VITE_IMG;

export type MovieCardProps = {
  movie: MovieProps;
};

const MovieAndTvCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <Link
        to={
          movie.media_type === 'tv'
            ? `/${movie.media_type}/${movie.id}`
            : `/movie/${movie.id}`
        }
      >
        <img
          src={
            !movie.poster_path ? '/no-image.svg' : imageUrl + movie.poster_path
          }
          alt={`${movie.media_type === 'movie' ? movie.title : movie.name}`}
          className="img-movie"
        />
        {movie.media_type === 'tv' ? (
          <h2 className="title-movie" title={movie.name}>
            {movie.name}
          </h2>
        ) : (
          <h2 className="title-movie" title={movie.title}>
            {movie.title}
          </h2>
        )}
      </Link>
      <p className="container-star">
        <BsFillStarFill className="star" />
        {!movie.vote_average ? 0 : movie.vote_average.toFixed(1)}
      </p>
    </div>
  );
};

export default MovieAndTvCard;
