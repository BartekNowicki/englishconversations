import React from 'react';
import './Footer.css';
import reviews from '../assets/reviews.jpg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div>
        <p>BARDO Bartosz Nowicki</p>
        <p>NIP 1132152032</p>
        <p>REGON 016407315</p>
      </div>
      <img src={reviews} alt="google reviews" className="reviews" />
    </footer>
  );
};

export default Footer;
