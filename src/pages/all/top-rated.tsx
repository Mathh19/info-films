import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TemplatePage } from "../../templates/template-page";
import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "../../components/movie-card";

export const TopRated = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";
  const page = urlParams.get("page") ?? "1";

  const { data: topRatedMoviesData, isPlaceholderData } = useQuery({
    queryKey: ["top_rated", mediaType, page],
    queryFn: () =>
      getMoviesData<MovieAndTV[]>(`/${mediaType}/top_rated?page=${page}`),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="p-11">
      <TemplatePage.Header title="Mais bem avaliados" />
      <TemplatePage.Content>
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
    </div>
  );
};
