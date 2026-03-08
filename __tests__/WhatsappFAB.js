// WhatsappFAB.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhatsappFAB from '../src/WhatsappFAB';

// Mock the image import
jest.mock('../src/icon.png', () => 'icon.png');

describe('WhatsappFAB', () => {
  let createElementSpy;
  let appendChildSpy;
  let clickSpy;
  let removeChildSpy;

  beforeEach(() => {
    // Mock document.createElement and related DOM methods
    createElementSpy = jest.spyOn(document, 'createElement');
    appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});
    
    // Mock link element and click
    const mockLink = {
      href: '',
      target: '',
      rel: '',
      style: { display: '' },
      click: jest.fn()
    };
    createElementSpy.mockReturnValue(mockLink);
    clickSpy = mockLink.click;
    
    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore all mocks
    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    jest.useRealTimers();
  });

  it('opens WhatsApp with the correct URL when clicked', () => {
    const phoneNumber = '1234567890';
    const message = 'Hello, this is a test message.';

    const { getByRole } = render(<WhatsappFAB phoneNumber={phoneNumber} message={message} />);
    
    const whatsappButton = getByRole('button');
    fireEvent.click(whatsappButton);

    // wa.me format: https://wa.me/{phone}?text={message} (no + in phone)
    const phoneOnly = phoneNumber.replace(/\+/g, '');
    const expectedWhatsAppURL = `https://wa.me/${phoneOnly}?text=${encodeURIComponent(message)}`;
    
    // Verify anchor tag was created with correct attributes
    expect(createElementSpy).toHaveBeenCalledWith('a');
    const linkElement = createElementSpy.mock.results[0].value;
    expect(linkElement.href).toBe(expectedWhatsAppURL);
    expect(linkElement.target).toBe('_blank');
    expect(linkElement.rel).toBe('noopener noreferrer');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('handles keyboard navigation', () => {
    const phoneNumber = '1234567890';
    const message = 'Test message';

    const { getByRole } = render(<WhatsappFAB phoneNumber={phoneNumber} message={message} />);
    
    const whatsappButton = getByRole('button');
    
    // Test Enter key
    fireEvent.keyDown(whatsappButton, { key: 'Enter' });
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();

    // Reset spies
    createElementSpy.mockClear();
    clickSpy.mockClear();
    appendChildSpy.mockClear();

    // Test Space key
    fireEvent.keyDown(whatsappButton, { key: ' ' });
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('returns null when phoneNumber is missing', () => {
    const { container } = render(<WhatsappFAB phoneNumber="" message="test" />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when message is missing', () => {
    const { container } = render(<WhatsappFAB phoneNumber="123" message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('cleans phone number correctly', () => {
    const phoneNumber = '+1 (234) 567-890';
    const message = 'Test message';

    const { getByRole } = render(<WhatsappFAB phoneNumber={phoneNumber} message={message} />);
    
    const whatsappButton = getByRole('button');
    fireEvent.click(whatsappButton);

    const expectedWhatsAppURL = `https://api.whatsapp.com/send?phone=${encodeURIComponent('+1234567890')}&text=${encodeURIComponent(message)}`;
    
    // Verify anchor tag was created with cleaned phone number
    expect(createElementSpy).toHaveBeenCalledWith('a');
    const linkElement = createElementSpy.mock.results[0].value;
    expect(linkElement.href).toBe(expectedWhatsAppURL);
    expect(linkElement.target).toBe('_blank');
    expect(linkElement.rel).toBe('noopener noreferrer');
  });
});
