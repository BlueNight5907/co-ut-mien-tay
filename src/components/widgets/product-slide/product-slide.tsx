'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types/products/Product';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ProductCard from '../product-card';

export type ProductSlideProps = {
  headline: string;
  actionUrl?: string;
  items: Product[];
};

export function ProductSlide(props: ProductSlideProps) {
  const { headline, actionUrl, items } = props;
  const commonTranslations = useTranslations('Common');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between align-bottom">
        <h3 className="font-semibold text-md">{headline}</h3>
        {actionUrl && (
          <Link className="flex gap-1 items-center text-sm hover:text-primary" href={actionUrl}>
            {commonTranslations('view_all')}
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {items.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-0.5 h-full">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-10 -left-2.5 xl:-left-10" />
        <CarouselNext className="z-10 -right-2.5 xl:-right-10" />
      </Carousel>
    </div>
  );
}
