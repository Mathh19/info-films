import { getMoviesData } from "../../services/get-media-data";
import { MovieAndTV } from "../../shared-types/media";
import { TemplatePage } from "../../templates/template-page";
import { useSearchParams } from "react-router-dom";

export const TopRated = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";

  return (
    <TemplatePage.Wrapper>
      <TemplatePage.Header title="Mais bem avaliados" />
      <TemplatePage.InfiniteScrollContent
        queryKey={["movie", "top-rated", mediaType]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(
            `/${mediaType}/top_rated?page=${pageParam}`,
          )
        }
      />
    </TemplatePage.Wrapper>
  );
};
