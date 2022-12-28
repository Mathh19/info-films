import React, { useEffect, useState } from 'react';
import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';
import Wrapper from '../../components/Wrapper/Wrapper';
import { MovieProps } from '../../shared-types/movie';

import './Home.css';

const moviesUrl = import.meta.env.VITE_API;
const trendingMoviesRouter = import.meta.env.VITE_API_TRENDING;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const bestRatedUrl = `${moviesUrl}movie/top_rated?${apiKey}&language=pt-BR`;
  const popularMoviesUrl = `${moviesUrl}movie/popular?${apiKey}&language=pt-BR`;
  const trendingMoviesUrl = `${trendingMoviesRouter}all/week?${apiKey}&language=pt-BR`;

  return (
    <Wrapper>
      <section className="container">
        <h2 className="title">Em alta nesta semana</h2>
        <MoviesContainer url={trendingMoviesUrl} />
      </section>
      <section className="container">
        <h2 className="title">Filmes com melhores avaliações</h2>
        <MoviesContainer url={bestRatedUrl} />
      </section>
      <section className="container">
        <h2 className="title">Filmes populares</h2>
        <MoviesContainer url={popularMoviesUrl} />
      </section>
    </Wrapper>
  );
};

export default Home;
