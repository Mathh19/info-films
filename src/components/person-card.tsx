import { Link } from "react-router-dom";
import { useUrlParams } from "../hooks/useUrlParams";

const urlOriginalImg = import.meta.env.VITE_ORIGINAL_SIZE_IMG;

type PersonCardProps = {
  id: number;
  img: string | null;
  name: string;
  mediaType: "movie" | "tv";
  character?: string;
  job?: string;
};

export const PersonCard = ({
  id,
  img,
  name,
  character,
  mediaType,
  job,
}: PersonCardProps) => {
  const { searchParams } = useUrlParams();
  const image = img ? `${urlOriginalImg}/${img}` : "/no-image.png";

  return (
    <Link
      to={{
        pathname: `/person/${mediaType}/${id}`,
        search: searchParams.toString(),
      }}
      className="shrink-0"
    >
      <div className="group flex flex-col items-center justify-center">
        <img
          src={image}
          data-image={!img}
          width={128}
          height={128}
          alt={`${name}/${character ?? job}`}
          className="size-32 rounded-full object-cover object-center data-[image='true']:border data-[image='true']:border-white/25 data-[image='true']:bg-gradient-to-br data-[image='true']:from-cyan-600 data-[image='true']:to-transparent data-[image='true']:to-55%"
        />
        <p className="text-lg font-semibold group-hover:underline group-hover:underline-offset-4">
          {name}
        </p>
        <p
          title={character ?? job}
          className="max-w-24 truncate text-center text-zinc-500"
        >
          {character ?? job}
        </p>
      </div>
    </Link>
  );
};
