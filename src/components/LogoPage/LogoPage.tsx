import { Link } from 'react-router-dom';
import './LogoPage.css';

const LogoPage = () => {
  return (
    <div className="logo">
      <h2 className="logo-title">
        <Link to="/" className="logo-link">
          <div className="info-logo">
            <span translate="no">Info</span>
          </div>
          <div>
            <span className="films-logo" translate="no">
              Films
            </span>
          </div>
        </Link>
      </h2>
    </div>
  );
};

export default LogoPage;
