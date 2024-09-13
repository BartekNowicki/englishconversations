import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { scrollToSection } from '../utils';


const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="navbar-email">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>bardo@bardo.edu.pl</span>
          <a href="https://www.facebook.com/BardoLanguageDevelopment" target="_blank" rel="noopener noreferrer" className="facebook-icon">
              <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      {isOpen && (
        <nav className="navbar">
          <ul>
           <li><a href="#section1" onClick={(e) => { e.preventDefault(); scrollToSection('section1', setIsOpen); }}>Intro</a></li>
           <li><a href="#section2" onClick={(e) => { e.preventDefault(); scrollToSection('section2a', setIsOpen); }}>Konwersacje</a></li>
           <li><a href="#section2" onClick={(e) => { e.preventDefault(); scrollToSection('section2b', setIsOpen); }}>Warsztaty</a></li>
           <li><a href="#section3" onClick={(e) => { e.preventDefault(); scrollToSection('section3', setIsOpen); }}>O mnie</a></li>
           <li><a href="#section4" onClick={(e) => { e.preventDefault(); scrollToSection('section4', setIsOpen); }}>Metodologia</a></li>
           <li><a href="#section5" onClick={(e) => { e.preventDefault(); scrollToSection('section5', setIsOpen); }}>Zapisy</a></li>
           <li><a href="#section6" onClick={(e) => { e.preventDefault(); scrollToSection('section6', setIsOpen); }}>Cennik</a></li>
           <li><a href="#section7" onClick={(e) => { e.preventDefault(); scrollToSection('section7', setIsOpen); }}>Lokalizacja</a></li>
           <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact', setIsOpen); }}>Kontakt</a></li>
           </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
