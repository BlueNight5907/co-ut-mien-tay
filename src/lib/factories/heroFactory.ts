import DynamicHero from '@/components/widgets/hero';
import { Hero } from '@/types/blocks/Hero';
import { createElement } from 'react';

export function heroFactory(hero: Hero) {
  return createElement(DynamicHero, {
    key: hero.id,
    ...hero,
  });
}
