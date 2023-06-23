import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

import './MovieAndTvCard.css';
import { MovieProps } from '../../shared-types/movie';

const imageUrl = import.meta.env.VITE_IMG;

export type MovieCardProps = {
  movie: MovieProps;
};

const MovieAndTvCard = ({ movie }: MovieCardProps) => {
  const altImageTvOrMovie =
    movie.media_type === 'movie' ? movie.title : movie.name;

  return (
    <Link
      to={
        movie.media_type === 'tv'
          ? `/${movie.media_type}/${movie.id}`
          : `/movie/${movie.id}`
      }
    >
      <div className="movie-card">
        <img
          src={
            !movie.poster_path ? '/no-image.svg' : imageUrl + movie.poster_path
          }
          alt={`Uma imagem da série ou filme ${
            !altImageTvOrMovie ? movie.title : altImageTvOrMovie
          }`}
          className="img-movie"
        />
        <div className="container-title">
          {movie.media_type === 'tv' ? (
            <h2 className="title-movie" title={movie.name}>
              {movie.name}
            </h2>
          ) : (
            <h2 className="title-movie" title={movie.title}>
              {movie.title}
            </h2>
          )}
          <div className="container-star">
            <BsFillStarFill className="star" />
            {!movie.vote_average ? 0 : movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieAndTvCard;
