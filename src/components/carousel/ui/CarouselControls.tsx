'use client';

import { CarouselButton, PrevIcon, NextIcon } from './CarouselButton';
import { usePrevNextButtons } from '../hooks/usePrevNextButtons';
import { useDotButton } from '../hooks/useDotButton';
import { EmblaCarouselType } from 'embla-carousel';
import styles from '../EmblaCarousel.module.css';

interface CarouselControlsProps {
  emblaApi: EmblaCarouselType | undefined;
}

export const CarouselControls = ({ emblaApi }: CarouselControlsProps) => {
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <CarouselButton
          variant="prev"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          aria-label="Previous slide"
        >
          <PrevIcon />
        </CarouselButton>

        <CarouselButton
          variant="next"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          aria-label="Next slide"
        >
          <NextIcon />
        </CarouselButton>
      </div>

      <div className={styles.dots}>
        {scrollSnaps.map((_, index) => (
          <CarouselButton
            key={index}
            variant="dot"
            isSelected={index === selectedIndex}
            onClick={() => onDotButtonClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
