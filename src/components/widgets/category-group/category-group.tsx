'use client';

import { cn } from '@/lib/utils';
import { Category } from '@/types/categories/Category';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CategoryCard from '../category-card';

export type CategoryGroupProps = {
  headline: string;
  items: Category[];
  actionUrl?: string;
  border?: boolean;
};

export function CategoryGroup(props: CategoryGroupProps) {
  const { headline, actionUrl, items, border } = props;

  const commonTranslations = useTranslations('Common');

  return (
    <div className={cn('flex flex-col gap-2', { 'p-2 rounded-lg border': border })}>
      <div className="flex justify-between align-bottom">
        <h3 className="font-semibold text-md">{headline}</h3>
        {actionUrl && (
          <Link className="flex gap-1 items-center text-sm hover:text-primary" href={actionUrl}>
            {commonTranslations('view_all')}
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <ul className="grid col-start-1 row-start-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 xl:gap-4 justify-items-stretch">
        {items.map((item) => (
          <li key={item.id}>
            <CategoryCard name={item.name} slug={item.slug} image={item.image} color={item.color} />
          </li>
        ))}
      </ul>
    </div>
  );
}
