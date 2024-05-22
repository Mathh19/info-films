import { useParams } from "react-router-dom";
import {
  getCreditsData,
  getTVData,
  getTrailerData,
} from "../services/get-media-data";
import { useQuery } from "@tanstack/react-query";
import { Rating } from "../components/UI/rating";
import { TemplateMovieInfoPage } from "../templates/template-movie-info-page";

export const Tv = () => {
  const { id } = useParams();
  const { data: tvData, isPending } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => getTVData(id!),
  });
  const { data: trailerData } = useQuery({
    queryKey: ["trailer", "tv", id],
    queryFn: () => getTrailerData("tv", id!),
  });
  const { data: creditsData } = useQuery({
    queryKey: ["credits", "tv", id],
    queryFn: () => getCreditsData("tv", id!),
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      {tvData && (
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
