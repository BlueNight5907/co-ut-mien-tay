import DynamicProductGroup from '@/components/widgets/product-group';
import { ProductGroup } from '@/types/blocks/ProductGroup';
import { createElement } from 'react';

export function productGroupFactory(group: ProductGroup) {
  return createElement(DynamicProductGroup, {
    key: group.id,
    items: group.items,
    headline: group.headline,
    border: group.border,
    actionUrl: group.actionUrl,
  });
}
