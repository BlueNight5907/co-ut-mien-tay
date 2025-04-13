'use server';

import { Category } from '@/types/categories/Category';
import { GetCategoriesOptions } from '@/types/categories/GetCategoriesOptions';
import { readItems } from '@directus/sdk';
import { sortBy } from 'lodash';
import { CategorySortParams } from '../constants/category-sort';
import { getLanguageCode } from '../utils';
import { getRestClient } from './directusClient';
import { parseCategory } from './helper';
import { CategorySchema } from './types';

function toDomain(schema: CategorySchema): Category {
  return parseCategory(schema);
}

export async function getCategories(options: GetCategoriesOptions): Promise<Category[]> {
  const { locale, sort } = options;
  const languageCode = getLanguageCode(locale);

  const client = getRestClient();
  try {
    const raws = (await client.request(
      readItems('Categories', {
        fields: ['*', 'translations.*', 'image.*'],
        filter: {
          status: {
            _eq: 'published',
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
        },
        sort: ['-date_created'],
      })
    )) as CategorySchema[];

    const categories = raws.map(toDomain);

    if (sort === CategorySortParams.NAME_DESC) {
      return sortBy(categories, (item) => item.name).reverse();
    }

    if (sort === CategorySortParams.NAME_ASC) {
      return sortBy(categories, (item) => item.name);
    }

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}
