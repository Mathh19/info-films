import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TemplatePage } from "../../templates/template-page";
import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "../../components/movie-card";
import { usePageParam } from "../../hooks/usePageParam";

export const TopRated = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";
  const { pageParam } = usePageParam();

  const {
    data: topRatedMoviesData,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: ["top_rated", mediaType, pageParam],
    queryFn: () =>
      getMoviesData<MovieAndTV[]>(`/${mediaType}/top_rated?page=${pageParam}`),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  return (
    <TemplatePage.Wrapper>
      <TemplatePage.Header title="Mais bem avaliados" />
      <TemplatePage.Content isPending={isPending}>
        {topRatedMoviesData?.results.map((movie) => (
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
      <TemplatePage.pagination
        totalPages={40}
        isPlaceholderData={isPlaceholderData}
      />
    </TemplatePage.Wrapper>
  );
};
