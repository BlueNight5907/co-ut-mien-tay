import { Category } from '../categories/Category';

export type CategoryGroup = {
  id: string;
  type: 'category_group';
  headline: string;
  items: Category[];
  border: boolean;
  actionUrl?: string;
};
