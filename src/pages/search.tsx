import { useSearchParams } from "react-router-dom";
import { TemplatePage } from "../templates/template-page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MovieAndTV } from "../shared-types/media";
import { getMoviesData } from "../services/get-media-data";
import { MovieCard } from "../components/movie-card";
import { usePageParam } from "../hooks/usePageParam";

export const Search = () => {
  const [urlParams] = useSearchParams();
  const query = urlParams.get("q");
  const mediaType = urlParams.get("media_type") ?? "movie";
  const { pageParam } = usePageParam();

  const {
    data: searchMoviesData,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: ["popular", mediaType, pageParam, query],
    queryFn: () =>
      getMoviesData<MovieAndTV[]>(
        `/search/${mediaType}?query=${query}&page=${pageParam}&include_adult=false`,
      ),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  const title =
    searchMoviesData?.results.length === 0
      ? "Não encontramos resultados para sua busca por"
      : "Resultados para sua busca por";

  return (
    <div className="p-11">
      <TemplatePage.Header title={title}>
        <span className="text-4xl font-bold text-cyan-400">"{query}"</span>
      </TemplatePage.Header>
      {searchMoviesData?.results.length !== 0 && (
        <>
          <TemplatePage.Content isPending={isPending}>
            {searchMoviesData?.results.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                image={movie.poster_path}
                title={"title" in movie ? movie.title : movie.name}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              />
            ))}
          </TemplatePage.Content>
          {searchMoviesData && (
            <TemplatePage.pagination
              totalPages={searchMoviesData.total_pages}
              isPlaceholderData={isPlaceholderData}
            />
          )}
        </>
      )}
    </div>
  );
};
