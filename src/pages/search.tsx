import { useSearchParams } from "react-router-dom";
import { TemplatePage } from "../components/template-page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MovieAndTV } from "../shared-types/media";
import { getMoviesData } from "../services/get-data";
import { MovieCard } from "../components/movie-card";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [mediaTypeParams] = useSearchParams();
  const mediaType = mediaTypeParams.get("media_type") ?? "movie";
  const [pageParams] = useSearchParams();
  const pageParam = pageParams.get("page") ?? "1";

  const { data: searchMoviesData, isPlaceholderData } = useQuery({
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
          <TemplatePage.Content>
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
