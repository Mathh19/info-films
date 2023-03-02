import MoviesContainer from '../../components/MoviesContainer/MoviesContainer';

const moviesUrl = import.meta.env.VITE_API;
const trendingMoviesRouter = import.meta.env.VITE_API_TRENDING;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const bestRatedUrl = `${moviesUrl}/movie/top_rated?${apiKey}&language=pt-BR`;
  const popularMoviesUrl = `${moviesUrl}/movie/popular?${apiKey}&language=pt-BR`;
  const trendingMoviesUrl = `${trendingMoviesRouter}/all/week?${apiKey}&language=pt-BR`;

  return (
    <div>
      <section>
        <MoviesContainer url={trendingMoviesUrl} title="Em alta nesta semana" />
      </section>
      <section>
        <MoviesContainer
          url={bestRatedUrl}
          title="Filmes com melhores avaliações"
        />
      </section>
      <section>
        <MoviesContainer url={popularMoviesUrl} title="Filmes populares" />
      </section>
    </div>
  );
};

export default Home;
