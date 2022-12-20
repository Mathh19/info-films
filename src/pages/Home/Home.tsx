import React, { useEffect, useState } from 'react';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';
import Wrapper from '../../components/Wrapper/Wrapper';
import { MovieProps } from '../../shared-types/movie';

import './Home.css';

const moviesUrl = import.meta.env.VITE_API;
const trendingMoviesRouter = import.meta.env.VITE_API_TRENDING;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [bestMovies, setBestMovies] = useState<MovieProps[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieProps[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<MovieProps[]>([]);

  const getBestRatedMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setBestMovies(data.results);
  };

  const getPopularMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setPopularMovies(data.results);
  };

  const getTrendingMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setTrendingMovies(data.results);
  };

  useEffect(() => {
    const bestRatedUrl = `${moviesUrl}movie/top_rated?${apiKey}&language=pt-BR`;
    const popularMoviesUrl = `${moviesUrl}movie/popular?${apiKey}&language=pt-BR`;
    const trendingMoviesUrl = `${trendingMoviesRouter}all/week?${apiKey}&language=pt-BR`;

    getBestRatedMovies(bestRatedUrl);
    getPopularMovies(popularMoviesUrl);
    getTrendingMovies(trendingMoviesUrl);
  }, []);

  return (
    <Wrapper>
      <section className="container">
        <h2 className="title">Em alta nesta semana</h2>
        <MoviesContainer movies={trendingMovies} />
      </section>
      <section className="container">
        <h2 className="title">Filmes com melhores avaliações</h2>
        <MoviesContainer movies={bestMovies} />
      </section>
      <section className="container">
        <h2 className="title">Filmes populares</h2>
        <MoviesContainer movies={popularMovies} />
      </section>
    </Wrapper>
  );
};

export default Home;
