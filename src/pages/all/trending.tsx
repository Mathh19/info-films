import { useSearchParams } from "react-router-dom";
import { TemplatePageMovies } from "../../templates/template-page-movies";
import { TrendSelector } from "../../components/trend-selector";
import { MovieAndTV } from "../../shared-types/media";
import { getMoviesData } from "../../services/get-media-data";

export const Trending = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";
  const trendingParam = urlParams.get("trending") ?? "day";

  return (
    <TemplatePageMovies.Wrapper>
      <TemplatePageMovies.Header title="Tendências">
        <TrendSelector />
      </TemplatePageMovies.Header>
      <TemplatePageMovies.InfiniteScrollContent
        queryKey={["movie", "trending", mediaType, trendingParam]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(
            `/trending/${mediaType}/${trendingParam}?page=${pageParam}`,
          )
        }
      />
    </TemplatePageMovies.Wrapper>
  );
};
