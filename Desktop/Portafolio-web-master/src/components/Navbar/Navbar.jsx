import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCode, 
  faProjectDiagram, 
  faBlog, 
  faPaperPlane,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="menu-icon" />
        </button>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="home" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="nav-link"
            activeClass="active"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faHome} className="nav-icon" />
            <span>Inicio</span>
          </Link>
          <Link 
            to="skills" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="nav-link"
            activeClass="active"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faCode} className="nav-icon" />
            <span>Habilidades</span>
          </Link>
          <Link 
            to="projects" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="nav-link"
            activeClass="active"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faProjectDiagram} className="nav-icon" />
            <span>Proyectos</span>
          </Link>
          <Link 
            to="blog" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="nav-link"
            activeClass="active"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faBlog} className="nav-icon" />
            <span>Blog</span>
          </Link>
          <Link 
            to="contact" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="nav-link contact-btn"
            activeClass="active"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="nav-icon" />
            <span>Contacto</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
