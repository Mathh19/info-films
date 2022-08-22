import './Footer.css';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href="https://github.com/Mathh19" target="_blank" rel="noreferrer">
          <BsGithub />
        </a>
        <a href="https://twitter.com/mathexe_" target="_blank" rel="noreferrer">
          <BsTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
