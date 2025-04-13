import DynamicHeroSlide from '@/components/widgets/hero-slide';
import { HeroSlide } from '@/types/blocks/HeroSlide';
import { createElement } from 'react';

export function heroSlideFactory(slide: HeroSlide) {
  return createElement(DynamicHeroSlide, {
    key: slide.id,
    items: slide.items,
  });
}
