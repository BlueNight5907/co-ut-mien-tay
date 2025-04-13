'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export type ProductImageSlideProps = {
  images: string[];
};

export function ProductImageSlide(props: ProductImageSlideProps) {
  const { images } = props;

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-2">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-1">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-1">
              <AspectRatio className="rounded-md border overflow-hidden" ratio={16 / 10}>
                <Image
                  className="w-full h-full block"
                  width={1600}
                  height={1000}
                  src={image}
                  priority
                  alt="product image"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex z-10 left-2" />
        <CarouselNext className="hidden md:flex z-10 right-2" />
        <Badge variant="secondary" className="z-10 absolute right-2 bottom-2">
          {current + 1}/{count}
        </Badge>
      </Carousel>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-1 basis-1/6">
              <AspectRatio
                className={cn('rounded overflow-hidden', {
                  border: index === current,
                })}
                ratio={16 / 10}
                onClick={() => api?.scrollTo(index)}
              >
                <Image
                  className="w-full h-full block"
                  width={1600}
                  height={900}
                  src={image}
                  priority
                  alt="product image"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
