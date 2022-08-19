import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';

const searchGenres = import.meta.env.VITE_DISCOVER;
const apiKey = import.meta.env.VITE_API_KEY;

const Category = () => {
  const [movies, setMovies] = useState([]);
  const [genresParams] = useSearchParams();
  const query = genresParams.get('q');
  const categoryValue = localStorage.getItem('category');

  const getMoviesPerGenres = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const genresQueryUrl = `${searchGenres}?${apiKey}&with_genres=${query}`;
    getMoviesPerGenres(genresQueryUrl);
  }, [query]);
  return (
    <div className="container">
      <h2 className="title">
        Filmes com a categoria:{' '}
        <span className="query-text">{categoryValue}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && (
          <p className="error-search">Não encontramos essa categoria :(</p>
        )}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Category;
