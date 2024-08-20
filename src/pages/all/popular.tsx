import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { TemplatePage } from "../../templates/template-page";
import { useSearchParams } from "react-router-dom";

export const Popular = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";

  return (
    <TemplatePage.Wrapper>
      <TemplatePage.Header title="Os mais populares" />
      <TemplatePage.InfiniteScrollContent
        queryKey={["movie", "popular", mediaType]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(`/${mediaType}/popular?page=${pageParam}`)
        }
      />
    </TemplatePage.Wrapper>
  );
};
