// Main carousel component
export { EmblaCarousel } from './EmblaCarousel';

// UI components
export { CarouselButton, PrevIcon, NextIcon } from './ui/CarouselButton';
export { CarouselControls } from './ui/CarouselControls';
export { default as ExperienceCard } from './ui/ExperienceCard';

// Hooks
export { useDotButton } from './hooks/useDotButton';
export { usePrevNextButtons } from './hooks/usePrevNextButtons';

// Types
export type { 
  CarouselProps, 
  Experience,
  UseDotButtonType, 
  UsePrevNextButtonsType 
} from './types';