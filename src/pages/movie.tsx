import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getCreditsData,
  getMovieData,
  getTrailerData,
} from "../services/get-media-data";
import { Rating } from "../components/UI/rating";
import { convertMinutesToHours } from "../utils/convert-minutes-to-hours";
import { TemplateMovieInfoPage } from "../templates/template-movie-info-page";

export const Movie = () => {
  const { id } = useParams();
  const { data: movieData, isPending } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieData(id!),
  });
  const { data: trailerData } = useQuery({
    queryKey: ["trailer", "movie", id],
    queryFn: () => getTrailerData("movie", id!),
  });
  const { data: creditsData } = useQuery({
    queryKey: ["credits", "movie", id],
    queryFn: () => getCreditsData("movie", id!),
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      {movieData && (
        <>
          <TemplateMovieInfoPage.Info backgroundImage={movieData.backdrop_path}>
            <>
              <TemplateMovieInfoPage.Title
                title={movieData.title}
                releaseDate={movieData.release_date}
                tagline={movieData.tagline}
              />
              <TemplateMovieInfoPage.GenresList
                genres={movieData.genres}
                mediaType="movie"
              />
              <Rating
                vote_average={movieData.vote_average}
                vote_count={movieData.vote_count!}
                size="sm"
              />
              <p className="text-md">
                {convertMinutesToHours(movieData.runtime)}
              </p>

              <TemplateMovieInfoPage.Overview overview={movieData.overview} />

              <TemplateMovieInfoPage.WatchTrailer trailer={trailerData} />
            </>
          </TemplateMovieInfoPage.Info>
          {creditsData && (
            <TemplateMovieInfoPage.Credits
              cast={creditsData.cast}
              crew={creditsData.crew}
              mediaType="movie"
            />
          )}
        </>
      )}
    </div>
  );
};
