export type CountProductsFilterParams = {
  price?: number[];
  categories?: string[];
};

export type CountProductsOptions = {
  filter?: CountProductsFilterParams;
};
