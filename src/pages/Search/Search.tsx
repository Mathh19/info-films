import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';
import Wrapper from '../../components/Wrapper/Wrapper';

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');

  const getSearchedMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const searchQueryUrl = `${searchUrl}?${apiKey}&query=${query}&language=pt-BR`;

    getSearchedMovies(searchQueryUrl);
  }, [query]);

  return (
    <Wrapper>
      <div className="container">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
        <MoviesContainer movies={movies} />
      </div>
    </Wrapper>
  );
};

export default Search;
