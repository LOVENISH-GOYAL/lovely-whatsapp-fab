import React from 'react';

declare module 'lovely-whatsapp-fab' {
  export interface WhatsappFABProps {
    phoneNumber: string;
    message: boolean;
  }

  const WhatsappFAB: React.FunctionComponent<WhatsappFABProps>;

  export default WhatsappFAB;
}
