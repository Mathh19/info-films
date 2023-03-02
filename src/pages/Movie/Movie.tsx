import { useParams } from 'react-router-dom';
import { BiWalletAlt } from 'react-icons/bi';
import { MdTrendingUp, MdAvTimer, MdChromeReaderMode } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';
import { MovieProps } from '../../shared-types/movie';
import MovieCard from '../../components/MovieCard/MovieCard';
import TrailerModal from '../../components/Modal/Modal';
import Credits from '../../components/Credits/Credits';
import { useFetch } from '../../hooks/useFetch';

import './Movie.css';
import Loading from '../../components/Loading/Loading';
import { TrailerProps } from '../../shared-types/trailer';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useFetch<MovieProps>(
    `${moviesUrl}/movie/${id}?${apiKey}&language=pt-BR`,
  );
  const imageBackdrop = `${imageUrl}${movie?.backdrop_path}`;
  const { data: trailer } = useFetch<TrailerProps>(
    `${moviesUrl}/movie/${id}/videos?${apiKey}&language=pt-BR`,
  );

  const trailerKey = trailer?.results[0]?.key;

  const formatCurrency = (number: number) => {
    return number.toLocaleString('en-Us', {
      style: 'currency',
      currency: 'USD',
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="movie-page">
      {movie && (
        <>
          <section
            className="container-background"
            style={{
              backgroundImage: `url(${
                movie.backdrop_path === null ? '' : imageBackdrop
              })`,
            }}
          >
            <div className="container-movie">
              <MovieCard movie={movie} />
            </div>
          </section>
          {trailerKey && <TrailerModal trailerKey={trailerKey} />}
          <section className="container-info">
            <Credits id={id} isMovieOrTv="movie" />
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            <div className="info">
              <h3>
                <BiWalletAlt /> Orçamento:
              </h3>
              {movie.budget === 0 ? (
                <span>-</span>
              ) : (
                <p>{formatCurrency(movie.budget)}</p>
              )}
            </div>
            <div className="info">
              <h3>
                <MdTrendingUp /> Receita:
              </h3>
              {movie.revenue === 0 ? (
                <span>-</span>
              ) : (
                <p>{formatCurrency(movie.revenue)}</p>
              )}
            </div>
            <div className="info">
              <h3>
                <FaListUl /> Genêro:
              </h3>
              {movie.genres.map((genre) => (
                <p className="genres" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="info">
              <h3>
                <MdAvTimer /> Duração:
              </h3>
              <p>{movie.runtime} minutos</p>
            </div>
            <div className="info description">
              <h3>
                <MdChromeReaderMode /> Descrição:
              </h3>
              <p>{movie.overview}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Movie;
