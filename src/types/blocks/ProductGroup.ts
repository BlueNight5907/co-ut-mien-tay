import { Product } from '../products/Product';

export type ProductGroup = {
  id: string;
  type: 'product_group';
  headline: string;
  items: Product[];
  border: boolean;
  actionUrl?: string;
};
