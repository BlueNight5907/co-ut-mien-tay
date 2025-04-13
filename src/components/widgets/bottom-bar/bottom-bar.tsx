'use client';

import { ChartColumnStacked, House, ShoppingCart, TextSearch } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Item } from './item';

type Item = {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchExact?: boolean;
};

const items: Item[] = [
  {
    label: 'home',
    href: '/',
    matchExact: true,
    icon: <House />,
  },
  {
    label: 'categories',
    href: '/categories',
    icon: <ChartColumnStacked />,
  },
  {
    label: 'products',
    href: '/products',
    icon: <ShoppingCart />,
  },
  {
    label: 'search',
    href: '/search',
    icon: <TextSearch />,
  },
];

export function BottomBar() {
  const translation = useTranslations('HomeLayout.BottomBar');
  return (
    <section className="w-full screen-min-width max-w-[600px] rounded-tl-xl rounded-tr-xl sm:rounded-xl flex flex-row gap-2 items-center justify-between fixed bottom-0 sm:bottom-2 border left-[50%] translate-x-[-50%] bg-background shadow-bottom-bar z-1000 pt-4 px-4 pb-8 sm:py-4 sm:px-6">
      {items.map((item) => (
        <Item
          key={item.href}
          icon={item.icon}
          label={translation(item.label as 'search' | 'products' | 'categories' | 'home')}
          matchExact={item.matchExact}
          href={item.href}
        />
      ))}
    </section>
  );
}
