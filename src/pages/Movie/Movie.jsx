import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BiWalletAlt } from 'react-icons/bi';
import { MdTrendingUp, MdAvTimer, MdChromeReaderMode } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard/MovieCard';

import './Movie.css';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString('en-Us', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}&language=pt-BR`;
    getMovie(movieUrl);
  }, [id]);
  console.log(movie);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <div className="container-info">
            <p className="tagline">{movie.tagline}</p>
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
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
