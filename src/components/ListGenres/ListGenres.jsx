import React, { useEffect, useState } from 'react';
import { FaThList } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import './ListGenres.css';

const genresUrl = import.meta.env.VITE_GENRES;
const apiKey = import.meta.env.VITE_API_KEY;

const ListGenres = () => {
  const [genresFilms, setGenresFilms] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const getGenresFilms = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setGenresFilms(data.genres);
  };

  const searchGenres = (genre) => {
    setCategory(genre.name);
    navigate(`category?q=${genre.id}`);
    setIsClosed(true);
  };
  localStorage.setItem('category', category);

  useEffect(() => {
    const genresFilmsUrl = `${genresUrl}list?${apiKey}`;

    getGenresFilms(genresFilmsUrl);
  });

  return (
    <div className="component-list">
      <div>
        <button onClick={() => setIsClosed(!isClosed)}>
          {isClosed && <FaThList />}
          {!isClosed && <IoClose />}
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
