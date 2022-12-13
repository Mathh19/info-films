import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

import './MovieCard.css';

const imageUrl = import.meta.env.VITE_IMG;

export type MovieProps = {
  poster_path: string;
  media_type: string;
  title: string;
  name: string;
  id: number;
  vote_average: number;
  vote_count: number;
}

export type MovieCardProps = {
  movie: MovieProps;
  showLink?: boolean;
}

const MovieCard = ({ movie, showLink = true }: MovieCardProps) => {

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
        <h2 className="title-movie">{movie.name}</h2>
      ) : (
        <h2 className="title-movie">{movie.title}</h2>
      )}
      <p className="container-star">
        <BsFillStarFill className="star" />{' '}
        {`${movie.vote_average.toFixed(1)} (${movie.vote_count})`}
      </p>
      {showLink && (
        <Link to={`/${movie.media_type === 'tv' ? 'tv' : 'movie'}/${movie.id}`}>
          Detalhes
        </Link>
      )}
    </div>
  );
};

export default MovieCard;
