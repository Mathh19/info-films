import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';

import './index.css';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import PersonMovie from './pages/PersonMovie/Person';
import PersonTV from './pages/PersonTv/Person';
import Search from './pages/Search/Search';
import Tv from './pages/Tv/Tv';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<Tv />} />
          <Route path="/person-tv/:id" element={<PersonTV />} />
          <Route path="/person-movie/:id" element={<PersonMovie />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
