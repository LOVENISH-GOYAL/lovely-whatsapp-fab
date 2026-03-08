// Web Component version - works with Angular, Vue, React, and vanilla JS
// This is a framework-agnostic implementation using Web Components

// WhatsApp SVG icon (inline for Web Component)
const WHATSAPP_SVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#ffffff"/>
</svg>
`;

// CSS styles (inline for Web Component)
const STYLES = `
<style>
  :host {
    --fab-background: #25d366;
    --fab-background-hover: #20ba5a;
    --fab-size: 64px;
    --fab-position-bottom: 20px;
    --fab-position-right: 20px;
    display: block;
    box-sizing: border-box;
  }

  .btn-whatsapp {
    background: var(--fab-background);
    border: none;
    border-radius: 50%;
    width: var(--fab-size);
    height: var(--fab-size);
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    outline: none;
    box-sizing: border-box;
  }

  .btn-whatsapp:hover {
    background: var(--fab-background-hover);
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .btn-whatsapp:active {
    transform: scale(0.95);
  }

  .btn-whatsapp:focus {
    outline: 2px solid rgba(37, 211, 102, 0.5);
    outline-offset: 2px;
  }

  .btn-whatsapp img,
  .btn-whatsapp svg {
    display: block;
    width: 24px;
    height: 24px;
    object-fit: contain;
    pointer-events: none;
  }

  /* Only apply white filter to default WhatsApp icon, not custom icons */
  .btn-whatsapp img.default-icon {
    filter: brightness(0) invert(1); /* Makes default icon white for better visibility on green background */
  }

  .btn-whatsapp svg {
    fill: #ffffff;
  }

  @media (max-width: 768px) {
    :host {
      bottom: 15px;
      right: 15px;
    }
    
    .btn-whatsapp {
      width: 56px;
      height: 56px;
    }
    
    .btn-whatsapp img,
    .btn-whatsapp svg {
      width: 22px;
      height: 22px;
    }
  }
</style>
`;

class WhatsappFAB extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.imageError = false;
  }

  static get observedAttributes() {
    return [
      'phone-number', 
      'message',
      'background-color',
      'hover-color',
      'custom-icon',
      'icon-path',
      'position',
      'bottom',
      'top',
      'left',
      'right',
      'fixed'
    ];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get phoneNumber() {
    return this.getAttribute('phone-number') || '';
  }

  get message() {
    return this.getAttribute('message') || '';
  }

  get backgroundColor() {
    return this.getAttribute('background-color') || '';
  }

  get hoverColor() {
    return this.getAttribute('hover-color') || '';
  }

  get customIcon() {
    return this.getAttribute('custom-icon') || this.getAttribute('icon-path') || '';
  }

  get position() {
    return this.getAttribute('position') || 'bottom-right';
  }

  get bottom() {
    return this.getAttribute('bottom') || '';
  }

  get top() {
    return this.getAttribute('top') || '';
  }

  get left() {
    return this.getAttribute('left') || '';
  }

  get right() {
    return this.getAttribute('right') || '';
  }

  get fixed() {
    const fixedAttr = this.getAttribute('fixed');
    return fixedAttr === null || fixedAttr === 'true';
  }

  validateInputs() {
    if (!this.phoneNumber || typeof this.phoneNumber !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('WhatsappFAB: phone-number is required and must be a string');
      }
      return false;
    }

    if (!this.message || typeof this.message !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.error('WhatsappFAB: message is required and must be a string');
      }
      return false;
    }

    return true;
  }

  handleWhatsAppClick() {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.validateInputs()) {
      return;
    }

    // Clean phone number
    const hasPlus = this.phoneNumber.trim().startsWith('+');
    const digitsOnly = this.phoneNumber.replace(/\D/g, '');
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
    const whatsappURL = `https://wa.me/${phoneOnly}?text=${encodeURIComponent(this.message)}`;

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
  }

  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleWhatsAppClick();
    }
  }

  handleImageError() {
    this.imageError = true;
    this.render();
  }

  attachEventListeners() {
    const button = this.shadowRoot.querySelector('.btn-whatsapp');
    if (button) {
      button.addEventListener('click', () => this.handleWhatsAppClick());
      button.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    const img = this.shadowRoot.querySelector('img');
    if (img) {
      img.addEventListener('error', () => this.handleImageError());
    }
  }

  render() {
    if (!this.validateInputs()) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    // Determine position type
    const isFixed = this.fixed;
    const positionType = isFixed ? 'fixed' : 'relative';

    // Calculate position styles
    let positionStyles = `position: ${positionType};`;
    
    if (isFixed) {
      if (this.bottom) {
        positionStyles += `bottom: ${this.bottom.includes('px') ? this.bottom : this.bottom + 'px'};`;
      }
      if (this.top) {
        positionStyles += `top: ${this.top.includes('px') ? this.top : this.top + 'px'};`;
      }
      if (this.left) {
        positionStyles += `left: ${this.left.includes('px') ? this.left : this.left + 'px'};`;
      }
      if (this.right) {
        positionStyles += `right: ${this.right.includes('px') ? this.right : this.right + 'px'};`;
      }

      // Handle position preset if no specific positions set
      if (!this.bottom && !this.top && !this.left && !this.right) {
        switch (this.position) {
          case 'top-left':
            positionStyles += 'top: 20px; left: 20px;';
            break;
          case 'top-right':
            positionStyles += 'top: 20px; right: 20px;';
            break;
          case 'bottom-left':
            positionStyles += 'bottom: 20px; left: 20px;';
            break;
          case 'bottom-right':
          default:
            positionStyles += 'bottom: 20px; right: 20px;';
            break;
        }
      }
      
      positionStyles += 'z-index: 9999;';
    } else {
      // For relative positioning, reset position values
      positionStyles += 'bottom: auto; top: auto; left: auto; right: auto; z-index: auto;';
    }

    // Get custom colors
    const bgColor = this.backgroundColor || '';
    const hoverBgColor = this.hoverColor || '';

    // Determine icon
    const iconPath = this.customIcon;
    let iconHTML = '';

    if (iconPath && !this.imageError) {
      iconHTML = `<img src="${iconPath}" alt="WhatsApp Icon" width="24" height="24" />`;
    } else {
      iconHTML = WHATSAPP_SVG;
    }

    // Build custom styles
    const customStyles = `
      <style>
        :host {
          ${positionStyles}
          ${bgColor ? `--fab-background: ${bgColor};` : ''}
          ${hoverBgColor ? `--fab-background-hover: ${hoverBgColor};` : ''}
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${STYLES}
      ${customStyles}
      <button class="btn-whatsapp" aria-label="Open WhatsApp chat" type="button">
        ${iconHTML}
      </button>
    `;

    this.attachEventListeners();
  }
}

// Register the custom element
if (typeof window !== 'undefined' && !customElements.get('whatsapp-fab')) {
  customElements.define('whatsapp-fab', WhatsappFAB);
}

export default WhatsappFAB;
export { WhatsappFAB };
