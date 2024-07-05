import { useParams } from "react-router-dom";
import {
  getCreditsData,
  getTVData,
  getTrailerData,
} from "../services/get-media-data";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "../components/UI/rating";
import { TemplateMovieInfoPage } from "../templates/template-movie-info-page";
import { MoviePageSkeleton } from "../components/UI/skeletons.tsx/movie-page-skeleton";

export const Tv = () => {
  const { id } = useParams();
  const { data: tvData, isPending: tvPending } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => getTVData(id!),
  });
  const { data: trailerData } = useQuery({
    queryKey: ["trailer", "tv", id],
    queryFn: () => getTrailerData("tv", id!),
  });
  const { data: creditsData, isPending: creditsPending } = useQuery({
    queryKey: ["credits", "tv", id],
    queryFn: () => getCreditsData("tv", id!),
  });

  const isPending = tvPending || creditsPending;

  if (isPending) return <MoviePageSkeleton />;

  return (
    <div>
      {!isPending && tvData && (
        <>
          <TemplateMovieInfoPage.Info backgroundImage={tvData.backdrop_path}>
            <>
              <TemplateMovieInfoPage.Title
                title={tvData.name}
                releaseDate={tvData.first_air_date}
                tagline={tvData.tagline}
              />
              <TemplateMovieInfoPage.GenresList
                genres={tvData.genres}
                mediaType="tv"
              />
              <Rating
                vote_average={tvData.vote_average}
                vote_count={tvData.vote_count!}
                size="sm"
              />
              <p>Temporadas: {tvData.number_of_seasons}</p>
              <p>Epiósdios: {tvData.number_of_episodes}</p>

              <TemplateMovieInfoPage.Overview overview={tvData.overview} />

              <TemplateMovieInfoPage.WatchTrailer trailer={trailerData} />
            </>
          </TemplateMovieInfoPage.Info>
          {creditsData && (
            <TemplateMovieInfoPage.Credits
              cast={creditsData.cast}
              crew={creditsData.crew}
              mediaType="tv"
            />
          )}
        </>
      )}
    </div>
  );
};
