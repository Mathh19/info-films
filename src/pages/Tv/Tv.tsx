import { useState, useEffect } from 'react';
import { FaListUl } from 'react-icons/fa';
import { MdAvTimer, MdChromeReaderMode } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Credits from '../../components/Credits/Credits';
import TrailerModal from '../../components/Modal/Modal';
import TvCard from '../../components/TvCard/TvCard';
import { TvProps } from '../../shared-types/tv';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Tv = () => {
  const { id } = useParams();
  const [movieTv, setMovieTv] = useState<TvProps>();
  const [trailerKey, setTrailerKey] = useState('');
  const imageBackdrop = `${imageUrl}${movieTv?.backdrop_path}`;

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovieTv(data);
  };

  const getTrailer = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    const trailerKey = data.results[0]?.key;

    setTrailerKey(trailerKey);
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}tv/${id}?${apiKey}&language=pt-BR`;
    const trailerUrl = `${moviesUrl}tv/${id}/videos?${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
    getTrailer(trailerUrl);
  }, [id]);

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
