// WhatsappFAB.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhatsappFAB from '../src/WhatsappFAB';

// Mock the image import
jest.mock('../src/icon.png', () => 'icon.png');

describe('WhatsappFAB', () => {
  it('opens WhatsApp with the correct URL when clicked', () => {
    const phoneNumber = '1234567890';
    const message = 'Hello, this is a test message.';

    // Create a spy for window.open
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => {});

    const { getByRole } = render(<WhatsappFAB phoneNumber={phoneNumber} message={message} />);
    
    const whatsappButton = getByRole('button');
    fireEvent.click(whatsappButton);

    const expectedWhatsAppURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    expect(openSpy).toHaveBeenCalledWith(expectedWhatsAppURL, '_blank');

    // Restore the original implementation after the test
    openSpy.mockRestore();
  });

  // Add more tests as needed
});
