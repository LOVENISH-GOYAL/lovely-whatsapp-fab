import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './WhatsappFAB.module.css';
import WhatsappIcon from './icon.png';

// Fallback SVG icon in case image fails to load
const WhatsAppSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      fill="#ffffff"
    />
  </svg>
);

function WhatsappFAB({ 
  phoneNumber, 
  message,
  backgroundColor,
  hoverColor,
  customIcon,
  position = 'bottom-right',
  bottom,
  top,
  left,
  right,
  fixed = true
}) {
  const [imageError, setImageError] = useState(false);

  // Validate inputs
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.error('WhatsappFAB: phoneNumber is required and must be a string');
    }
    return null;
  }

  if (!message || typeof message !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.error('WhatsappFAB: message is required and must be a string');
    }
    return null;
  }

  const handleWhatsAppClick = () => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return;
    }

    // Clean phone number (remove any non-digit characters except + at the start)
    // Preserve + at the beginning if present, then keep only digits
    const hasPlus = phoneNumber.trim().startsWith('+');
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const cleanPhoneNumber = hasPlus && digitsOnly ? `+${digitsOnly}` : digitsOnly;
    
    if (!cleanPhoneNumber) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('WhatsappFAB: Invalid phone number');
      }
      return;
    }

    // Use wa.me (WhatsApp's official short URL) - less likely to be blocked
    // Format: https://wa.me/{phone}?text={message}
    const phoneOnly = cleanPhoneNumber.replace(/\+/g, ''); // Remove + for wa.me
    const whatsappURL = `https://wa.me/${phoneOnly}?text=${encodeURIComponent(message)}`;

    // Try multiple methods for maximum compatibility
    let opened = false;

    // Method 1: Direct anchor tag click (most reliable, user-initiated)
    try {
      const link = document.createElement('a');
      link.href = whatsappURL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      opened = true;
      
      // Clean up after a short delay
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('WhatsappFAB: Anchor method failed, trying fallback', error);
      }
    }

    // Method 2: Fallback to window.open if anchor method didn't work
    if (!opened) {
      try {
        const newWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        if (newWindow) {
          opened = true;
        }
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('WhatsappFAB: window.open failed, trying direct navigation', error);
        }
      }
    }

    // Method 3: Last resort - direct navigation (will redirect current page)
    // This is only used if both methods above fail
    if (!opened) {
      try {
        window.location.href = whatsappURL;
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('WhatsappFAB: All methods failed to open WhatsApp', error);
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    // Support keyboard navigation (Enter and Space keys)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleWhatsAppClick();
    }
  };

  // Calculate position styles
  const positionStyles = {};
  
  if (fixed) {
    // Only apply position styles when fixed
    if (bottom !== undefined) positionStyles.bottom = typeof bottom === 'number' ? `${bottom}px` : bottom;
    if (top !== undefined) positionStyles.top = typeof top === 'number' ? `${top}px` : top;
    if (left !== undefined) positionStyles.left = typeof left === 'number' ? `${left}px` : left;
    if (right !== undefined) positionStyles.right = typeof right === 'number' ? `${right}px` : right;

    // Handle position preset
    if (!bottom && !top && !left && !right) {
      switch (position) {
        case 'top-left':
          positionStyles.top = '20px';
          positionStyles.left = '20px';
          break;
        case 'top-right':
          positionStyles.top = '20px';
          positionStyles.right = '20px';
          break;
        case 'bottom-left':
          positionStyles.bottom = '20px';
          positionStyles.left = '20px';
          break;
        case 'bottom-right':
        default:
          positionStyles.bottom = '20px';
          positionStyles.right = '20px';
          break;
      }
    }
  }

  // Determine which icon to use
  const iconSrc = customIcon || WhatsappIcon;
  const isDefaultIcon = !customIcon; // True if using default icon, false if custom

  // Build inline styles with CSS variables
  const inlineStyles = {
    ...positionStyles,
  };

  // Add CSS variables if colors are provided
  if (backgroundColor || hoverColor) {
    inlineStyles['--fab-background'] = backgroundColor || undefined;
    inlineStyles['--fab-background-hover'] = hoverColor || undefined;
  }

  // Determine position class
  let positionClass = '';
  if (!fixed) {
    positionClass = 'relative';
  } else if (positionStyles.position === 'absolute') {
    positionClass = 'absolute';
  }

  return (
    <div 
      className={`${styles.btnWhatsapp} ${positionClass}`}
      style={inlineStyles}
    >
      <button
        onClick={handleWhatsAppClick}
        onKeyDown={handleKeyDown}
        className="btn"
        aria-label="Open WhatsApp chat"
        type="button"
      >
        {imageError ? (
          <WhatsAppSVG />
        ) : (
          <img
            src={iconSrc}
            alt="WhatsApp Icon"
            width="24"
            height="24"
            className={isDefaultIcon ? styles.defaultIcon : ''}
            onError={() => setImageError(true)}
          />
        )}
      </button>
    </div>
  );
}

WhatsappFAB.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  customIcon: PropTypes.string,
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fixed: PropTypes.bool,
};

export default WhatsappFAB;
