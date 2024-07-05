import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { MovieCard } from "../../components/movie-card";
import { TemplatePage } from "../../templates/template-page";
import { TrendSelector } from "../../components/trend-selector";
import { usePageParam } from "../../hooks/usePageParam";

export const Trending = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";
  const trendingParam = urlParams.get("trending") ?? "day";
  const { pageParam } = usePageParam();

  const {
    data: trendingMoviesData,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: ["trending", mediaType, trendingParam, pageParam],
    queryFn: () =>
      getMoviesData<MovieAndTV[]>(
        `/trending/${mediaType}/${trendingParam}?page=${pageParam}`,
      ),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="p-11">
      <TemplatePage.Header title="Tendências">
        <TrendSelector />
      </TemplatePage.Header>
      <TemplatePage.Content isPending={isPending}>
        {trendingMoviesData?.results.map((movie) => (
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
    </div>
  );
};
