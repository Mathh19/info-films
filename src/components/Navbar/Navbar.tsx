import React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './Navbar.css';
import ListGenres from '../ListGenres/ListGenres';
import LogoPage from '../LogoPage/LogoPage';
import { BiSearchAlt2 } from 'react-icons/bi';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
    setSearch('');
  };

  return (
    <nav id="navbar">
      <LogoPage />
      <div className="container-search">
        <ListGenres />
        <div>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Buscar um filme..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="submit" aria-label="Botão para pesquisa de filme">
              <BiSearchAlt2 />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
