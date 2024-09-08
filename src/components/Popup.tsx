import React from 'react';
import './Popup.css';

interface PopupProps {
  popupContent: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ popupContent, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {popupContent}
        <button className="close-button" onClick={onClose}>x</button>
      </div>
    </div>
  );
};

export default Popup;
