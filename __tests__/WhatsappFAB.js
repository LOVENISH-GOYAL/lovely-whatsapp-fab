// WhatsappFAB.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhatsappFAB from '../src/WhatsappFAB';

// Mock the image import
jest.mock('../src/icon.png', () => 'icon.png');

describe('WhatsappFAB', () => {
  let openSpy;

  beforeEach(() => {
    // Create a spy for window.open before each test
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original implementation after each test
    openSpy.mockRestore();
  });

  it('opens WhatsApp with the correct URL when clicked', () => {
    const phoneNumber = '1234567890';
    const message = 'Hello, this is a test message.';

    const { getByRole } = render(<WhatsappFAB phoneNumber={phoneNumber} message={message} />);
    
    const whatsappButton = getByRole('button');
    fireEvent.click(whatsappButton);

    const expectedWhatsAppURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    expect(openSpy).toHaveBeenCalledWith(expectedWhatsAppURL, '_blank');
  });

  // Add more tests as needed
});
