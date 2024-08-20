import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { TemplatePageMovies } from "../../templates/template-page-movies";
import { useSearchParams } from "react-router-dom";

export const TopRated = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";

  return (
    <TemplatePageMovies.Wrapper>
      <TemplatePageMovies.Header title="Mais bem avaliados" />
      <TemplatePageMovies.InfiniteScrollContent
        queryKey={["movie", "top-rated", mediaType]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(
            `/${mediaType}/top_rated?page=${pageParam}`,
          )
        }
      />
    </TemplatePageMovies.Wrapper>
  );
};
