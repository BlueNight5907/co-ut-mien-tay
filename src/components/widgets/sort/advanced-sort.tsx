'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { useTranslations } from 'next-intl';
import React from 'react';

export type AdvancedSortProps = {
  children: React.ReactNode;
  title?: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function AdvancedSort(props: AdvancedSortProps) {
  const { children, title, value, onValueChange } = props;

  const sortTranslations = useTranslations('Sort');
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-md">{title ?? sortTranslations('sort_by')}</h3>
      <ScrollArea>
        <ToggleGroup
          className="flex gap-2 pb-3"
          type="single"
          value={value}
          onValueChange={onValueChange}
          variant="outline"
        >
          {children}
        </ToggleGroup>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
