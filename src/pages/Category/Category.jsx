import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';

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
    const genresQueryUrl = `${searchGenres}?${apiKey}&with_genres=${query}&language=pt-BR`;
    getMoviesPerGenres(genresQueryUrl);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        {movies.length > 0 && <span>Filmes com a categoria: </span>}
        <span className="query-text">{categoryValue}</span>
      </h2>
      <MoviesContainer movies={movies} />
    </div>
  );
};

export default Category;
