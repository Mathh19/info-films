import { BsFillStarFill } from 'react-icons/bs';

const imageUrl = import.meta.env.VITE_IMG;

type GenresProps = {
  id: number;
  name: string;
}

export type TvProps = {
  name: string;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  genres: GenresProps[];
}

type TvCardProps = {
  tv: TvProps;
}

const TvCard = ({ tv }: TvCardProps) => {
  return (
    <div className="movie-card">
      <img
        src={imageUrl + tv.poster_path}
        alt={`${tv.name}`}
        className="img-movie"
      />
      <h2 className="title-movie">{tv.name}</h2>
      <p className="container-star">
        <BsFillStarFill className="star" />{' '}
        {`${tv.vote_average.toFixed(1)} (${tv.vote_count})`}
      </p>
    </div>
  );
};

export default TvCard;
