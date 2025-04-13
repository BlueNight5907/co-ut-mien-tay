import DynamicCategoryGroup from '@/components/widgets/category-group';
import { CategoryGroup } from '@/types/blocks/CategoryGroup';
import { createElement } from 'react';

export function categoryGroupFactory(group: CategoryGroup) {
  return createElement(DynamicCategoryGroup, {
    key: group.id,
    items: group.items,
    headline: group.headline,
    border: group.border,
    actionUrl: group.actionUrl,
  });
}
