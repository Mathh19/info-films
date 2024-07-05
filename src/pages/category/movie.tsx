import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMoviesData } from "../../services/get-media-data";
import { TemplatePage } from "../../templates/template-page";
import { MovieCard } from "../../components/movie-card";
import { usePageParam } from "../../hooks/usePageParam";
import { Movie } from "../../shared-types/media";
import { getCategoriesData } from "../../services/get-categories-data";

export const MovieCategory = () => {
  const { pageParam } = usePageParam();
  const { id, slug } = useParams();

  const {
    data: movieData,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: ["movie", "category", pageParam, id, slug],
    queryFn: () =>
      getMoviesData<Movie[]>(
        `/discover/movie?with_genres=${id}&page=${pageParam}`,
      ),
    staleTime: 1000,
    placeholderData: keepPreviousData,
  });

  const { data: movieCategoriesData } = useQuery({
    queryKey: ["category", "movie", id],
    queryFn: () => getCategoriesData("movie"),
  });

  const filteredCategory = movieCategoriesData?.genres.find(
    (genre) => genre.id === Number(id),
  );

  return (
    <div className="p-11">
      {filteredCategory && (
        <TemplatePage.Header title="Filmes da categoria">
          <span className="text-4xl font-bold text-cyan-400">
            "{filteredCategory?.name}"
          </span>
        </TemplatePage.Header>
      )}
      {movieData?.results.length !== 0 && (
        <>
          <TemplatePage.Content isPending={isPending}>
            {movieData?.results.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                image={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              />
            ))}
          </TemplatePage.Content>
          {movieData && (
            <TemplatePage.pagination
              totalPages={
                movieData.total_pages > 500 ? 500 : movieData.total_pages
              }
              isPlaceholderData={isPlaceholderData}
            />
          )}
        </>
      )}
    </div>
  );
};
