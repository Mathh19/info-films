import { Link } from "react-router-dom";

type GenresListProps = {
  genres: {
    id: number;
    name: string;
  }[];
  mediaType: "movie" | "tv";
};

export const GenresList = ({ genres, mediaType }: GenresListProps) => {
  return (
    <>
      {genres.length > 0 && (
        <ul className="flex">
          {genres.map((genre) => (
            <li
              key={genre.id}
              className="before:mx-1 before:text-xs before:content-['•'] first:before:mx-0 first:before:content-['']"
            >
              <Link to={`genre/${mediaType}/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
