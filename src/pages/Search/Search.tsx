import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';
import Wrapper from '../../components/Wrapper/Wrapper';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
  }, [query]);
  const searchQueryUrl = `${searchUrl}/movie?${apiKey}&query=${query}&language=pt-BR`;

  return (
    <Wrapper>
      <div className="container">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
        <MoviesContainer url={searchQueryUrl} />
      </div>
    </Wrapper>
  );
};

export default Search;
