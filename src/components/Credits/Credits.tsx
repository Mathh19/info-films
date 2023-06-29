import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { CreditsProps } from '../../shared-types/credits';
import './Credits.css';

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

type CreditsComponentProps = {
  id?: string;
  isMovieOrTv: 'tv' | 'movie';
};

const Credits = ({ id, isMovieOrTv }: CreditsComponentProps) => {
  const { data } = useFetch<CreditsProps>(
    `${moviesUrl}/${isMovieOrTv}/${id}/credits?${apiKey}&language=pt-BR`,
  );

  return (
    <div className="card-cast-crew">
      {data?.cast.length !== 0 && (
        <>
          <h2>Elenco: </h2>
          <div className="wrapper-cards">
            {data?.cast.map((cast, index) => (
              <Link to={`/person-${isMovieOrTv}/${cast.id}`} key={index}>
                <figure className="card">
                  <img
                    src={
                      cast.profile_path === null
                        ? '/no-image.svg'
                        : `${imageUrl + cast.profile_path}`
                    }
                  />
                  <figcaption>
                    <h3>{cast.original_name}</h3>
                    <p>{cast.character}</p>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </>
      )}
      {data?.crew.length !== 0 && (
        <>
          <h2>Equipe: </h2>
          <div className="wrapper-cards">
            {data?.crew.map((crew, index) => (
              <Link to={`/person-${isMovieOrTv}/${crew.id}`} key={index}>
                <figure className="card" key={index}>
                  <img
                    src={
                      crew.profile_path === null
                        ? '/no-image.svg'
                        : `${imageUrl + crew.profile_path}`
                    }
                  />
                  <figcaption>
                    <h3>{crew.original_name}</h3>
                    <p>{crew.job}</p>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Credits;
