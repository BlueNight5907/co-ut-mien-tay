'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Hero, { HeroDef } from '../hero';
import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

export type HeroSlideProps = {
  items: HeroDef[];
};

export function HeroSlide(props: HeroSlideProps) {
  const { items } = props;

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
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
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <Carousel setApi={setApi} plugins={[plugin.current]} className="w-full">
        <CarouselContent className="-ml-1">
          {items.map((hero, index) => (
            <CarouselItem key={index} className="pl-1">
              <div className="p-0.5">
                <Hero {...hero} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-10 -left-2.5 xl:-left-10" />
        <CarouselNext className="z-10 -right-2.5 xl:-right-10" />
      </Carousel>
      <div className="flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            className={cn('w-6 h-2 rounded-sm bg-accent', {
              'w-12 bg-primary': index === current,
            })}
            onClick={() => api?.scrollTo(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
