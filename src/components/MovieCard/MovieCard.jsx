import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

import './MovieCard.css';

const imageUrl = import.meta.env.VITE_IMG;

console.log(imageUrl);

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <img
        src={imageUrl + movie.poster_path}
        alt={movie.title}
        className="img-movie"
      />
      <h2 className="title-movie">{movie.title}</h2>
      <p className="container-star">
        <BsFillStarFill className="star" />{' '}
        {`${movie.vote_average.toFixed(1)} (${movie.vote_count})`}
      </p>
      {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  );
};

export default MovieCard;
