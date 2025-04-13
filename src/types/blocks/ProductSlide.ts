import { Product } from '../products/Product';

export type ProductSlide = {
  id: string;
  type: 'product_slide';
  headline: string;
  actionUrl?: string;
  items: Product[];
};
