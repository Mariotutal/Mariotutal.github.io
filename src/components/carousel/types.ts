import { EmblaOptionsType } from 'embla-carousel';

export interface Experience {
  id: number;
  jobtitle: string;
  companyname: string;
  worktype: string;
  duration: string;
  location: string;
  responsibility: string[];
  tools: string[];
}

export interface CarouselProps {
  experiences: Experience[];
  options?: EmblaOptionsType;
}

export interface UseDotButtonType {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
}

export interface UsePrevNextButtonsType {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}
