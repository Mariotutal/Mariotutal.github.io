'use client';

import { ComponentPropsWithRef, forwardRef } from 'react';
import styles from '../EmblaCarousel.module.css';

interface CarouselButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'prev' | 'next' | 'dot';
  isSelected?: boolean;
}

export const CarouselButton = forwardRef<
  HTMLButtonElement,
  CarouselButtonProps
>(
  (
    { variant = 'dot', isSelected = false, className = '', children, ...props },
    ref
  ) => {
    const getButtonClasses = () => {
      const baseClass = styles.button;

      switch (variant) {
        case 'prev':
          return `${baseClass} ${styles.buttonPrev}`;
        case 'next':
          return `${baseClass} ${styles.buttonNext}`;
        case 'dot':
          return `${baseClass} ${styles.dot} ${isSelected ? styles.dotSelected : ''}`;
        default:
          return baseClass;
      }
    };

    const combinedClassName = `${getButtonClasses()} ${className}`.trim();

    return (
      <button ref={ref} type="button" className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

CarouselButton.displayName = 'CarouselButton';

// Icon components for better organization
export const PrevIcon = () => (
  <svg className={styles.buttonSvg} viewBox="0 0 532 532" aria-hidden="true">
    <path
      fill="currentColor"
      d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
    />
  </svg>
);

export const NextIcon = () => (
  <svg className={styles.buttonSvg} viewBox="0 0 532 532" aria-hidden="true">
    <path
      fill="currentColor"
      d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
    />
  </svg>
);
