import { Link } from 'react-router-dom';
import { CreditsProps } from '../../shared-types/credits';
import './Credits.css';

const imageUrl = import.meta.env.VITE_IMG;

type CreditsComponentProps = {
  isMovieOrTv: 'tv' | 'movie';
  credits: CreditsProps;
};

const Credits = ({ isMovieOrTv, credits }: CreditsComponentProps) => {
  return (
    <div className="card-cast-crew">
      {credits?.cast.length !== 0 && (
        <>
          <h2>Elenco: </h2>
          <div className="wrapper-cards">
            {credits?.cast.map((cast, index) => (
              <Link to={`/person-${isMovieOrTv}/${cast.id}`} key={index}>
                <figure className="card">
                  <img
                    src={
                      cast.profile_path === null
                        ? '/no-image.svg'
                        : `${imageUrl}/w500${cast.profile_path}`
                    }
                    alt={`Uma imagem do ${cast.original_name}`}
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
      {credits?.crew.length !== 0 && (
        <>
          <h2>Equipe: </h2>
          <div className="wrapper-cards">
            {credits?.crew.map((crew, index) => (
              <Link to={`/person-${isMovieOrTv}/${crew.id}`} key={index}>
                <figure className="card" key={index}>
                  <img
                    src={
                      crew.profile_path === null
                        ? '/no-image.svg'
                        : `${imageUrl}/w500${crew.profile_path}`
                    }
                    alt={`Uma imagem do ${crew.original_name}`}
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
