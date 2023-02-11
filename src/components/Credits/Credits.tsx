import { useState, useEffect } from 'react';
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
  const [credits, setCredits] = useState<CreditsProps>();

  const getCredits = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    setCredits(data);
  };

  useEffect(() => {
    const creditsUrl = `${moviesUrl}${isMovieOrTv}/${id}/credits?${apiKey}&language=pt-BR`;
    getCredits(creditsUrl);
  }, [id, isMovieOrTv]);

  return (
    <div className="card-cast-crew">
      {credits?.cast.length !== 0 && (
        <>
          <h2>Elenco: </h2>
          <div className="wrapper-cards">
            {credits?.cast.map((cast, index) => (
              <div className="card" key={index}>
                <img
                  src={
                    cast.profile_path === null
                      ? '/no-image.svg'
                      : `${imageUrl + cast.profile_path}`
                  }
                />
                <p>Persongem: {cast.character}</p>
                <p>Nome original: {cast.original_name}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {credits?.crew.length !== 0 && (
        <>
          <h2>Equipe: </h2>
          <div className="wrapper-cards">
            {credits?.crew.map((crew, index) => (
              <div className="card" key={index}>
                <img
                  src={
                    crew.profile_path === null
                      ? '/no-image.svg'
                      : `${imageUrl + crew.profile_path}`
                  }
                />
                <p>Nome: {crew.original_name}</p>
                <p>Trabalho: {crew.job}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Credits;
