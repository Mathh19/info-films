import { useParams } from 'react-router-dom';
import Credits from '../../components/Credits/Credits';
import Loading from '../../components/Loading/Loading';
import TrailerModal from '../../components/Modal/Modal';
import { useFetch } from '../../hooks/useFetch';
import { TrailerProps } from '../../shared-types/trailer';
import { TvProps } from '../../shared-types/tv';
import { IoStar } from 'react-icons/io5';
import { CreditsProps } from '../../shared-types/credits';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Tv = () => {
  const { id } = useParams();
  const { data: movieTv, isLoading } = useFetch<TvProps>(
    `${moviesUrl}/tv/${id}?${apiKey}&language=pt-BR`,
  );
  const { data: trailer } = useFetch<TrailerProps>(
    `${moviesUrl}/tv/${id}/videos?${apiKey}&language=pt-BR`,
  );
  const imageBackdrop = `${imageUrl}/original${movieTv?.backdrop_path}`;
  const trailerKey = trailer?.results[0]?.key;
  const { data: credits } = useFetch<CreditsProps>(
    `${moviesUrl}/tv/${id}/credits?${apiKey}&language=pt-BR`,
  );

  if (isLoading) return <Loading />;

  return (
    <div className="movie-page">
      {movieTv && (
        <>
          <section
            className="container-movie background-movie"
            style={{
              backgroundImage: `url(${
                movieTv.backdrop_path === null
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
                      movieTv.poster_path === null
                        ? '/no-image.svg'
                        : `${imageUrl}/w500${movieTv.poster_path}`
                    }
                    alt={`${movieTv.name}`}
                  />
                  {trailerKey && (
                    <span>
                      {' '}
                      <TrailerModal trailerKey={trailerKey} />
                    </span>
                  )}
                </div>
                <div className="infos">
                  <h2>{movieTv.name}</h2>
                  <div className="container-average">
                    <IoStar />{' '}
                    <span>
                      {`${movieTv.vote_average.toFixed(1)}/10 (${
                        movieTv.vote_count
                      })`}
                    </span>
                  </div>
                  <div>
                    <h3>Duração</h3>
                    <p>Temporadas {movieTv.number_of_seasons}</p>
                    <p>Episódios {movieTv.number_of_episodes}</p>
                  </div>
                  <div className="container-genres">
                    <h3>Genêro</h3>
                    <ul className="genres">
                      {movieTv.genres.map((genre) => (
                        <li className="genre" key={genre.id}>
                          {genre.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Sinopse</h3>
                    <p>{movieTv.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {credits && (
            <section className="container-cast">
              <Credits isMovieOrTv="tv" credits={credits} />
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Tv;
