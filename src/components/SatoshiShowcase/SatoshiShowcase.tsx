import React from 'react';
import styles from './SatoshiShowcase.module.css';

const SatoshiShowcase: React.FC = () => {
  return (
    <div className={styles.satoshiShowcase}>
      <h1 className={styles.heroTitle}>Satoshi Font</h1>
      <p className={styles.subtitle}>
        A geometric sans-serif designed for modern digital experiences
      </p>

      <div className={styles.variableWeight}>Variable Weight Animation</div>

      <div className={styles.weightDemo}>
        <h2 className={`${styles.regular} ${styles.bold}`}>
          Font Weight Spectrum
        </h2>

        <p className={styles.light}>
          Light (300) - Perfect for elegant, minimal text that needs to feel
          airy and sophisticated.
        </p>

        <p className={styles.regular}>
          Regular (400) - The foundation weight for body text, optimized for
          readability across all devices.
        </p>

        <p className={styles.medium}>
          Medium (500) - Ideal for subtle emphasis, UI elements, and creating
          visual hierarchy.
        </p>

        <p className={styles.bold}>
          Bold (700) - Strong emphasis for headings, call-to-actions, and
          important information.
        </p>

        <p className={styles.black}>
          Black (900) - Maximum impact for hero text, display headings, and
          brand statements.
        </p>
      </div>

      <div className={styles.weightDemo}>
        <h2 className={`${styles.regular} ${styles.bold}`}>
          Italic Variations
        </h2>

        <p className={`${styles.regular} ${styles.italic}`}>
          Regular Italic - Adds personality and emphasis to body text while
          maintaining readability.
        </p>

        <p className={`${styles.medium} ${styles.italic}`}>
          Medium Italic - Perfect for quotes, captions, and stylistic text
          elements.
        </p>

        <p className={`${styles.bold} ${styles.italic}`}>
          Bold Italic - Strong emphasis with personality for standout text.
        </p>
      </div>

      <div className={styles.bodyExample}>
        <h3 className={styles.featureTitle}>
          Why Satoshi is Perfect for Next.js
        </h3>

        <p className={styles.bodyLarge}>
          Satoshi combines geometric precision with humanist warmth, making it
          ideal for tech portfolios and modern web applications.
        </p>

        <p className={styles.bodyExample}>
          The variable font technology means you get all weights (300-900) in
          just two files, dramatically reducing your bundle size while providing
          maximum design flexibility. This aligns perfectly with Next.js&apos;s
          performance-first philosophy.
        </p>

        <p className={styles.bodyExample}>
          Its excellent readability at small sizes makes it perfect for body
          text, while the heavier weights create stunning display headings that
          command attention without sacrificing legibility.
        </p>
      </div>

      <div className={styles.featureGrid}>
        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Performance Optimized</h3>
          <p className={styles.featureDescription}>
            Variable fonts reduce file size by 60-80% compared to loading
            individual weight files.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Modern & Geometric</h3>
          <p className={styles.featureDescription}>
            Clean lines and precise geometry perfect for tech and design
            portfolios.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Excellent Readability</h3>
          <p className={styles.featureDescription}>
            Carefully crafted for screen reading with optimal character spacing
            and proportions.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Complete Weight Range</h3>
          <p className={styles.featureDescription}>
            From Light (300) to Black (900) with matching italics for full
            design flexibility.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Next.js Ready</h3>
          <p className={styles.featureDescription}>
            Optimized for next/font/local with font-display: swap for zero
            layout shift.
          </p>
        </div>

        <div className={styles.featureCard}>
          <h3 className={styles.featureTitle}>Responsive Design</h3>
          <p className={styles.featureDescription}>
            Scales beautifully across all screen sizes and integrates with your
            breakpoint system.
          </p>
        </div>
      </div>

      <div>
        <h3 className={styles.featureTitle}>Interactive Elements</h3>
        <button className={styles.button}>Primary Button</button>
        <button className={`${styles.button} ${styles.buttonOutline}`}>
          Secondary Button
        </button>
      </div>

      <div className={styles.codeExample}>
        {`// Using Satoshi in your components
.heading {
  font-family: var(--font-satoshi);
  font-weight: 700; // or use variable: font-variation-settings: 'wght' 700;
}

.body {
  font-family: var(--font-satoshi);
  font-weight: 400;
  line-height: 1.6;
}`}
      </div>

      <p className={styles.bodyExample}>
        <strong>Pro tip:</strong> With variable fonts, you can even animate
        between weights using CSS transitions or create custom weights like 450
        or 650 for micro-adjustments in your design system.
      </p>
    </div>
  );
};

export default SatoshiShowcase;
