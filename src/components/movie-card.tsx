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
    <div className="w-full max-w-60">
      <Link
        to={{
          pathname: `/${mediaType}/${id}`,
          search: filterParams(["trending", "page", "q"]),
        }}
        title={title}
      >
        <div>
          <div
            className={cn(
              "group overflow-hidden rounded-lg shadow-[0px_0px_10px_-3px_#f7fafc]",
              !image && "border border-white/25",
            )}
          >
            <img
              draggable="false"
              src={cardImage}
              alt={`Filme ${title}`}
              height={300}
              className={cn(
                "w-full object-cover transition-all duration-300 group-hover:scale-125",
                !image &&
                  "bg-gradient-to-br from-cyan-600 to-transparent to-55%",
              )}
            />
          </div>

          <p className="truncate text-xl font-bold">{title}</p>
        </div>
      </Link>
      <Rating vote_average={vote_average} vote_count={vote_count} />
    </div>
  );
};
