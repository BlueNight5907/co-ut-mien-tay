import React from 'react';
import { useFilterContext } from './context';
import { useTranslations } from 'next-intl';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { CircleX, X } from 'lucide-react';

export type ActiveFiltersSectionProps = {
  title?: string;
};

export function ActiveFiltersSection(props: ActiveFiltersSectionProps) {
  const { title } = props;
  const { filterData, items, deleteFilter, resetFilter } = useFilterContext();
  const filterTranslations = useTranslations('Filter');

  if (Object.keys(filterData).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-md">{title ?? filterTranslations('filtering_by')}</h3>
      <ScrollArea>
        <div className="flex gap-2 pb-3">
          {filterData.map((filter) => (
            <Button
              key={filter.field}
              onClick={() => deleteFilter(filter.field)}
              variant="outline"
              className="text-xs sm:text-sm border-primary text-primary bg-transparent hover:bg-transparent hover:text-primary"
            >
              <CircleX />
              {items.find((item) => item.field === filter.field)?.renderActiveContent(filter.data)}
            </Button>
          ))}
          <Button
            onClick={resetFilter}
            variant="outline"
            className="text-xs sm:text-sm border-primary text-primary bg-transparent hover:bg-transparent hover:text-primary"
          >
            <X />
            {filterTranslations('remove_all')}
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
