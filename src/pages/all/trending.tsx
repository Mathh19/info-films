import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getData } from "../../services/getData";
import { MovieAndTV } from "../../shared-types/media";
import { MovieCard } from "../../components/movie-card";
import { TemplatePage } from "../../components/template-page";
import { TrendSelector } from "../../components/trend-selector";
import { usePagination } from "../../hooks/usePagination";

export const Trending = () => {
  const [mediaTypeParams] = useSearchParams();
  const mediaType = mediaTypeParams.get("media_type") ?? "movie";
  const [trendingParams] = useSearchParams();
  const trendingParam = trendingParams.get("trending") ?? "day";
  const { page } = usePagination();

  const { data: trendingMoviesData, isPlaceholderData } = useQuery({
    queryKey: ["trending", mediaType, trendingParam, page],
    queryFn: () =>
      getData<MovieAndTV[]>(
        `/trending/${mediaType}/${trendingParam}?page=${page}`,
      ),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="p-11">
      <TemplatePage.Header title="Tendências">
        <TrendSelector />
      </TemplatePage.Header>
      <TemplatePage.Content>
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
