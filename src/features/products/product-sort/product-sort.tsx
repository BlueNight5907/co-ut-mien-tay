'use client';

import AdvancedSort, { SortItem } from '@/components/widgets/sort';
import { usePathname, useRouter } from '@/i18n/navigation';
import useSearchParams from '@/lib/hooks/useSearchParams';
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  BadgeDollarSign,
  BadgePlus,
  Gem,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, createQueryString } = useSearchParams();
  const sortTranslations = useTranslations('Sort');

  const sort = searchParams.get('sort') ?? '';

  const handleSort = (value: string) => {
    router.push(pathname + '?' + createQueryString('sort', value));
  };
  return (
    <AdvancedSort value={sort} onValueChange={handleSort}>
      <SortItem value="new">
        <BadgePlus />
        <span>{sortTranslations('new')}</span>
      </SortItem>
      <SortItem value="featured">
        <Gem />
        <span>{sortTranslations('featured')}</span>
      </SortItem>
      <SortItem value="best_seller">
        <BadgeDollarSign />
        <span>{sortTranslations('best_seller')}</span>
      </SortItem>

      <SortItem value="price_desc">
        <ArrowDownWideNarrow />
        <span>{sortTranslations('price_desc')}</span>
      </SortItem>
      <SortItem value="price_asc">
        <ArrowUpWideNarrow />
        <span>{sortTranslations('price_asc')}</span>
      </SortItem>
    </AdvancedSort>
  );
}
