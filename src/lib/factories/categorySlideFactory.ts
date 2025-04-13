import DynamicCategorySlide from '@/components/widgets/category-slide';
import { CategorySlide } from '@/types/blocks/CategorySlide';
import { createElement } from 'react';

export function categorySlideFactory(slide: CategorySlide) {
  return createElement(DynamicCategorySlide, {
    key: slide.id,
    items: slide.items,
    headline: slide.headline,
    actionUrl: slide.actionUrl,
  });
}
