import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { MovieCard } from "../../components/movie-card";
import { TemplatePage } from "../../templates/template-page";
import { TrendSelector } from "../../components/trend-selector";

export const Trending = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";
  const trendingParam = urlParams.get("trending") ?? "day";
  const page = urlParams.get("page") ?? "1";

  const { data: trendingMoviesData, isPlaceholderData } = useQuery({
    queryKey: ["trending", mediaType, trendingParam, page],
    queryFn: () =>
      getMoviesData<MovieAndTV[]>(
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
