import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMoviesData } from "../../services/get-media-data";
import { TemplatePage } from "../../templates/template-page";
import { MovieCard } from "../../components/movie-card";
import { usePageParam } from "../../hooks/usePageParam";
import { TV } from "../../shared-types/media";
import { getCategoriesData } from "../../services/get-categories-data";

export const TvCategory = () => {
  const { pageParam } = usePageParam();
  const { id, slug } = useParams();

  const {
    data: tvData,
    isPlaceholderData,
    isPending,
  } = useQuery({
    queryKey: ["tv", "category", pageParam, id, slug],
    queryFn: () =>
      getMoviesData<TV[]>(`/discover/tv?with_genres=${id}&page=${pageParam}`),
    staleTime: 1000,
    placeholderData: keepPreviousData,
  });

  const { data: movieCategoriesData } = useQuery({
    queryKey: ["category", "tv", id],
    queryFn: () => getCategoriesData("tv"),
  });

  const filteredCategory = movieCategoriesData?.genres.find(
    (genre) => genre.id === Number(id),
  );

  return (
    <div className="p-11">
      {filteredCategory && (
        <TemplatePage.Header title="Séries da categoria">
          <span className="text-4xl font-bold text-cyan-400">
            "{filteredCategory?.name}"
          </span>
        </TemplatePage.Header>
      )}
      {tvData?.results.length !== 0 && (
        <>
          <TemplatePage.Content isPending={isPending}>
            {tvData?.results.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                image={movie.poster_path}
                title={movie.name}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              />
            ))}
          </TemplatePage.Content>
          {tvData && (
            <TemplatePage.pagination
              totalPages={tvData.total_pages > 500 ? 500 : tvData.total_pages}
              isPlaceholderData={isPlaceholderData}
            />
          )}
        </>
      )}
    </div>
  );
};
