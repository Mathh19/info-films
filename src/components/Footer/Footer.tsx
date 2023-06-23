import './Footer.css';
import { BsGithub, BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a
          href="https://github.com/Mathh19/info-films"
          target="_blank"
          rel="noreferrer"
          aria-label="Direciona você para o perfil do github do desenvolvedor da página"
        >
          <BsGithub />
          <p>Github</p>
        </a>
        <a
          href="https://twitter.com/mathexe_"
          target="_blank"
          rel="noreferrer"
          aria-label="Direciona você para o perfil do twitter do desenvolvedor da página"
        >
          <BsTwitter />
          <p>Twitter</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
