# lovely-whatsapp-fab

A Whatsapp chat FAB (Floating Action Button) that open whatsapp on mobile and whatsapp PC on computer.
- [lovely-whatsapp-fab](https://www.npmjs.com/package/lovely-whatsapp-fab)

## Installation

```bash
npm install lovely-whatsapp-fab
```

## Usage

### React Component (Default)

The default export is the React component. Works with all React-based frameworks.

### Web Component (Framework-Agnostic)

For Angular, Vue, or vanilla JavaScript, use the Web Component version.

---

## Framework Examples

Click on your framework to see the implementation:

<details open>
<summary><b>⚛️ React / JSX</b></summary>

```jsx
import React from 'react';
import WhatsappFAB from 'lovely-whatsapp-fab';

function MyComponent() {
  return (
    <WhatsappFAB
      phoneNumber="+919876543210" // Your WhatsApp phone number with country code
      message="Hi, I need enquiry about the services you provide" 
    />
  );
}
```

</details>

<details>
<summary><b>🚀 Next.js (App Router)</b></summary>

```jsx
'use client'; // Required for Next.js App Router

import WhatsappFAB from 'lovely-whatsapp-fab';

export default function Page() {
  return (
    <WhatsappFAB
      phoneNumber="+919876543210"
      message="Hello from Next.js!"
    />
  );
}
```

</details>

<details>
<summary><b>📄 Next.js (Pages Router)</b></summary>

```jsx
import WhatsappFAB from 'lovely-whatsapp-fab';

export default function Home() {
  return (
    <div>
      <WhatsappFAB
        phoneNumber="+919876543210"
        message="Hello from Next.js Pages Router!"
      />
    </div>
  );
}
```

</details>

<details>
<summary><b>📘 TypeScript / TSX</b></summary>

```tsx
import React from 'react';
import WhatsappFAB from 'lovely-whatsapp-fab';

const MyComponent: React.FC = () => {
  return (
    <WhatsappFAB
      phoneNumber="+919876543210"
      message="Hello from TypeScript!"
    />
  );
};

export default MyComponent;
```

</details>

<details>
<summary><b>⚡ Vite + React</b></summary>

```jsx
import React from 'react';
import WhatsappFAB from 'lovely-whatsapp-fab';

function App() {
  return (
    <WhatsappFAB
      phoneNumber="+919876543210"
      message="Hello from Vite!"
    />
  );
}

export default App;
```

</details>

<details>
<summary><b>🛠️ Create React App</b></summary>

```jsx
import React from 'react';
import WhatsappFAB from 'lovely-whatsapp-fab';
import './App.css';

function App() {
  return (
    <div className="App">
      <WhatsappFAB
        phoneNumber="+919876543210"
        message="Hello from Create React App!"
      />
    </div>
  );
}

export default App;
```

</details>

<details>
<summary><b>🅰️ Angular</b></summary>

Use the Web Component version in Angular:

**1. Import in your component:**
```typescript
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'lovely-whatsapp-fab/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for Web Components
})
export class AppComponent implements OnInit {
  phoneNumber = '+919876543210';
  message = 'Hello from Angular!';

  ngOnInit() {
    // Component is ready
  }
}
```

**2. Use in template (app.component.html):**
```html
<whatsapp-fab 
  [attr.phone-number]="phoneNumber" 
  [attr.message]="message">
</whatsapp-fab>
```

**3. Add to app.module.ts (if using NgModule):**
```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import 'lovely-whatsapp-fab/web';

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

</details>

<details>
<summary><b>💚 Vue 3</b></summary>

Use the Web Component version in Vue:

**Composition API:**
```vue
<template>
  <whatsapp-fab 
    :phone-number="phoneNumber" 
    :message="message"
  />
</template>

<script setup>
import { ref } from 'vue';
import 'lovely-whatsapp-fab/web';

const phoneNumber = ref('+919876543210');
const message = ref('Hello from Vue 3!');
</script>
```

**Options API:**
```vue
<template>
  <whatsapp-fab 
    :phone-number="phoneNumber" 
    :message="message"
  />
</template>

<script>
import 'lovely-whatsapp-fab/web';

export default {
  data() {
    return {
      phoneNumber: '+919876543210',
      message: 'Hello from Vue!'
    };
  }
};
</script>
```

</details>

<details>
<summary><b>🌐 Vanilla JavaScript / HTML</b></summary>

Use directly in HTML without any framework:

```html
<!DOCTYPE html>
<html>
<head>
  <title>WhatsApp FAB</title>
</head>
<body>
  <!-- Import the Web Component -->
  <script type="module">
    import 'lovely-whatsapp-fab/web';
  </script>

  <!-- Use the component -->
  <whatsapp-fab 
    phone-number="+919876543210" 
    message="Hello from vanilla JS!"
  ></whatsapp-fab>
</body>
</html>
```

**Or with CDN:**
```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/lovely-whatsapp-fab@latest/src/WhatsappFAB.web.js';
</script>

<whatsapp-fab 
  phone-number="+919876543210" 
  message="Hello from CDN!"
></whatsapp-fab>
```

</details>

## Compatibility

This package works with all React-based frameworks and build systems:

✅ **Frameworks:**
- React 16.8+ (with Hooks support)
- Next.js (App Router & Pages Router)
- Create React App
- Vite
- Remix
- Gatsby
- Any React-based framework

✅ **Build Systems:**
- Webpack (with CSS Modules support)
- Vite
- Parcel
- Rollup
- Any build system that supports CSS Modules

✅ **Module Systems:**
- ES Modules (import/export)
- CommonJS (require/module.exports)
- TypeScript/TSX

**Framework Compatibility:**

✅ **React Component (Default Export):**
- React 16.8+
- Next.js (App Router & Pages Router)
- Create React App
- Vite + React
- Remix
- Gatsby
- Any React-based framework

✅ **Web Component (Framework-Agnostic):**
- Angular (all versions)
- Vue 2 & Vue 3
- Svelte
- Vanilla JavaScript/HTML
- Any framework that supports Web Components
- Works without any framework!

**Two Versions Available:**
1. **React Component** (`import WhatsappFAB from 'lovely-whatsapp-fab'`) - For React projects
2. **Web Component** (`import 'lovely-whatsapp-fab/web'`) - For Angular, Vue, or vanilla JS

Both versions have the same functionality and styling!

## Props

### Required Props:
* `phoneNumber` (string): Your WhatsApp phone number with country code (e.g., "+919876543210")
* `message` (string): Default message that will be pre-filled in the chat box

### Optional Customization Props:
* `backgroundColor` (string): Custom background color (e.g., "#25d366", "rgb(37, 211, 102)")
* `hoverColor` (string): Custom hover background color
* `customIcon` (string): Path to your custom icon image (e.g., "/path/to/icon.png")
* `fixed` (boolean): Whether button is fixed to viewport (default: `true`). Set to `false` to place it in normal document flow
* `position` (string): Preset position - `'top-left'` | `'top-right'` | `'bottom-left'` | `'bottom-right'` (default: `'bottom-right'`) - **Only works when `fixed={true}`**
* `bottom` (string | number): Custom bottom position (e.g., "20px" or 20) - **Only works when `fixed={true}`**
* `top` (string | number): Custom top position - **Only works when `fixed={true}`**
* `left` (string | number): Custom left position - **Only works when `fixed={true}`**
* `right` (string | number): Custom right position - **Only works when `fixed={true}`**

**⚠️ Important:** When `fixed={false}`, the button is placed in normal document flow and the `position`, `top`, `left`, `right`, and `bottom` props become **ineffective**. These positioning props only work when `fixed={true}` (default).

## Customization Examples

### Custom Colors (React)
```jsx
import WhatsappFAB from 'lovely-whatsapp-fab';

<WhatsappFAB
  phoneNumber="+919876543210"
  message="Hello!"
  backgroundColor="#FF5733"
  hoverColor="#C70039"
/>
```

### Custom Icon (React)
```jsx
import WhatsappFAB from 'lovely-whatsapp-fab';
import customIcon from './assets/my-icon.png';

<WhatsappFAB
  phoneNumber="+919876543210"
  message="Hello!"
  customIcon={customIcon}
/>
```

### Custom Position (React)
```jsx
// Using preset position (only works when fixed={true})
<WhatsappFAB
  phoneNumber="+919876543210"
  message="Hello!"
  position="top-left"
  fixed={true}  // fixed is true by default
/>

// Using custom coordinates (only works when fixed={true})
<WhatsappFAB
  phoneNumber="+919876543210"
  message="Hello!"
  top="30px"
  left="30px"
  fixed={true}  // fixed is true by default
/>
```

### Relative Positioning (React)
```jsx
// Place button in normal document flow (not fixed to viewport)
// Note: When fixed={false}, position/top/left/right/bottom props are ignored
<WhatsappFAB
  phoneNumber="+919876543210"
  message="Hello!"
  fixed={false}
/>

// Or use it inline in your layout
<div className="chat-section">
  <WhatsappFAB
    phoneNumber="+919876543210"
    message="Hello!"
    fixed={false}
    // position, top, left, right, bottom props won't work here
  />
</div>
```

### All Customizations Combined (React)
```jsx
// Fixed position with all customizations
<WhatsappFAB
  phoneNumber="+919876543210"
  message="Hello!"
  backgroundColor="#4CAF50"
  hoverColor="#45a049"
  customIcon="/path/to/custom-icon.png"
  position="bottom-left"
  bottom="30px"
  left="30px"
  fixed={true}  // Position props work because fixed={true}
/>
```

### Web Component Customization (Angular/Vue/Vanilla JS)
```html
<!-- Custom colors and position -->
<whatsapp-fab 
  phone-number="+919876543210"
  message="Hello!"
  background-color="#FF5733"
  hover-color="#C70039"
  position="top-right"
></whatsapp-fab>

<!-- Custom icon -->
<whatsapp-fab 
  phone-number="+919876543210"
  message="Hello!"
  custom-icon="/path/to/icon.png"
></whatsapp-fab>

<!-- Custom position with exact coordinates (only works when fixed="true") -->
<whatsapp-fab 
  phone-number="+919876543210"
  message="Hello!"
  bottom="50px"
  right="50px"
  fixed="true"
></whatsapp-fab>

<!-- Relative positioning (in document flow) -->
<!-- Note: When fixed="false", position/bottom/top/left/right attributes are ignored -->
<whatsapp-fab 
  phone-number="+919876543210"
  message="Hello!"
  fixed="false"
></whatsapp-fab>
```

## Preview
![Preview Image](images/preview.jpg)





## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Author
[Lovenish Goyal](https://github.com/LOVENISH-GOYAL)

## Changelog
See the CHANGELOG file for details about changes.

