import { BsFillStarFill } from 'react-icons/bs';
import { TvProps } from '../../shared-types/tv';

const imageUrl = import.meta.env.VITE_IMG;

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
