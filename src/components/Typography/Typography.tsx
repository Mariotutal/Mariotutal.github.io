import React from 'react';
import styles from './Typography.module.css';

const Typography: React.FC = () => {
  return (
    <div className={styles.typography}>
      <h1 className={styles.heading1}>Typography System</h1>

      <p className={styles.bodyLarge}>
        This typography system demonstrates how to integrate Next.js fonts with
        our responsive CSS Modules structure, providing{' '}
        <span className={styles.highlight}>consistent and scalable</span> text
        styling across your entire application.
      </p>

      <h2 className={styles.heading2}>Font Loading in Next.js</h2>

      <p className={styles.bodyText}>
        We&apos;re using{' '}
        <code className={styles.inlineCode}>next/font/google</code> to load
        fonts optimally. This approach provides automatic font optimization,
        zero layout shift, and improved performance.
      </p>

      <div className={styles.codeBlock}>
        {`// In layout.tsx
import { Geist, Geist_Mono, Inter } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});`}
      </div>

      <h3 className={styles.heading3}>Font Families Available</h3>

      <p className={`${styles.bodyText} ${styles.fontSans}`}>
        <strong>Sans-serif (Geist):</strong> This is our primary font for body
        text and general UI elements. It provides excellent readability across
        all devices and screen sizes.
      </p>

      <p className={`${styles.bodyText} ${styles.fontDisplay}`}>
        <strong>Display (Inter):</strong> Used for headings and prominent text
        elements. It offers great contrast and visual hierarchy.
      </p>

      <p className={`${styles.bodyText} ${styles.fontMono}`}>
        <strong>Monospace (Geist Mono):</strong> Perfect for code blocks,
        technical content, and anywhere you need fixed-width characters.
      </p>

      <h3 className={styles.heading3}>Responsive Font Scaling</h3>

      <p className={styles.bodyText}>
        Our font sizes automatically scale based on screen size using CSS custom
        properties and our breakpoint system. This ensures optimal readability
        on all devices.
      </p>

      <h3 className={styles.heading3}>Best Practices</h3>

      <p className={styles.bodyText}>
        • Use <code className={styles.inlineCode}>font-display: swap</code> for
        better performance
        <br />
        • Include fallback fonts in CSS custom properties
        <br />
        • Limit font weights to only what you need
        <br />
        • Use semantic font variables (--font-sans, --font-display, --font-mono)
        <br />• Consider reading line length (65ch maximum) for better UX
      </p>

      <p className={styles.caption}>
        Typography system integrated with breakpoints.css for consistent
        responsive design.
      </p>
    </div>
  );
};

export default Typography;
