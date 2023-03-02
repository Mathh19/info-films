import React, { useEffect, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GenreProps } from '../../shared-types/genre';

import './ListGenres.css';

const genresUrl = import.meta.env.VITE_GENRES;
const apiKey = import.meta.env.VITE_API_KEY;

const ListGenres = () => {
  const [genresFilms, setGenresFilms] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const navigate = useNavigate();

  const searchGenres = (genre: GenreProps) => {
    const category = genre.name;
    localStorage.setItem('category', category);
    navigate(`category?q=${genre.id}`);
    setIsClosed(true);
  };

  useEffect(() => {
    if (!isClosed) {
      const genresFilmsUrl = `${genresUrl}/list?${apiKey}&language=pt-BR`;
      const controller = new AbortController();
      const getGenresFilms = async (url: string) => {
        const res = await fetch(url, {
          signal: controller.signal,
        });
        const data = await res.json();

        setGenresFilms(data.genres);
      };

      getGenresFilms(genresFilmsUrl);

      return () => {
        controller.abort();
      };
    }
  }, [isClosed]);

  return (
    <div className="component-list">
      <div>
        <button
          className="btn-categories"
          aria-label="Botão de pesquisar por catgorias"
          onClick={() => setIsClosed(!isClosed)}
        >
          Categorias
          {isClosed && <MdArrowDropDown />}
          {!isClosed && <MdArrowDropUp />}
        </button>
      </div>
      {!isClosed && (
        <>
          <div
            className="close-list"
            onClick={() => setIsClosed(!isClosed)}
          ></div>
          <div className="list-genres">
            <ul aria-label="Lista de categorias dos filmes">
              {genresFilms.length > 0 &&
                genresFilms.map((genre: GenreProps) => (
                  <li
                    aria-label={genre.name}
                    key={genre.id}
                    onClick={() => searchGenres(genre)}
                  >
                    {genre.name}
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ListGenres;
