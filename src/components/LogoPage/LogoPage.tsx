import { Link } from 'react-router-dom';
import './LogoPage.css';

const LogoPage = () => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo">
        <div className="logo-title">
          <h2 className="logo-info" translate="no">
            Info
          </h2>
          <h2 className="logo-films" translate="no">
            Films
          </h2>
        </div>
        <img
          src="./assets/icon-logo-films.svg"
          alt="Uma imagem de uma fita de filme na logo"
        />
      </div>
    </Link>
  );
};

export default LogoPage;
