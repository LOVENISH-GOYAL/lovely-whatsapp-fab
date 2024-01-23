import React from 'react';
import PropTypes from 'prop-types';
import WhatsappIcon from './icon.png';
import styles from './WhatsappFAB.module.css';

function WhatsappFAB({ phoneNumber, message }) {
  const handleWhatsAppClick = () => {
    // Replace 'PHONE_NUMBER' with your actual WhatsApp number.
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
  };

  return (
    <div className={styles.btnWhatsapp}>
      <button onClick={handleWhatsAppClick} className="btn">
        <img src={WhatsappIcon} alt="WhatsApp Icon" /> {/* Use the imported image */}
      </button>
    </div>
  );
}

WhatsappFAB.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default WhatsappFAB;
