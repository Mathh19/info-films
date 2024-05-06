import { Section } from "./components/section";
import { Slider } from "./components/slider";
import { Movie, TV } from "../../shared-types/media";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../services/getData";
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
      getData<MediaData>(`/trending/${mediaType}/${trendingParam}`),
  });
  const {
    data: popularMoviesData,
    isPending: popularPending,
    isError: popularError,
  } = useQuery({
    queryKey: ["popular", mediaType],
    queryFn: () => getData<MediaData>(`/${mediaType}/popular`),
  });
  const {
    data: topRatedMoviesData,
    isPending: topRatedPending,
    isError: topRatedError,
  } = useQuery({
    queryKey: ["top_rated", mediaType],
    queryFn: () => getData<MediaData>(`/${mediaType}/top_rated`),
  });

  const isPending = trendingPending || popularPending || topRatedPending;
  const isError = trendingError || popularError || topRatedError;

  const trendingImages = getImages(trendingMoviesData);

  return (
    <div>
      <Slider images={trendingImages} />

      {isPending && <p>loading...</p>}
      {isError && <p>Ocorreu um erro ao carregar os dados.</p>}

      {!isPending && !isError && (
        <div className="space-y-8 p-11">
          <Section
            title="Tendências"
            movies={trendingMoviesData?.results}
            controlContent={<TrendSelector />}
            link="trending"
          />
          <Section
            title="Os Mais Populares"
            movies={popularMoviesData?.results}
            link="popular"
          />
          <Section
            title="Melhor Avaliados"
            movies={topRatedMoviesData?.results}
            link="top_rated"
          />
        </div>
      )}
    </div>
  );
};