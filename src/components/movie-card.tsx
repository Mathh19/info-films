import { Rating } from "./UI/rating";

type MovieCardProps = {
  id: number;
  image: string;
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

  return (
    <div className="group max-w-60 shrink-0">
      <a href={`/${id}`} title={title}>
        <div>
          <img
            draggable="false"
            src={`${urlImg}/${image}`}
            alt={title}
            width={240}
            height={300}
            className="rounded-lg object-cover transition-all group-hover:shadow-md group-hover:shadow-white/20"
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
