import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMoviesData } from "../../services/get-media-data";
import { TemplatePage } from "../../templates/template-page";
import { usePageParam } from "../../hooks/usePageParam";
import { Movie } from "../../shared-types/media";
import { getCategoriesData } from "../../services/get-categories-data";

export const MovieCategory = () => {
  const { pageParam } = usePageParam();
  const { id, slug } = useParams();

  const { data: movieCategoriesData } = useQuery({
    queryKey: ["category", "movie", id],
    queryFn: () => getCategoriesData("movie"),
  });

  const filteredCategory = movieCategoriesData?.genres.find(
    (genre) => genre.id === Number(id),
  );

  return (
    <TemplatePage.Wrapper>
      {filteredCategory && (
        <TemplatePage.Header
          title={filteredCategory.name}
          className="font-semibold"
        />
      )}
      <TemplatePage.InfiniteScrollContent
        queryKey={["movie", "category", pageParam, id, slug]}
        queryFn={(pageParam) =>
          getMoviesData<Movie[]>(
            `/discover/movie?with_genres=${id}&page=${pageParam}`,
          )
        }
      />
    </TemplatePage.Wrapper>
  );
};
