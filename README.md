# lovely-whatsapp-fab

A Whatsapp chat FAB (Floating Action Button) that open whatsapp on mobile and whatsapp PC on computer.
- [lovely-whatsapp-fab](https://www.npmjs.com/package/lovely-whatsapp-fab)

## Installation

```bash
npm install lovely-whatsapp-fab
```
## Usage
```bash
import React from 'react';
import WhatsappFAB from 'lovely-whatsapp-fab';

function MyComponent() {
  
  return (
    <WhatsappFAB
      phoneNumber="+919876543210" // Set `your whatsapp chat phone number`
      message={"Hi, I need enquiry about the services you provide"} 
    />
  );
}


```
## Props:
* phoneNumber: Your whatsapp chat phone number.
* message: A message that will be written in user's chatbox by default when whatsapp open.  They can edit this message before send.

## Preview
![Preview Image](images/preview.jpg)





## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Author
[Lovenish Goyal](https://github.com/LOVENISH-GOYAL)

Changelog
See the CHANGELOG file for details about changes.

