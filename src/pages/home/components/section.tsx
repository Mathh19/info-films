import { ContainerMovies } from "../../../components/container-movies";
import { MovieCard } from "../../../components/movie-card";
import { Movie, TV } from "../../../shared-types/media";

type SectionProps = {
  title: string;
  controlContent?: React.ReactElement;
  movies?: Movie[] | TV[];
};

export const Section = ({ title, controlContent, movies }: SectionProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <div>{controlContent}</div>
      </div>

      <ContainerMovies>
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            image={movie.poster_path}
            title={"title" in movie ? movie.title : movie.name}
            vote_average={movie.vote_average}
            vote_count={movie.vote_count}
          />
        ))}
      </ContainerMovies>
    </div>
  );
};
