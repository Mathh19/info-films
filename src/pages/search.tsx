import { useSearchParams } from "react-router-dom";
import { TemplatePage } from "../templates/template-page";
import { MovieAndTV } from "../shared-types/media";
import { getMoviesData } from "../services/get-media-data";

export const Search = () => {
  const [urlParams] = useSearchParams();
  const query = urlParams.get("q");
  const mediaType = urlParams.get("media_type") ?? "movie";

  const title = query
    ? `Resultados para "${query}"`
    : "Não encontramos resultados.";

  return (
    <TemplatePage.Wrapper>
      <TemplatePage.Header title={title} />
      <TemplatePage.InfiniteScrollContent
        queryKey={["movie", mediaType]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(
            `/search/${mediaType}?query=${query}&page=${pageParam}&include_adult=false`,
          )
        }
      />
    </TemplatePage.Wrapper>
  );
};
