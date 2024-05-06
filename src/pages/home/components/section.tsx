import { ContainerMovies } from "../../../components/container-movies";
import { MovieCard } from "../../../components/movie-card";
import { Movie, TV } from "../../../shared-types/media";
import { ChevronRight } from "lucide-react";

type SectionProps = {
  title: string;
  controlContent?: React.ReactElement;
  link: string;
  movies?: Movie[] | TV[];
};

export const Section = ({
  title,
  controlContent,
  movies,
  link,
}: SectionProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-extrabold max-sm:text-3xl">{title}</h1>
          <div>{controlContent}</div>
        </div>

        <a
          href={`/all/${link}`}
          className="group whitespace-nowrap text-[#64748B]"
        >
          ver tudo
          <ChevronRight
            size={15}
            className="inline-block transition-all duration-200 group-hover:translate-x-[2px]"
          />
        </a>
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
