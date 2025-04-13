import { Category } from '../categories/Category';

export type CategorySlide = {
  id: string;
  type: 'category_slide';
  headline: string;
  actionUrl?: string;
  items: Category[];
};
