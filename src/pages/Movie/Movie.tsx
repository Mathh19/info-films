import { useParams } from 'react-router-dom';
import { MovieProps } from '../../shared-types/movie';
import TrailerModal from '../../components/Modal/Modal';
import Credits from '../../components/Credits/Credits';
import { useFetch } from '../../hooks/useFetch';

import './Movie.css';
import Loading from '../../components/Loading/Loading';
import { TrailerProps } from '../../shared-types/trailer';
import { IoStar } from 'react-icons/io5';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { convertMinutesToHours } from '../../utils/convert-minutes-to-hours';
import { formatCurrency } from '../../utils/format-currency';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const { data: movie, isLoading } = useFetch<MovieProps>(
    `${moviesUrl}/movie/${id}?${apiKey}&language=pt-BR`,
  );
  const imageBackdrop = `${imageUrl}/original${movie?.backdrop_path}`;
  const { data: trailer } = useFetch<TrailerProps>(
    `${moviesUrl}/movie/${id}/videos?${apiKey}&language=pt-BR`,
  );

  const trailerKey = trailer?.results[0]?.key;

  if (isLoading) return <Loading />;

  return (
    <div className="movie-page">
      {movie && (
        <>
          <section
            className="container-movie background-movie"
            style={{
              backgroundImage: `url(${
                movie.backdrop_path === null
                  ? '/no-background-image.svg'
                  : imageBackdrop
              })`,
            }}
          >
            <div className="background-info">
              <div className="info-movie">
                <div className="movie-card">
                  <img
                    src={
                      movie.poster_path === null
                        ? '/no-image.svg'
                        : `${imageUrl}/w500${movie.poster_path}`
                    }
                    alt={`${movie.name}`}
                  />
                  {trailerKey && (
                    <span>
                      {' '}
                      <TrailerModal trailerKey={trailerKey} />
                    </span>
                  )}
                </div>
                <div className="infos">
                  <h2>{movie.title}</h2>
                  <div className="container-average">
                    <IoStar />{' '}
                    <span>
                      {`${movie.vote_average.toFixed(1)}/10 (${
                        movie.vote_count
                      })`}
                    </span>
                  </div>
                  <div className="container-runtime">
                    <RxCounterClockwiseClock />
                    <span>
                      {movie.runtime === 0
                        ? '-'
                        : convertMinutesToHours(movie.runtime)}
                    </span>
                  </div>
                  <div className="container-genres">
                    <h3>Genêro</h3>
                    <ul className="genres">
                      {movie.genres.length === 0 ? (
                        <li>-</li>
                      ) : (
                        movie.genres.map((genre) => (
                          <li className="genre" key={genre.id}>
                            {genre.name}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="container-overview">
                    <h3>Sinopse</h3>
                    <p>{movie.overview === '' ? '-' : movie.overview}</p>
                  </div>
                  <div>
                    <h3>Orçamento</h3>
                    {movie.budget === 0 ? (
                      <p>-</p>
                    ) : (
                      <p>{formatCurrency(movie.budget)}</p>
                    )}
                  </div>
                  <div>
                    <h3>Receita</h3>
                    {movie.revenue === 0 ? (
                      <p>-</p>
                    ) : (
                      <p>{formatCurrency(movie.revenue)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container-cast">
            <Credits id={id} isMovieOrTv="movie" />
          </section>
        </>
      )}
    </div>
  );
};

export default Movie;
