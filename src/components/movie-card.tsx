import { Link, useSearchParams } from "react-router-dom";
import { Rating } from "./UI/rating";
import { useUrlParams } from "../hooks/useUrlParams";
import { cn } from "../utils/cn";

const urlImg = import.meta.env.VITE_IMG;

type MovieCardProps = {
  id: number;
  image: string | null;
  title: string;
  vote_average: number;
  vote_count: number;
};

export const MovieCard = ({
  id,
  title,
  image,
  vote_average,
  vote_count,
}: MovieCardProps) => {
  const { filterParams } = useUrlParams();
  const [mediaTypeParams] = useSearchParams();
  const mediaType = mediaTypeParams.get("media_type") ?? "movie";
  const cardImage = image ? `${urlImg}/${image}` : "/no-image.png";

  return (
    <div className="group w-full max-w-60 shrink-0">
      <Link
        to={{
          pathname: `/${mediaType}/${id}`,
          search: filterParams(["trending", "page", "q"]),
        }}
        title={title}
      >
        <div className="overflow-hidden rounded-lg border border-slate-100">
          <img
            src={cardImage}
            alt={`Filme ${title}`}
            width={240}
            height={320}
            className={cn(
              "h-80 w-full object-cover object-center transition-all duration-450 ease-in-out group-focus-within:scale-110 group-hover:scale-110",
              !image && "bg-gradient-to-br from-cyan-600 to-transparent to-55%",
            )}
          />
        </div>

        <p className="mt-2 truncate text-xl font-bold">{title}</p>

        <Rating vote_average={vote_average} vote_count={vote_count} />
      </Link>
    </div>
  );
};
