import contact from '../assets/contact.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact: React.FC = () => {
  const emailAddress = 'bardo@bardo.edu.pl';
  const fbMessengerLink = 'https://m.me/BardoLanguageDevelopment';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    alert('email skopiowany');
  };

  const handleOpenEmailApp = () => {
    const subject = 'Conversation Inquiry';
    const body = 'Hi, I would like to inquire about...';
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleOpenMessenger = () => {
    const message = 'Hi, I would like to inquire about...';
    window.open(`${fbMessengerLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div id="contact" className="section">
        <h1>Kontakt</h1>
        <img src={contact} alt="contact" className="" />
        <div className="email">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>bardo@bardo.edu.pl</span>
                  <a href="https://www.facebook.com/BardoLanguageDevelopment" target="_blank" rel="noopener noreferrer" className="facebook-icon">
                      <FontAwesomeIcon icon={faFacebook} />
                  </a>
        </div>
           <div className="button-group">
                <button className="modern-button" onClick={handleCopyEmail}>Skopiuj adres</button>
                <button className="modern-button" onClick={handleOpenEmailApp}>Wyślij email</button>
                <button className="modern-button" onClick={handleOpenMessenger}>Wyślij wiadomość przez Messenger</button>
            </div>
    </div>
  );
};

export default Contact;