import { Card } from './Card';

export type CardGroup = {
  id: string;
  type: 'card_group';
  headline: string;
  items: Card[];
};
