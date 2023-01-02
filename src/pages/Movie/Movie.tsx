import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiWalletAlt } from 'react-icons/bi';
import { MdTrendingUp, MdAvTimer, MdChromeReaderMode } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';

import './Movie.css';
import { MovieProps } from '../../shared-types/movie';
import MovieCard from '../../components/MovieCard/MovieCard';
import Wrapper from '../../components/Wrapper/Wrapper';
import TrailerModal from '../../components/Modal/Modal';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieProps>();
  const [trailerKey, setTrailerKey] = useState('');
  const imageBackdrop = `${imageUrl}${movie?.backdrop_path}`;

  const getTrailer = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    const trailerKey = data.results[0]?.key;

    setTrailerKey(trailerKey);
  };

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number: number) => {
    return number.toLocaleString('en-Us', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}movie/${id}?${apiKey}&language=pt-BR`;
    const trailerUrl = `${moviesUrl}movie/${id}/videos?${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
    getTrailer(trailerUrl);
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <section
            className="container-background"
            style={{
              backgroundImage: `url(${movie.backdrop_path === null ? 'https://res.cloudinary.com/ddiiakz1t/image/upload/v1672601124/Logo-InfoFilms/Rectangle_1_ztqkuv.png' : imageBackdrop})`,
            }}
          >
            <div className="container-movie">
              <MovieCard movie={movie} />
            </div>
          </section>
          {trailerKey && <TrailerModal trailerKey={trailerKey} />}
          <section className="container-info">
            {movie.tagline && (<p className="tagline">{movie.tagline}</p>)}
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
