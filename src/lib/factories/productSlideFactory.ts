import DynamicProductSlide from '@/components/widgets/product-slide';
import { ProductSlide } from '@/types/blocks/ProductSlide';
import { createElement } from 'react';

export function productSlideFactory(slide: ProductSlide) {
  return createElement(DynamicProductSlide, {
    key: slide.id,
    items: slide.items,
    headline: slide.headline,
    actionUrl: slide.actionUrl,
  });
}
