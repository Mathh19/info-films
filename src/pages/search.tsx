import { useSearchParams } from "react-router-dom";
import { TemplatePageMovies } from "../templates/template-page-movies";
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
    <TemplatePageMovies.Wrapper>
      <TemplatePageMovies.Header title={title} />
      <TemplatePageMovies.InfiniteScrollContent
        queryKey={["movie", mediaType, query]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(
            `/search/${mediaType}?query=${query}&page=${pageParam}&include_adult=false`,
          )
        }
      />
    </TemplatePageMovies.Wrapper>
  );
};
