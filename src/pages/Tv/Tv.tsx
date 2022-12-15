import { useState, useEffect } from 'react';
import { FaListUl } from 'react-icons/fa';
import { MdAvTimer, MdChromeReaderMode } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import TvCard from '../../components/TvCard/TvCard';
import { TvProps } from '../../shared-types/tv';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Tv = () => {
  const { id } = useParams();
  const [movieTv, setMovieTv] = useState<TvProps>();

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovieTv(data);
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}tv/${id}?${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
  }, [id]);
  return (
    <div className="movie-page">
      {movieTv && (
        <>
          <section
            className="container-background"
            style={{
              backgroundImage: `url(${imageUrl}${movieTv.backdrop_path})`,
            }}
          >
            <div className="container-movie">
              <TvCard tv={movieTv} />
            </div>
          </section>
          <section className="container-info">
            <p className="tagline">{movieTv.tagline}</p>
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
