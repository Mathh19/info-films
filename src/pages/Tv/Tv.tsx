import { FaListUl } from 'react-icons/fa';
import { MdAvTimer, MdChromeReaderMode } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Credits from '../../components/Credits/Credits';
import Loading from '../../components/Loading/Loading';
import TrailerModal from '../../components/Modal/Modal';
import TvCard from '../../components/TvCard/TvCard';
import { useFetch } from '../../hooks/useFetch';
import { TrailerProps } from '../../shared-types/trailer';
import { TvProps } from '../../shared-types/tv';

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
  const imageBackdrop = `${imageUrl}${movieTv?.backdrop_path}`;
  const trailerKey = trailer?.results[0]?.key;

  if (isLoading) return <Loading />;

  return (
    <div className="movie-page">
      {movieTv && (
        <>
          <section
            className="container-background"
            style={{
              backgroundImage: `url(${
                movieTv.backdrop_path === null ? '/no-image.svg' : imageBackdrop
              })`,
            }}
          >
            <div className="container-movie">
              <TvCard tv={movieTv} />
            </div>
          </section>
          {trailerKey && <TrailerModal trailerKey={trailerKey} />}
          <section className="container-info">
            <Credits id={id} isMovieOrTv="tv" />
            {movieTv.tagline && <p className="tagline">{movieTv.tagline}</p>}
            <div className="info">
              <h3>
                <FaListUl /> Genêro:
              </h3>
              {movieTv.genres.map((genre) => (
                <p className="genres" key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div className="info">
              <h3>
                <MdAvTimer /> Episódios:
              </h3>
              <p>Temporadas: {movieTv.number_of_seasons}</p>
              <p>Episódios: {movieTv.number_of_episodes}</p>
            </div>
            <div className="info description">
              <h3>
                <MdChromeReaderMode /> Descrição:
              </h3>
              <p>{movieTv.overview}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Tv;
