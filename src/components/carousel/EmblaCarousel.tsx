'use client';

import { memo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselControls } from './ui/CarouselControls';
import ExperienceCard from './ui/ExperienceCard';
import { CarouselProps } from './types';
import styles from './EmblaCarousel.module.css';

export const EmblaCarousel = memo<CarouselProps>(({ experiences, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  return (
    <section
      className={styles.embla}
      role="region"
      aria-label="Experience carousel"
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {experiences.map((experience, index) => (
            <div
              key={`experience-${experience.id}`}
              className={styles.slide}
              role="group"
              aria-label={`Experience ${index + 1} of ${experiences.length}`}
            >
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>

      <CarouselControls emblaApi={emblaApi} />
    </section>
  );
});

EmblaCarousel.displayName = 'EmblaCarousel';
