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
      <img
        src={
          movie.poster_path === null
            ? 'https://res.cloudinary.com/ddiiakz1t/image/upload/v1670534777/Logo-InfoFilms/no-image_ultzjy.jpg'
            : imageUrl + movie.poster_path
        }
        alt={`${movie.media_type === 'movie' ? movie.title : movie.name}`}
        className="img-movie"
      />
      {movie.media_type === 'tv' ? (
        <Link to={`/${movie.media_type}/${movie.id}`}>
          <h2 className="title-movie">{movie.name}</h2>
        </Link>
      ) : (
        <Link to={`/movie/${movie.id}`}>
          <h2 className="title-movie">{movie.title}</h2>
        </Link>
      )}
      <p className="container-star">
        <BsFillStarFill className="star" />{' '}
        {`${movie.vote_average.toFixed(1)} (${movie.vote_count})`}
      </p>
    </div>
  );
};

export default MovieAndTvCard;
