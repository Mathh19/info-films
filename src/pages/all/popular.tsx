import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { TemplatePageMovies } from "../../templates/template-page-movies";
import { useSearchParams } from "react-router-dom";

export const Popular = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";

  return (
    <TemplatePageMovies.Wrapper>
      <TemplatePageMovies.Header title="Os mais populares" />
      <TemplatePageMovies.InfiniteScrollContent
        queryKey={["movie", "popular", mediaType]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(`/${mediaType}/popular?page=${pageParam}`)
        }
      />
    </TemplatePageMovies.Wrapper>
  );
};
