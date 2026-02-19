'use client';

import { experienceData } from '@/constants/cvData';
import { EmblaCarousel } from '../carousel';
import styles from './Overlay.module.css';

export default function Overlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        Mario Vargas
        <p className={styles.subtitle}>Software Engineer</p>
      </div>
      {/* Experience Carousel */}
      <div className={styles.experienceSection}>
        <EmblaCarousel
          experiences={experienceData}
          options={{ loop: true, align: 'start' }}
        />
      </div>
    </div>
  );
}
