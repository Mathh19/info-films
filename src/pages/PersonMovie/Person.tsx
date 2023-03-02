import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useFetch } from '../../hooks/useFetch';
import { MovieCreditsProps } from '../../shared-types/movie_credits';
import { PersonProps } from '../../shared-types/person';
import { getAge } from '../../utils/get-age';
import { getAgeDeath } from '../../utils/get-age-death';

const personUrl = import.meta.env.VITE_PERSON;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const PersonMovie = () => {
  const { id } = useParams();
  const { data: person, isLoading } = useFetch<PersonProps>(
    `${personUrl}/${id}?${apiKey}&language=pt-BR`,
  );
  const imageProfile = `${imageUrl}${person?.profile_path}`;
  const { data: movieCredits } = useFetch<MovieCreditsProps>(
    `${personUrl}/${id}/movie_credits?${apiKey}&language=pt-BR`,
  );

  movieCredits?.cast.sort((x, y) => {
    const date1: number = Date.parse(x.release_date),
      date2: number = Date.parse(y.release_date);
    return date2 - date1;
  });

  movieCredits?.crew.sort((x, y) => {
    const date1: number = Date.parse(x.release_date),
      date2: number = Date.parse(y.release_date);
    return date2 - date1;
  });

  if (isLoading) return <Loading />;

  return (
    <div className="main-container">
      {person && (
        <>
          <div className="container-info-personal">
            <img
              src={
                person.profile_path !== null
                  ? imageProfile
                  : '/no-image-person.svg'
              }
              alt={person.name}
            />
            <h3>Nome</h3>
            <p>{person.name}</p>
            <h3>Nascimento</h3>
            {!person.birthday ? (
              <p>(Sem informações)</p>
            ) : (
              <p>
                {person.birthday}{' '}
                {!person.deathday && `(Idade: ${getAge(person.birthday)})`}
              </p>
            )}
            {person.deathday && (
              <>
                <h3>Falecimento</h3>
                <p>
                  {person.deathday}{' '}
                  {`(Idade:
                  ${getAgeDeath(person.birthday, person.deathday)})`}
                </p>
              </>
            )}
            <h3>Local de nascimento</h3>
            {!person.place_of_birth ? (
              <p>(Sem informações)</p>
            ) : (
              <p>{person.place_of_birth}</p>
            )}
            <h3>Também conhecido(a) como</h3>
            {person.also_known_as.length === 0 ? (
              <p>(sem informações)</p>
            ) : (
              person.also_known_as.map((names, index) => (
                <p key={index}>{names}</p>
              ))
            )}
          </div>
          <div className="container-info">
            <h2>Biografia</h2>
            {!person.biography ? (
              <p>(Sem informações)</p>
            ) : (
              <p>{person.biography}</p>
            )}
            {movieCredits && (
              <>
                <div className="infos">
                  <h3 className="title-column-info">Atuação</h3>
                  {movieCredits.cast.length <= 0 ? (
                    <span>-</span>
                  ) : (
                    <div className="credits">
                      {movieCredits.cast.map((movieCredit, index) => (
                        <div className="credit-info" key={index}>
                          {movieCredit.release_date === '' ? (
                            <span>—</span>
                          ) : (
                            <p>{movieCredit.release_date}</p>
                          )}
                          <h3>{movieCredit.title}</h3>
                          <p>Personagem {movieCredit.character}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="infos">
                  <h3 className="title-column-info">Produção</h3>
                  {movieCredits.crew.length <= 0 ? (
                    <span>-</span>
                  ) : (
                    <div className="credits">
                      {movieCredits.crew.map((movieCredit, index) => (
                        <div className="credit-info" key={index}>
                          {movieCredit.release_date === '' ? (
                            <span>—</span>
                          ) : (
                            <p>{movieCredit.release_date}</p>
                          )}
                          <h3>{movieCredit.title}</h3>
                          <p>Trabalho {movieCredit.job}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonMovie;
