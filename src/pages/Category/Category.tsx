import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';
import Wrapper from '../../components/Wrapper/Wrapper';

const searchGenres = import.meta.env.VITE_DISCOVER;
const apiKey = import.meta.env.VITE_API_KEY;

const Category = () => {
  // const [movies, setMovies] = useState([]);
  const [genresParams] = useSearchParams();
  const query = genresParams.get('q');
  const categoryValue = localStorage.getItem('category');

  useEffect(() => {
  }, [query]);
  const genresQueryUrl = `${searchGenres}?${apiKey}&with_genres=${query}&language=pt-BR`;

  return (
    <Wrapper>
      <div className="container">
        <h2 className="title">
          <span>Filmes com a categoria: </span>
          <span className="query-text">{categoryValue}</span>
        </h2>
        <MoviesContainer url={genresQueryUrl} query={query}/>
      </div>
    </Wrapper>
  );
};

export default Category;
