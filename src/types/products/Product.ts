import { ProductVariant } from './ProductVariant';

export type Product = {
  id: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  thumbnail: string;
  slug: string;
  name: string;
  description: string;
  detail: string;
  images: string[];
  variants: ProductVariant[];
};
