import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <p>&copy; {currentYear} Marco Valentín Fernández. Todos los derechos reservados.</p>
          
          <div className="social-links">
            <a 
              href="https://github.com/valenfd3z" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/marco-valentin-fernandez-741222352/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=fernandezmarcovalentin@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Enviar email"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
          
          <p>
            Hecho con <span role="img" aria-label="amor">❤️</span> y React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
