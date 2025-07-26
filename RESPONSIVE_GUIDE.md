# Responsive CSS Modules Structure

This project uses a clean, organized approach to responsive design with CSS Modules and PostCSS custom media queries.

## 📁 Structure

```
src/
├── styles/
│   ├── breakpoints.css      # Centralized breakpoint definitions
│   └── common.css          # Shared utilities and variables
└── components/
    └── [ComponentName]/
        ├── Component.tsx
        ├── Component.module.css  # Imports breakpoints
        └── index.ts
```

## 🎯 Key Features

### 1. Centralized Breakpoints (`src/styles/breakpoints.css`)

All responsive breakpoints are defined in one place using PostCSS custom media:

```css
@custom-media --mobile (min-width: 320px);
@custom-media --tablet (min-width: 768px);
@custom-media --desktop (min-width: 1280px);
@custom-media --max-mobile (max-width: 767px);
/* ... and more */
```

### 2. Easy Import Pattern

Each component module imports the breakpoints:

```css
@import '../../styles/breakpoints.css';

.component {
  /* Base styles */
}

@media (--tablet) {
  .component {
    /* Tablet styles */
  }
}
```

### 3. Semantic Breakpoint Names

- `--mobile` (320px+) - Mobile phones
- `--mobile-large` (425px+) - Large mobile phones
- `--tablet` (768px+) - Tablets and small laptops
- `--tablet-large` (1024px+) - Large tablets and laptops
- `--desktop` (1280px+) - Desktop computers
- `--desktop-large` (1440px+) - Large desktop screens
- `--desktop-xl` (1920px+) - Extra large screens

### 4. Max-Width Breakpoints

- `--max-mobile` (max-width: 767px)
- `--max-tablet` (max-width: 1023px)
- `--max-desktop` (max-width: 1279px)

### 5. Range Breakpoints

- `--mobile-only` - Only mobile devices
- `--tablet-only` - Only tablet devices  
- `--desktop-only` - Only desktop devices

### 6. Special Media Queries

- `--touch` - Touch devices
- `--no-touch` - Non-touch devices
- `--landscape` / `--portrait` - Orientation
- `--reduced-motion` - Accessibility
- `--dark-mode` / `--light-mode` - Color scheme
- `--retina` - High DPI displays

## 🚀 Usage Examples

### Basic Responsive Component

```css
@import '../../styles/breakpoints.css';

.card {
  padding: 1rem;
  font-size: 1rem;
}

@media (--tablet) {
  .card {
    padding: 1.5rem;
    font-size: 1.125rem;
  }
}

@media (--desktop) {
  .card {
    padding: 2rem;
    font-size: 1.25rem;
  }
}
```

### Mobile-First Grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (--tablet) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (--desktop) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### Accessibility-Aware Animations

```css
.button {
  transition: transform 0.3s ease;
}

.button:hover {
  transform: translateY(-2px);
}

@media (--reduced-motion) {
  .button {
    transition: none;
  }
  
  .button:hover {
    transform: none;
  }
}
```

### Touch Device Adaptations

```css
.interactive {
  cursor: pointer;
}

.interactive:hover {
  background-color: #f0f0f0;
}

@media (--touch) {
  .interactive:hover {
    background-color: initial;
  }
}
```

## ⚙️ Setup Requirements

### 1. Install Dependencies

```bash
npm install --save-dev postcss-custom-media postcss-import
```

### 2. PostCSS Configuration (`postcss.config.js`)

```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-custom-media': {},
  },
}
```

### 3. Component Structure

```tsx
// Component.tsx
import React from 'react';
import styles from './Component.module.css';

const Component: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Responsive Component</h2>
    </div>
  );
};

export default Component;
```

```css
/* Component.module.css */
@import '../../styles/breakpoints.css';

.container {
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
}

@media (--tablet) {
  .container {
    padding: 2rem;
  }
  
  .title {
    font-size: 2rem;
  }
}
```

## 🎨 Benefits

1. **Consistency** - All breakpoints defined in one place
2. **Maintainability** - Easy to update breakpoints globally
3. **Readability** - Semantic names make code self-documenting
4. **Flexibility** - Supports complex media queries and combinations
5. **Performance** - PostCSS processes at build time
6. **Type Safety** - Works seamlessly with TypeScript
7. **Accessibility** - Built-in support for reduced motion and color schemes

## 📱 Mobile-First Approach

This system follows a mobile-first approach:

1. Write base styles for mobile
2. Use min-width media queries to enhance for larger screens
3. Use max-width queries only when necessary

```css
/* ✅ Good - Mobile first */
.element {
  font-size: 1rem; /* Mobile base */
}

@media (--tablet) {
  .element {
    font-size: 1.25rem; /* Tablet enhancement */
  }
}

/* ❌ Avoid - Desktop first */
.element {
  font-size: 1.25rem;
}

@media (--max-mobile) {
  .element {
    font-size: 1rem;
  }
}
```

## 🔄 Migration from Existing CSS

To migrate existing components:

1. Add `@import '../../styles/breakpoints.css';` at the top
2. Replace pixel-based media queries with custom media
3. Test responsiveness across breakpoints

```css
/* Before */
@media (max-width: 768px) { /* ... */ }

/* After */
@media (--max-tablet) { /* ... */ }
```

This system provides a scalable, maintainable foundation for responsive design in your Next.js project!
