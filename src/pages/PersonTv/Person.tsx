import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PersonProps } from '../../shared-types/person';
import { TvCreditsProps } from '../../shared-types/tv_credits';
import { getAge } from '../../utils/get-age';
import { getAgeDeath } from '../../utils/get-age-death';

import './Person.css';

const personUrl = import.meta.env.VITE_PERSON;
const apiKey = import.meta.env.VITE_API_KEY;
const imageUrl = import.meta.env.VITE_IMG;

const PersonTV = () => {
  const { id } = useParams();
  const [person, setPerson] = useState<PersonProps>();
  const [tvCredits, setTvCredits] = useState<TvCreditsProps>();
  const imagePerson = `${imageUrl}${person?.profile_path}`;

  const getPerson = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setPerson(data);
  };

  const getCreditsPerson = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setTvCredits(data);
  };

  useEffect(() => {
    const personData = `${personUrl}${id}?${apiKey}&language=pt-BR`;
    const creditsPersonUrl = `${personUrl}${id}/tv_credits?${apiKey}&language=pt-BR`;
    getPerson(personData);
    getCreditsPerson(creditsPersonUrl);
  }, [id]);

  tvCredits?.cast.sort((x, y) => {
    const date1: number = Date.parse(x.first_air_date),
      date2: number = Date.parse(y.first_air_date);
    return date2 - date1;
  });

  tvCredits?.crew.sort((x, y) => {
    const date1: number = Date.parse(x.first_air_date),
      date2: number = Date.parse(y.first_air_date);
    return date2 - date1;
  });

  return (
    <div className="main-container">
      {person && (
        <>
          <div className="container-info-personal">
            <img
              src={
                person.profile_path !== null
                  ? imagePerson
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
            {tvCredits && (
              <>
                <div className="infos">
                  <h3 className="title-column-info">Atuação</h3>
                  {tvCredits.cast.length <= 0 ? (
                    <span>-</span>
                  ) : (
                    <div className="credits">
                      {tvCredits.cast.map((tvCredit, index) => (
                        <div className="credit-info" key={index}>
                          {tvCredit.first_air_date === '' ? (
                            <span>—</span>
                          ) : (
                            <p>{tvCredit.first_air_date}</p>
                          )}
                          <h3>{tvCredit.name}</h3>
                          <p>
                            {tvCredit.episode_count}
                            {tvCredit.episode_count > 1
                              ? ' episódios'
                              : ' episódio '}
                          </p>
                          <p>Personagem {tvCredit.character}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="infos">
                  <h3 className="title-column-info">Produção</h3>
                  {tvCredits.crew.length <= 0 ? (
                    <span>-</span>
                  ) : (
                    <div className="credits">
                      {tvCredits.crew.map((tvCredit, index) => (
                        <div className="credit-info" key={index}>
                          {tvCredit.first_air_date === '' ? (
                            <span>—</span>
                          ) : (
                            <p>{tvCredit.first_air_date}</p>
                          )}
                          <h3>{tvCredit.name}</h3>
                          <p>Trabalho {tvCredit.job}</p>
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

export default PersonTV;
