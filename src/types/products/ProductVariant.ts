import { Discount } from './Discount';

export type ProductVariant = {
  id: number;
  name: string;
  image: string;
  productStatus: number;
  originPrice?: number;
  currentPrice?: number;
  weight: number;
  unit: string;
  sku: string;
  discounts: Discount[];
};
