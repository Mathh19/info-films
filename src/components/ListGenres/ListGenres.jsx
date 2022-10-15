import React, { useEffect, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import './ListGenres.css';

const genresUrl = import.meta.env.VITE_GENRES;
const apiKey = import.meta.env.VITE_API_KEY;

const ListGenres = () => {
  const [genresFilms, setGenresFilms] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const navigate = useNavigate();

  const getGenresFilms = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setGenresFilms(data.genres);
  };

  const searchGenres = (genre) => {
    const category = genre.name;
    localStorage.setItem('category', category);
    navigate(`category?q=${genre.id}`);
    setIsClosed(true);
  };

  useEffect(() => {
    const genresFilmsUrl = `${genresUrl}list?${apiKey}&language=pt-BR`;

    getGenresFilms(genresFilmsUrl);
  }, []);

  return (
    <div className="component-list">
      <div>
        <button
          className="btn-categories"
          onClick={() => setIsClosed(!isClosed)}
        >
          Categorias
          {isClosed && <MdArrowDropDown />}
          {!isClosed && <MdArrowDropUp />}
        </button>
      </div>
      {!isClosed && (
        <div className="list-genres">
          <ul>
            {genresFilms.length > 0 &&
              genresFilms.map((genre) => (
                <li key={genre.id} onClick={() => searchGenres(genre)}>
                  {genre.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListGenres;
