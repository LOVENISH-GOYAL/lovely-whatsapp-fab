# Release Notes

## v1.0.11 - Latest Release

#### Reliability & Compatibility
- **Multi-tier fallback system** (v1.0.9) - Three methods to open WhatsApp: anchor tag click (primary) → window.open (fallback) → direct navigation (last resort), ensuring it works even with popup blockers
- **Improved phone number handling** - Automatic cleaning and validation of phone numbers (removes formatting, preserves country code)
- **SSR (Server-Side Rendering) compatibility** - Added safety checks for `window` object, making it safe for Next.js, Gatsby, and other SSR frameworks
- **Enhanced error handling** - Comprehensive try-catch blocks with graceful fallbacks and production-safe error logging

#### Accessibility & User Experience
- **Keyboard navigation support** - Button can be activated with Enter and Space keys for better accessibility
- **Image error handling** - Automatic fallback to inline SVG icon when custom icon fails to load
- **Security improvements** - Added `noopener noreferrer` attributes to prevent security vulnerabilities when opening WhatsApp in new tabs

#### Input Validation
- **Runtime validation** - Validates `phoneNumber` and `message` props at runtime, returns `null` gracefully if invalid
- **Type checking** - Ensures props are strings and handles edge cases properly

### 🐛 Critical Bug Fixes
- **Fixed WhatsApp URL blocking issue** (v1.0.9) - Changed from `api.whatsapp.com` to `wa.me` (WhatsApp's official short URL) to prevent `ERR_BLOCKED_BY_RESPONSE` errors
- Fixed README not displaying on npm package page (v1.0.8)

### 🎨 Documentation Improvements
- Fixed markdown syntax issues
- React/JSX section now expanded by default (v1.0.11)
- Better visual organization with emoji indicators (v1.0.11)

### ✅ Verification
The WhatsApp blocking fix (v1.0.9) is **confirmed implemented**:
- ✅ Both React component (`src/WhatsappFAB.js`) and Web Component (`src/WhatsappFAB.web.js`) use `wa.me` URL
- ✅ Multiple fallback methods implemented for reliability
- ✅ No references to `api.whatsapp.com` in production code

---

## Previous Versions Summary

### v1.0.7 and earlier
- Initial releases with React component support
- Web Component version for framework-agnostic usage
- Customization options (colors, icons, positioning)
- Support for React, Next.js, Angular, Vue, and vanilla JavaScript
