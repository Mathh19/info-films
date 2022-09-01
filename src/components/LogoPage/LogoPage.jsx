import { Link } from 'react-router-dom';
import './LogoPage.css';

const LogoPage = () => {
  return (
    <div className="logo">
      <h2 className="logo-title">
        <Link to="/" className="logo-link">
          <div className="box-text-logo">
            <div className="info-logo">
              <span className="i" translate="no">
                I
              </span>
              <span translate="no">nfo</span>
            </div>
          </div>
          <div>
            <span className="link-name-films F">F</span>
            <span className="link-name-films" translate="no">
              ilms
            </span>
          </div>
        </Link>
      </h2>
    </div>
  );
};

export default LogoPage;
