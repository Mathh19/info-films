import { useSearchParams } from "react-router-dom";
import { TemplatePage } from "../../templates/template-page";
import { TrendSelector } from "../../components/trend-selector";
import { MovieAndTV } from "../../shared-types/media";
import { getMoviesData } from "../../services/get-media-data";

export const Trending = () => {
  const [urlParams] = useSearchParams();
  const mediaType = urlParams.get("media_type") ?? "movie";
  const trendingParam = urlParams.get("trending") ?? "day";

  return (
    <TemplatePage.Wrapper>
      <TemplatePage.Header title="Tendências">
        <TrendSelector />
      </TemplatePage.Header>
      <TemplatePage.InfiniteScrollContent
        queryKey={["movie", "trending", mediaType, trendingParam]}
        queryFn={(pageParam) =>
          getMoviesData<MovieAndTV[]>(
            `/trending/${mediaType}/${trendingParam}?page=${pageParam}`,
          )
        }
      />
    </TemplatePage.Wrapper>
  );
};
