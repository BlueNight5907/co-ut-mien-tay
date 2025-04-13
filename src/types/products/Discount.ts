export type Discount = {
  id: string;
  name: string;
  type: 'direct' | 'percent';
  value: number;
};
