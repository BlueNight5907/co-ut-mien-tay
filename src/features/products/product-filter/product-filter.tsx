'use client';

import AdvancedFilter from '@/components/widgets/filter';
import { useRouter } from '@/i18n/navigation';
import useSearchParams from '@/lib/hooks/useSearchParams';
import { convertCurrency } from '@/lib/utils';
import { Category } from '@/types/categories/Category';
import { Banknote, ChartColumnStacked } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FilterCategories } from './filter-categories';
import { FilterPrices } from './filter-prices';
import { isEmpty } from 'lodash';

type ProductFilterProps = {
  categories: Category[];
};

export function ProductFilter(props: ProductFilterProps) {
  const { categories } = props;
  const filterTranslations = useTranslations('Filter');
  const { searchParams } = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getFilter = () => {
    const filter: Array<{ field: string; data: unknown }> = [];

    try {
      searchParams.forEach((value, field) => {
        if (field === 'filter_price' && Array.isArray(JSON.parse(value))) {
          filter.push({
            field: 'price',
            data: JSON.parse(value),
          });
          return;
        }
        if (field === 'filter_categories' && Array.isArray(JSON.parse(value))) {
          filter.push({
            field: 'categories',
            data: JSON.parse(value),
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      return filter;
    }
  };

  return (
    <AdvancedFilter
      items={[
        {
          field: 'price',
          label: (
            <>
              <Banknote />
              <span>{filterTranslations('price')}</span>
            </>
          ),
          renderActiveContent: (data: unknown) => {
            const [from, to] = data as [from: number, to: number];
            return filterTranslations('filter_price_result', {
              from: convertCurrency(from),
              to: convertCurrency(to),
            });
          },
          renderFilterOptions: (accept, cancel) => (
            <FilterPrices onAccept={accept} onCancel={cancel} />
          ),
        },
        {
          field: 'categories',
          label: (
            <>
              <ChartColumnStacked />
              <span>{filterTranslations('categories')}</span>
            </>
          ),
          renderActiveContent: (data: unknown) => {
            const slugs = data as string[];

            return filterTranslations('filter_categories_result', {
              categories: categories
                .filter((item) => slugs.includes(item.slug))
                .map((item) => item.name)
                .join(' | '),
            });
          },
          renderFilterOptions: (accept, cancel) => (
            <FilterCategories onAccept={accept} onCancel={cancel} categories={categories} />
          ),
        },
      ]}
      filterData={getFilter()}
      setFilterData={(onChange) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('filter_price');
        params.delete('filter_categories');

        const filter = onChange(getFilter());
        filter.forEach((item) => {
          if (!isEmpty(item.data)) {
            params.set(`filter_${item.field}`, JSON.stringify(item.data));
          }
        });

        router.push(pathname + '?' + decodeURIComponent(params.toString()));
      }}
    ></AdvancedFilter>
  );
}
