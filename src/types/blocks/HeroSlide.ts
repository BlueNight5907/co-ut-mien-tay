import { Hero } from './Hero';

export type HeroSlide = {
  id: string;
  type: 'hero_slide';
  items: Hero[];
};
