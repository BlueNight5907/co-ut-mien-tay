import { CountProductsOptions } from '@/types/products/CountProductsOptions';
import { GetProductsOptions } from '@/types/products/GetProductsOptions';
import { Product } from '@/types/products/Product';
import { SearchProductsWithNameOptions } from '@/types/products/SearchProductsWithNameOptions';
import { aggregate, readItems } from '@directus/sdk';
import { ProductSortParams } from '../constants/product-sort';
import { getLanguageCode } from '../utils';
import { getRestClient } from './directusClient';
import { parseProduct } from './helper';
import { ProductSchema, RelatedProductSchema } from './types';
import { GetProductOptions } from '@/types/products/GetProductOptions';
import { notFound } from 'next/navigation';
import { GetRelatedProductsOptions } from '@/types/products/GetRelatedProductsOptions';

export const LIMIT_PRODUCT_ITEMS = 20;

export function toDomain(schema: ProductSchema): Product {
  return parseProduct(schema);
}

export async function getProducts(options: GetProductsOptions): Promise<Product[]> {
  const { locale, sort, filter, page } = options;
  const languageCode = getLanguageCode(locale);

  const querySort = [];

  const queryFilter: Record<string, unknown> = {};

  if (sort === ProductSortParams.PRICE_ASC) {
    querySort.push('-variants.price.value');
  }

  if (sort === ProductSortParams.PRICE_DESC) {
    querySort.push('variants.price.value');
  }

  if (sort === ProductSortParams.NEW) {
    querySort.push('-new');
  }

  if (sort === ProductSortParams.FEATURED) {
    querySort.push('-featured');
  }

  if (sort === ProductSortParams.BEST_SELLER) {
    querySort.push('-best_seller');
  }

  if (filter && Array.isArray(filter.price)) {
    queryFilter['variants'] = {
      price: {
        value: {
          _between: filter.price,
        },
      },
    };
  }

  if (filter && Array.isArray(filter.categories)) {
    queryFilter['category'] = {
      slug: {
        _in: filter.categories,
      },
    };
  }

  querySort.push('-date_created');

  const client = getRestClient();
  try {
    const raws = (await client.request(
      readItems('Products', {
        fields: [
          '*',
          'translations.*',
          'thumbnail.*',
          'images.*',
          'category.*',
          'images.file.*',
          'variants.*',
          'variants.image.*',
          'variants.price.*',
          'variants.origin_price.*',
          'variants.translations.*',
          'variants.unit.*',
          'variants.unit.translation.*',
        ],
        filter: {
          status: {
            _eq: 'published',
          },
          ...queryFilter,
        },
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: languageCode,
              },
            },
          },
          images: {
            _sort: ['sort'],
          },
          variants: {
            _sort: ['product_status', 'price.value'],
            _filter: {
              status: {
                _eq: 'published',
              },
            },
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            unit: {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
            },
          },
        },
        sort: querySort,
        limit: LIMIT_PRODUCT_ITEMS,
        page,
      })
    )) as ProductSchema[];

    const products = raws.map(toDomain);

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function countProducts(options: CountProductsOptions): Promise<number> {
  const { filter } = options;

  const queryFilter: Record<string, unknown> = {};

  if (filter && Array.isArray(filter.price)) {
    queryFilter['variants'] = {
      price: {
        value: {
          _between: filter.price,
        },
      },
    };
  }

  if (filter && Array.isArray(filter.categories)) {
    queryFilter['category'] = {
      slug: {
        _in: filter.categories,
      },
    };
  }

  const client = getRestClient();
  try {
    const [{ count }] = await client.request(
      aggregate('Products', {
        query: {
          filter: {
            status: {
              _eq: 'published',
            },
            ...queryFilter,
          },
        },
        aggregate: { count: '*' },
      })
    );

    return Number(count);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function searchProductWithName(
  options: SearchProductsWithNameOptions
): Promise<Product[]> {
  const { locale, name } = options;
  const languageCode = getLanguageCode(locale);

  const queryFilter: Record<string, unknown> = {};

  if (locale === 'vi') {
    queryFilter['name'] = {
      _icontains: name,
    };
  } else {
    queryFilter['_or'] = [
      {
        name: {
          _icontains: name,
        },
      },
      {
        translations: {
          name: {
            _icontains: name,
          },
          languages_code: {
            _eq: languageCode,
          },
        },
      },
    ];
  }

  const client = getRestClient();
  try {
    const raws = (await client.request(
      readItems('Products', {
        fields: [
          '*',
          'translations.*',
          'thumbnail.*',
          'images.*',
          'category.*',
          'images.file.*',
          'variants.*',
          'variants.image.*',
          'variants.price.*',
          'variants.origin_price.*',
          'variants.translations.*',
          'variants.unit.*',
          'variants.unit.translation.*',
        ],
        filter: {
          status: {
            _eq: 'published',
          },
          ...queryFilter,
        },
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: languageCode,
              },
            },
          },
          images: {
            _sort: ['sort'],
          },
          variants: {
            _sort: ['product_status', 'price.value'],
            _filter: {
              status: {
                _eq: 'published',
              },
            },
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            unit: {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
            },
          },
        },
        sort: ['-date_created'],
      })
    )) as ProductSchema[];

    const products = raws.map(toDomain);

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProduct(options: GetProductOptions): Promise<Product> {
  const { locale, slug } = options;
  const languageCode = getLanguageCode(locale);

  const client = getRestClient();
  try {
    const raws = (await client.request(
      readItems('Products', {
        fields: [
          '*',
          'translations.*',
          'thumbnail.*',
          'images.*',
          'category.*',
          'images.file.*',
          'variants.*',
          'variants.image.*',
          'variants.price.*',
          'variants.origin_price.*',
          'variants.translations.*',
          'variants.unit.*',
          'variants.unit.translation.*',
        ],
        filter: {
          status: {
            _eq: 'published',
          },
          slug: {
            _eq: slug,
          },
        },
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: languageCode,
              },
            },
          },
          images: {
            _sort: ['sort'],
          },
          variants: {
            _sort: ['product_status', 'price.value'],
            _filter: {
              status: {
                _eq: 'published',
              },
            },
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            unit: {
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
            },
          },
        },
      })
    )) as ProductSchema[];

    if (raws.length === 0) {
      throw notFound();
    }

    return toDomain(raws[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRelatedProducts(options: GetRelatedProductsOptions): Promise<Product[]> {
  const { locale, id } = options;
  const languageCode = getLanguageCode(locale);

  const client = getRestClient();
  try {
    const raws = (await client.request(
      readItems('Products_Products', {
        fields: [
          '*',
          'related_product.*',
          'related_product.translations.*',
          'related_product.thumbnail.*',
          'related_product.images.*',
          'related_product.category.*',
          'related_product.images.file.*',
          'related_product.variants.*',
          'related_product.variants.image.*',
          'related_product.variants.price.*',
          'related_product.variants.origin_price.*',
          'related_product.variants.translations.*',
          'related_product.variants.unit.*',
          'related_product.variants.unit.translation.*',
        ],
        filter: {
          product: {
            _eq: id,
          },
          related_product: {
            status: {
              _eq: 'published',
            },
          },
        },
        deep: {
          related_product: {
            translations: {
              _filter: {
                languages_code: {
                  _eq: languageCode,
                },
              },
            },
            images: {
              _sort: ['sort'],
            },
            variants: {
              _sort: ['product_status', 'price.value'],
              _filter: {
                status: {
                  _eq: 'published',
                },
              },
              translations: {
                _filter: {
                  languages_code: {
                    _eq: languageCode,
                  },
                },
              },
              unit: {
                translations: {
                  _filter: {
                    languages_code: {
                      _eq: languageCode,
                    },
                  },
                },
              },
            },
          },
        },
      })
    )) as RelatedProductSchema[];

    const products = raws.map((item) => toDomain(item.related_product));

    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}
