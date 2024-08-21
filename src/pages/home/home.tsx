import { Section } from "./components/section";
import { Slider } from "./components/slider";
import { Movie, TV } from "../../shared-types/media";
import { useQuery } from "@tanstack/react-query";
import { getMoviesData } from "../../services/get-media-data";
import { useSearchParams } from "react-router-dom";
import { TrendSelector } from "../../components/trend-selector";
import { getImages } from "../../utils/get-images";

type MediaData = Movie[] | TV[];

export const Home = () => {
  const [mediaTypeParams] = useSearchParams();
  const mediaType = mediaTypeParams.get("media_type") ?? "movie";
  const [trendingParams] = useSearchParams();
  const trendingParam = trendingParams.get("trending") ?? "day";

  const {
    data: trendingMoviesData,
    isPending: trendingPending,
    isError: trendingError,
  } = useQuery({
    queryKey: ["trending", mediaType, trendingParam],
    queryFn: () =>
      getMoviesData<MediaData>(`/trending/${mediaType}/${trendingParam}`),
    staleTime: 10000,
  });
  const {
    data: popularMoviesData,
    isPending: popularPending,
    isError: popularError,
  } = useQuery({
    queryKey: ["popular", mediaType],
    queryFn: () => getMoviesData<MediaData>(`/${mediaType}/popular`),
    staleTime: 10000,
  });
  const {
    data: topRatedMoviesData,
    isPending: topRatedPending,
    isError: topRatedError,
  } = useQuery({
    queryKey: ["top_rated", mediaType],
    queryFn: () => getMoviesData<MediaData>(`/${mediaType}/top_rated`),
    staleTime: 10000,
  });

  const isError = trendingError || popularError || topRatedError;

  const trendingImages = getImages(trendingMoviesData);

  return (
    <div>
      <Slider images={trendingImages} />

      {isError && <p>Ocorreu um erro ao carregar os dados.</p>}

      {!isError && (
        <div className="space-y-8 p-6 md:p-9">
          <Section
            title="Tendências"
            movies={trendingMoviesData?.results}
            controlContent={<TrendSelector />}
            link="trending"
            isPending={trendingPending}
          />
          <Section
            title="Os Mais Populares"
            movies={popularMoviesData?.results}
            link="popular"
            isPending={popularPending}
          />
          <Section
            title="Mais bem avaliados"
            movies={topRatedMoviesData?.results}
            link="top-rated"
            isPending={topRatedPending}
          />
        </div>
      )}
    </div>
  );
};
