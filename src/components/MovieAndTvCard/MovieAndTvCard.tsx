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
      <Link to={movie.media_type === 'tv' ? `/${movie.media_type}/${movie.id}` : `/movie/${movie.id}`}>
        <img
          src={
            !movie.poster_path
              ? 'https://res.cloudinary.com/ddiiakz1t/image/upload/v1670534777/Logo-InfoFilms/no-image_ultzjy.jpg'
              : imageUrl + movie.poster_path
          }
          alt={`${movie.media_type === 'movie' ? movie.title : movie.name}`}
          className="img-movie"
        />
        {movie.media_type === 'tv' ? (
          <h2 className="title-movie">{movie.name}</h2>
        ) : (
          <h2 className="title-movie">{movie.title}</h2>
        )}
      </Link>
      <p className="container-star">
        <BsFillStarFill className="star" />{' '}
        {`${!movie.vote_average ? '0' : movie.vote_average.toFixed(1)} (${!movie.vote_count ? '0' : movie.vote_count})`}
      </p>
    </div>
  );
};

export default MovieAndTvCard;
