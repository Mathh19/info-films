import { useSearchParams } from "react-router-dom";
import { Rating } from "./UI/rating";

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
  const urlImg = import.meta.env.VITE_IMG;
  const [mediaTypeParams] = useSearchParams();
  const mediaType = mediaTypeParams.get("media_type") ?? "movie";
  const cardImage = image ? `${urlImg}/${image}` : "/no-image.png";

  return (
    <div className="group w-full max-w-60">
      <a href={`/${mediaType}/${id}`} title={title}>
        <div>
          <img
            draggable="false"
            src={cardImage}
            alt={`Filme ${title}`}
            width={240}
            height={300}
            data-image={image === null}
            className="rounded-lg object-cover transition-all group-hover:shadow-md group-hover:shadow-white/20 data-[image='true']:border data-[image='true']:border-white/25 data-[image='true']:bg-gradient-to-br data-[image='true']:from-cyan-600 data-[image='true']:to-transparent data-[image='true']:to-55%"
          />

          <p className="truncate whitespace-nowrap text-xl font-bold">
            {title}
          </p>
        </div>
      </a>
      <Rating vote_average={vote_average} vote_count={vote_count} />
    </div>
  );
};
