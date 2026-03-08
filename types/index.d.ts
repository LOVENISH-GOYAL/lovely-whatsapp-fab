import React from 'react';

export interface WhatsappFABProps {
  phoneNumber: string;
  message: string;
  backgroundColor?: string;
  hoverColor?: string;
  customIcon?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  bottom?: string | number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  fixed?: boolean;
}

declare const WhatsappFAB: React.FunctionComponent<WhatsappFABProps>;

export default WhatsappFAB;
