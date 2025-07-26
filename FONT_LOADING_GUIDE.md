# Font Loading Guide for Next.js

## 📁 Where to Put Font Files

### Option 1: Public Directory (Recommended)
```
public/
└── fonts/
    ├── YourFont-Light.woff2
    ├── YourFont-Regular.woff2
    ├── YourFont-Medium.woff2
    ├── YourFont-Bold.woff2
    └── YourFont-Italic.woff2
```

### Option 2: Assets Directory
```
src/
└── assets/
    └── fonts/
        └── YourFont-Regular.woff2
```

## 🚀 Loading Methods

### Method 1: next/font/local (Recommended)

Create `src/lib/fonts.ts`:
```typescript
import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: '../../public/fonts/YourFont-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YourFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/YourFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
  display: 'swap',
});
```

In `app/layout.tsx`:
```typescript
import { customFont } from '../lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={customFont.variable}>
        {children}
      </body>
    </html>
  );
}
```

### Method 2: CSS @font-face

Create `src/styles/fonts.css`:
```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/YourFont-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Import in `src/styles/common.css`:
```css
@import './fonts.css';

:root {
  --font-custom: 'YourFont', system-ui, sans-serif;
}
```

### Method 3: Variable Fonts

For variable fonts (single file, multiple weights):
```typescript
export const variableFont = localFont({
  src: '../../public/fonts/YourVariableFont.woff2',
  variable: '--font-variable',
  weight: '100 900', // Full weight range
  display: 'swap',
});
```

## ⚡ Performance Best Practices

### 1. Font Preloading
```html
<!-- In layout.tsx head -->
<link
  rel="preload"
  href="/fonts/YourCriticalFont-Regular.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### 2. Font Display Strategy
Always use `font-display: swap`:
- Shows fallback font immediately
- Swaps to custom font when loaded
- Prevents invisible text flash

### 3. File Format Priority
```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/YourFont.woff2') format('woff2'),    /* Best compression */
       url('/fonts/YourFont.woff') format('woff'),      /* Fallback */
       url('/fonts/YourFont.ttf') format('truetype');   /* Last resort */
}
```

### 4. Subset Fonts
Only include characters you need:
- Latin subset for English
- Cyrillic for Russian
- etc.

## 🎨 Integration with CSS Modules

In your component CSS:
```css
@import '../../styles/breakpoints.css';

.component {
  font-family: var(--font-custom);
}

.heading {
  font-family: var(--font-custom-display);
  font-weight: 700;
}

@media (--tablet) {
  .heading {
    font-size: 2rem;
  }
}
```

## 📋 Font Loading Checklist

- [ ] Choose appropriate loading method (next/font/local recommended)
- [ ] Place font files in `/public/fonts/`
- [ ] Use `.woff2` format for best compression
- [ ] Set `font-display: swap` for performance
- [ ] Preload critical fonts only
- [ ] Include fallback fonts in CSS variables
- [ ] Test on slow connections
- [ ] Validate font weights are working
- [ ] Check accessibility (font size, contrast)

## 🔧 Common Issues & Solutions

### Issue: Font not loading
- Check file path is correct
- Ensure CORS headers for cross-origin fonts
- Verify font format is supported

### Issue: Layout shift
- Use `font-display: swap`
- Preload critical fonts
- Match fallback font metrics

### Issue: Large bundle size
- Use variable fonts when possible
- Only load needed weights/styles
- Consider font subsetting

### Issue: Performance
- Limit number of font families
- Use system fonts for non-critical text
- Enable font compression on server

## 📖 Example Usage

```typescript
// fonts.ts
import localFont from 'next/font/local';

export const brandFont = localFont({
  src: [
    { path: '../../public/fonts/Brand-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/Brand-Bold.woff2', weight: '700' },
  ],
  variable: '--font-brand',
  display: 'swap',
});
```

```css
/* Component.module.css */
.hero {
  font-family: var(--font-brand);
  font-weight: 700;
}
```

This approach gives you optimal performance, zero layout shift, and seamless integration with your responsive CSS Modules system!
