import { Link } from 'react-router-dom';
import './LogoPage.css';

const LogoPage = () => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo">
        <img
          src="/icon-logo.svg"
          alt="Uma imagem de uma fita de filme na logo"
        />
        <span>InfoFilms</span>
      </div>
    </Link>
  );
};

export default LogoPage;
