import { Link, useLocation } from "react-router-dom";
import { MovieCard } from "../../../components/movie-card";
import { MovieAndTV } from "../../../shared-types/media";
import { ChevronRight } from "lucide-react";
import { Container } from "../../../components/container";
import { CardSkeleton } from "../../../components/UI/skeletons.tsx/card-skeleton";

type SectionProps = {
  title: string;
  controlContent?: React.ReactElement;
  link: string;
  isPending: boolean;
  movies?: MovieAndTV[];
};

export const Section = ({
  title,
  controlContent,
  movies,
  isPending,
  link,
}: SectionProps) => {
  const { search } = useLocation();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-extrabold max-sm:text-3xl">{title}</h1>
          <div>{controlContent}</div>
        </div>

        <Link
          to={{ pathname: `/all/${link}`, search }}
          className="group whitespace-nowrap text-[#64748B]"
        >
          ver tudo
          <ChevronRight
            size={15}
            className="inline-block transition-all duration-200 group-hover:translate-x-[2px]"
          />
        </Link>
      </div>

      <Container>
        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                image={movie.poster_path}
                title={"title" in movie ? movie.title : movie.name}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              />
            ))}
      </Container>
    </div>
  );
};
