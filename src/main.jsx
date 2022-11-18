import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';

import './index.css';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Search from './pages/Search/Search';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="search" element={<Search />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
