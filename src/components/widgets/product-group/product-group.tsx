'use client';

import { Product } from '@/types/products/Product';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ProductCard from '../product-card';
import { cn } from '@/lib/utils';

export type ProductGroupProps = {
  headline: string;
  actionUrl?: string;
  items: Product[];
  border?: boolean;
};

export function ProductGroup(props: ProductGroupProps) {
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
      <ul className="grid col-start-1 row-start-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-stretch">
        {items.map((product) => (
          <li key={product.id}>
            <ProductCard
              thumbnail={product.thumbnail}
              name={product.name}
              description={product.description}
              slug={product.slug}
              variants={product.variants}
              isBestSeller={product.isBestSeller}
              isNew={product.isNew}
              isFeatured={product.isFeatured}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
