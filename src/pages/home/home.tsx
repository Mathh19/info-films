import { Section } from "./components/section";
import { Slider } from "./components/slider";
import { Movie, TV } from "../../shared-types/media";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../services/getData";

export const Home = () => {
  const { data: trendingMoviesData, isPending: trendingPending } = useQuery({
    queryKey: ["trendingDay_movie"],
    queryFn: () => getData<Movie[] | TV[]>("/trending/movie/day"),
  });
  const { data: popularMoviesData, isPending: popularPending } = useQuery({
    queryKey: ["popular_movie"],
    queryFn: () => getData<Movie[] | TV[]>("/movie/popular"),
  });
  const { data: topRatedMoviesData, isPending: topRatedPending } = useQuery({
    queryKey: ["top_rated_movie"],
    queryFn: () => getData<Movie[] | TV[]>("/movie/top_rated"),
  });
  const { data: upcomingMoviesData, isPending: upcomingPending } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => getData<Movie[]>("/movie/upcoming"),
  });

  const isPending =
    trendingPending || popularPending || topRatedPending || upcomingPending;

  const images = trendingMoviesData
    ? trendingMoviesData.results
        .map((movie) => ({
          id: movie.id,
          title: "title" in movie ? movie.title : movie.name,
          backdrop_url: movie.backdrop_path,
          alt: `filme do ${"title" in movie ? movie.title : movie.name}`,
        }))
        .slice(0, 4)
    : [];

  return (
    <div>
      <Slider images={images} />

      {isPending && <p>loading...</p>}

      {!isPending && (
        <div className="space-y-8 p-11">
          <Section title="Tendências" movies={trendingMoviesData?.results} />
          <Section title="Novidades" movies={upcomingMoviesData?.results} />
          <Section
            title="Os Mais Populares"
            movies={popularMoviesData?.results}
          />
          <Section
            title="Melhor Avaliados"
            movies={topRatedMoviesData?.results}
          />
        </div>
      )}
    </div>
  );
};
