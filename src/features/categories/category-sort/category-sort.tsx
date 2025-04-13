'use client';
import AdvancedSort, { SortItem } from '@/components/widgets/sort';
import { usePathname, useRouter } from '@/i18n/navigation';
import useSearchParams from '@/lib/hooks/useSearchParams';
import { ArrowDownZA, ArrowUpZA } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function CategorySort() {
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
      <SortItem value="name_asc">
        <ArrowUpZA />
        <span>{sortTranslations('name_asc')}</span>
      </SortItem>
      <SortItem value="name_desc">
        <ArrowDownZA />
        <span>{sortTranslations('name_desc')}</span>
      </SortItem>
    </AdvancedSort>
  );
}
