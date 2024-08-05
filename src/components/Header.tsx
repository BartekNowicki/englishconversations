import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      const offset = 20;
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setIsOpen(false);
      }
    };

  return (
    <header className="header">
      <div className="header-content">
        <div className="email">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>bardo@bardo.edu.pl</span>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      {isOpen && (
        <nav className="navbar">
          <ul>
            <li><a href="#section1" onClick={(e) => { e.preventDefault(); scrollToSection('section1'); }}>Intro</a></li>
            <li><a href="#section2" onClick={(e) => { e.preventDefault(); scrollToSection('section2'); }}>Propozycja</a></li>
            <li><a href="#section3" onClick={(e) => { e.preventDefault(); scrollToSection('section3'); }}>O mnie</a></li>
            <li><a href="#section4" onClick={(e) => { e.preventDefault(); scrollToSection('section4'); }}>Metodologia</a></li>
            <li><a href="#section5" onClick={(e) => { e.preventDefault(); scrollToSection('section5'); }}>Zapisy</a></li>
            <li><a href="#section6" onClick={(e) => { e.preventDefault(); scrollToSection('section6'); }}>Cennik</a></li>
            <li><a href="#section7" onClick={(e) => { e.preventDefault(); scrollToSection('section7'); }}>Lokalizacja</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;