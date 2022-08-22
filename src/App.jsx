import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import GoTop from './components/GoTop/GoTop';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <GoTop />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
