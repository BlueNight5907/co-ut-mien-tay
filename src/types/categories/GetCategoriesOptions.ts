import { type CategorySortParams } from '@/lib/constants/category-sort';

export type GetCategoriesOptions = {
  sort?: CategorySortParams;
  locale: string;
};
