import { Block } from '@/types/blocks/Block';
import React from 'react';
import { alertFactory } from './alertFactory';
import { richtextFactory } from './richtextFactory';
import { cardGroupFactory } from './cardGroupFactory';
import { categorySlideFactory } from './categorySlideFactory';
import { categoryGroupFactory } from './categoryGroupFactory';
import { productSlideFactory } from './productSlideFactory';
import { productGroupFactory } from './productGroupFactory';
import { heroFactory } from './heroFactory';
import { heroSlideFactory } from './heroSlideFactory';

export function blockFactory(block: Block): React.ReactNode {
  switch (block.type) {
    case 'alert':
      return alertFactory(block);

    case 'rich_text':
      return richtextFactory(block);

    case 'card_group':
      return cardGroupFactory(block);

    case 'category_slide':
      return categorySlideFactory(block);

    case 'category_group':
      return categoryGroupFactory(block);

    case 'product_slide':
      return productSlideFactory(block);

    case 'product_group':
      return productGroupFactory(block);

    case 'hero':
      return heroFactory(block);

    case 'hero_slide':
      return heroSlideFactory(block);
    default:
      return null;
  }
}
