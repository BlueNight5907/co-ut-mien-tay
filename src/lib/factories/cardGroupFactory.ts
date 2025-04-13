import DynamicCardGroup from '@/components/widgets/dynamic-card-group';
import { CardGroup } from '@/types/blocks/CardGroup';
import { createElement } from 'react';

export function cardGroupFactory(group: CardGroup) {
  return createElement(DynamicCardGroup, {
    key: group.id,
    headline: group.headline,
    items: group.items,
  });
}
