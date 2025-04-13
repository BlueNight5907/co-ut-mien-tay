import { type ProductSortParams } from '@/lib/constants/product-sort';

export type GetProductsFilterParams = {
  price?: number[];
  categories?: string[];
};

export type GetProductsOptions = {
  filter?: GetProductsFilterParams;
  sort?: ProductSortParams;
  page?: number;
  locale: string;
};
