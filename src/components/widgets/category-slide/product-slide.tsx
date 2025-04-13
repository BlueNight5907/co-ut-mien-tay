'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Category } from '@/types/categories/Category';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import CategoryCard from '../category-card';

export type CategorySlideProps = {
  headline: string;
  actionUrl?: string;
  items: Category[];
};

export function CategorySlide(props: CategorySlideProps) {
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
          {items.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="p-0.5 h-full">
                <CategoryCard
                  name={category.name}
                  slug={category.slug}
                  image={category.image}
                  color={category.color}
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
